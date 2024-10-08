import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
/*import Carousel from "../components/CourseSelection/Carousel";
import LinkButton from "../share/UIElements/LinkButton/LinkButton";
import { pythonData } from "../data/course-selection-data/data";
import { js } from "../data/course-selection-data/data";
import { excel } from "../data/course-selection-data/data";
import { aws } from "../data/course-selection-data/data";
import { dataScience } from "../data/course-selection-data/data";*/
const initState = {
  name: "Python",
  description:
    "Take one of Studio-Ghibli’s range of Film-Making courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will...",
};

const contentReducer = (state, action) => {
  switch (action.type) {
    case "Python":
      return {
        name: "Python",
        title: "Expand your career opportunities with Film-Making",
        description:
          "Take one of Studio-Ghibli’s range of Film-Making courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will...",
      };
    case "JS":
      return {
        name: "JavaScript",
        title: "Grow your software development skills with JavaScript",
        description:
          "JavaScript is a text-based computer programming language used to make dynamic web pages. A must-learn for aspiring web developers or programmers, JavaScript can be used for features like image carousels, displaying countdowns and timers, and playing media on a webpage. With JavaScript online classes, you can...",
      };
    case "Aws":
      return {
        name: "AWS Certification",
        title: "Become an expert in cloud computing with AWS Certification",
        description:
          "Prep for your AWS certification with an AWS course on Studio-Ghibli. Learn the fundamentals of AWS such as working with a serverless platform, the various frameworks, security and more. With these courses, you’ll build the valuable skills you need to implement cloud initiatives — and open up new career opportunities. If you want...",
      };
    case "Excel":
      return {
        name: "Excel",
        title: "Analyze and visualize data with Excel",
        description:
          "Take a Microsoft Excel course from Studio-Ghibli, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to...",
      };
    case "DataScience":
      return {
        name: "Data Science",
        title: "Lead data-driven decisions with Data Science",
        description:
          "Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge. Get data science training if you’re into...",
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const CourseSelectionContainer = () => {
  const [triggerElement, setTriggerElement] = useState("Python");
  const [state, dispatch] = useReducer(contentReducer, initState);

  useEffect(() => {
    dispatch({ type: triggerElement });
  }, [triggerElement]);
  return (
    <>
      <H1>A broad selection of courses</H1>
      <Subtitle>
        Choose from 183,000 online video courses with new additions published
        every month
      </Subtitle>
    </>
  );
};

const BorderStyle = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #c4c4c4;
  padding: 2rem;
  margin: 2rem 2.4rem;
`;

const H1 = styled.h1`
  font-family: var(--suisse-works-alternative);
  font-size: 3.2rem;
  font-weight: 800;
  padding: 6rem 0 0.8rem;
  margin-left: 2.4rem;
  letter-spacing: 0.5px;
`;

const ExplanationContainer = styled.div`
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const DiscriptionContainer = styled.div`
  font-size: 1.6rem;
  max-width: 82rem;
`;
const Subtitle = styled.p`
  font-size: 1.9rem;
  padding: 0.8rem 0;
  margin-left: 2.4rem;
  margin-bottom: 1rem;
`;
const ButtonContainer = styled.div`
  margin-left: 2.4rem;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  /* color: #787878; */
  color: ${(props) => (props.isActive ? "#000" : "#787878")};
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 2rem;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const MainTitle = styled.p`
  font-size: 2.4rem;
  font-weight: bold;
`;

const SliderContainer = styled.div`
  margin: 2rem;
`;
export default CourseSelectionContainer;
