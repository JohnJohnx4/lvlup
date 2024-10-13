import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { useState } from "react";
import { mockSections } from "screens/Details/Details";
import { useCourseContext } from "src/context/CourseContext";
import { withCourseLayout } from "src/hooks/withLayout";

const StyledCourseScreen = {
  root: styled.div`
    height: 600px;
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

  const currentModule =
    mockSections[currentSectionIndex].modules[currentModuleIndex];

  const selectNextModule = () => {
    setCurrentModuleIndex((prev) => {
      if (prev + 1 >= mockSections[currentSectionIndex].modules.length) {
        setCurrentSectionIndex((prev) => {
          if (prev + 1 >= mockSections.length) {
            return prev;
          }
          return prev + 1;
        });
        return 0;
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
      <StyledCourseScreen.content>
        {currentModule?.content}
      </StyledCourseScreen.content>
      <StyledCourseScreen.buttonContainer>
        <Button onClick={selectPrevModule}>Prev</Button>
        <div>
          {mockSections[currentSectionIndex].title} - {currentModuleIndex + 1} /{" "}
          {mockSections[currentSectionIndex].modules.length}
        </div>
        <Button onClick={selectNextModule}>Next</Button>
      </StyledCourseScreen.buttonContainer>
    </StyledCourseScreen.root>
  );
};

export const CoursePlayer = withCourseLayout(CourseScreen);
