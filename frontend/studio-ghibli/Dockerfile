# Use the Nginx image from Docker Hub
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy a custom configuration file from the current directory
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build directory to Nginx serve directory
COPY build/ /usr/share/nginx/html

# Expose port 9191 to the outside
EXPOSE 9191
