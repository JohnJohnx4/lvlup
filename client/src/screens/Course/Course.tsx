import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { useState } from "react";
import { mockSections } from "src/utils/mocks/courseMock";
import { useCourseContext } from "src/context/CourseContext";
import { withCourseLayout } from "src/hooks/withLayout";
import { Content } from "./components/Content";
import { useNavigate } from "react-router-dom";

const StyledCourseScreen = {
  root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    height: 100%;
  `,
  container: styled.div``,
  content: styled.div`
    background-color: #f0f0f0;
    height: 400px;
    width: 100%;
    padding: 32px 48px;
    display: flex;
    justify-content: center;
  `,
  buttonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  `,
};

const CourseScreen = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const { contextData } = useCourseContext();
  const selectedCourse = contextData?.selectedCourse;
  const navigate = useNavigate();
  const currentModule =
    mockSections[currentSectionIndex].modules[currentModuleIndex];

  const isAtEnd =
    currentSectionIndex === mockSections.length - 1 &&
    currentModuleIndex === mockSections[currentSectionIndex].modules.length - 1;

  const selectNextModule = () => {
    if (isAtEnd) {
      navigate("/courses/" + selectedCourse?.id);
      return;
    }
    setCurrentModuleIndex((prev) => {
      if (prev + 1 >= mockSections[currentSectionIndex].modules.length) {
        setCurrentSectionIndex((prev) => {
          if (prev + 1 >= mockSections.length) {
            return prev;
          }
          return prev + 1;
        });
        if (currentSectionIndex + 1 < mockSections.length) {
          return 0;
        } else {
          return prev;
        }
      }
      return prev + 1;
    });
  };

  const selectPrevModule = () => {
    setCurrentModuleIndex((prev) => {
      if (prev - 1 < 0) {
        setCurrentSectionIndex((prev) => {
          if (prev - 1 < 0) {
            return 0;
          }
          return prev - 1;
        });
        return (
          mockSections[
            currentSectionIndex - 1 >= 0
              ? currentSectionIndex - 1
              : currentSectionIndex
          ].modules.length - 1
        );
      }
      return prev - 1;
    });
  };

  if (!selectedCourse) {
    return (
      <div>
        <div>Course</div>
        <div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <StyledCourseScreen.root>
      <div>Course</div>

      <p>{currentModule?.title}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90%",
          height: "90%",
          width: "100%",
        }}
      >
        <Content content={currentModule?.content} type={currentModule?.type} />
      </div>

      <StyledCourseScreen.buttonContainer>
        <Button onClick={selectPrevModule}>Prev</Button>
        <div>
          {mockSections[currentSectionIndex].title} - {currentModuleIndex + 1} /{" "}
          {mockSections[currentSectionIndex].modules.length}
        </div>
        <Button onClick={selectNextModule}>{isAtEnd ? "End" : "Next"}</Button>
      </StyledCourseScreen.buttonContainer>
    </StyledCourseScreen.root>
  );
};

export const CoursePlayer = withCourseLayout(CourseScreen);
