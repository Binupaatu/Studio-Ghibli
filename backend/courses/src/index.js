require('../tracing'); // Make sure this is the first line
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("winston");
const courseRoutes = require("./api/routes/courseRoutes");
const client = require('prom-client');


const {
  COURSE_SERVICE_PORT,
  DB_HOST,
  DB_USER,
  APPLICATION_PORT,
} = require("./config");

const app = express();

const register = client.register;

// Create a Histogram metric to track HTTP request durations
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
});

// Create a histogram to track the duration of service invocations
const serviceInvocationDuration = new client.Histogram({
  name: 'service_invocation_duration_seconds',
  help: 'Duration of service invocations in seconds',
  labelNames: ['service', 'method', 'status_code'],
});


// Create a counter to track total HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Middleware to measure the duration of service invocations
app.use((req, res, next) => {
  const end = serviceInvocationDuration.startTimer({ service: 'course-service', method: req.method });

  res.on('finish', () => {
      end({ status_code: res.statusCode });
  });

  next();
});


// Middleware to increment the counter for each request
app.use((req, res, next) => {
  res.on('finish', () => {
      httpRequestCounter.labels(req.method, req.route ? req.route.path : req.path, res.statusCode).inc();
  });
  next();
});

// Middleware to track request duration for all routes
app.use((req, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const durationInSeconds = seconds + nanoseconds / 1e9;

        httpRequestDurationMicroseconds
            .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
            .observe(durationInSeconds);
    });

    next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Metrics collection
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.use(courseRoutes);

// Error handling for unsupported routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
const APP_PORT = APPLICATION_PORT || 8885;

app.listen(APP_PORT, () => {
  console.log(`Course Service running on #${APP_PORT}`);
});
