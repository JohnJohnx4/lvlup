import { Container } from "components/Details/Container";
import { useParams } from "react-router-dom";
import { withLayout } from "src/hooks/withLayout";
import { GET_COURSE, useCourseQuery } from "src/queries/courseQueries";
import { TitleContainer } from "./TitleContainer";
import { SectionRow } from "./SectionRow";
import { Accordion, Button } from "@mantine/core";
import { showDaysOrLocaleDate } from "src/utils/dateTime";

const mockSections = [
  {
    id: "1",
    title: "Section 1",
    description: "Section 1 description",
    modules: ["1"],
  },
  {
    id: "2",
    title: "Section 2",
    description: "Section 2 description",
    modules: ["1", "2"],
  },
  {
    id: "3",
    title: "Section 3",
    description: "Section 3 description",
    modules: ["1", "2", "3"],
  },
  {
    id: "4",
    title: "Section 4",
    description: "Section 4 description",
    modules: ["1", "2", "3", "4"],
  },
];

const CourseDetailsScreen = () => {
  // get route param ID
  const { id } = useParams<{ id: string }>();

  const { course } = useCourseQuery(GET_COURSE, { id });

  console.log({ course });

  return (
    <div>
      {course && (
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "1280px",
            gap: "16px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TitleContainer
              title={course.title}
              description={course.description}
            />

            <Container
              style={{
                flexDirection: "column",
              }}
            >
              <div>
                <h3>{mockSections.length} Sections</h3>
              </div>
              <Accordion>
                {mockSections.map((module) => (
                  <SectionRow section={module} />
                ))}
              </Accordion>
            </Container>
          </div>
          <Container
            style={{
              width: "40%",
              textWrap: "wrap",
              wordWrap: "break-word",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div>
              <div>{course.badge}</div>
              <img width={"100%"} height="auto" src={course.image} />
              <div>Due {showDaysOrLocaleDate(course.dueDate)}</div>
              <div>Assigned on {course.assignedDate?.toLocaleDateString()}</div>
            </div>
            <Button>Start Course</Button>
          </Container>
        </div>
      )}
    </div>
  );
};

export const CourseDetails = withLayout(CourseDetailsScreen);
