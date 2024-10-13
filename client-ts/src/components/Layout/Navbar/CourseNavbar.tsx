import { Accordion, AppShell, Button, Progress } from "@mantine/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarSectionRow } from "screens/Details/components/SectionRow";
import { mockSections } from "screens/Details/Details";
import { useCourseContext } from "src/context/CourseContext";

// interface CourseNavbarProps {

// }

export const CourseNavbar = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contextData, setSelectedCourse } = useCourseContext();
  const [value, setValue] = useState(Math.floor(Math.random() * 100));
  const selectedCourse = contextData?.selectedCourse;

  if (!selectedCourse) {
    if (id) {
      setSelectedCourse(id);
    }

    return (
      <AppShell.Navbar>
        <div>
          <div>Course Details</div>
          <div>
            <p>Loading...</p>
          </div>
        </div>
      </AppShell.Navbar>
    );
  }

  return (
    <AppShell.Navbar>
      <div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <div>Course Details</div>
        {selectedCourse && (
          <div>
            <p>{selectedCourse.title}</p>
            <Progress value={value} size="lg" />
            {value + "%"}
            <Accordion>
              {mockSections.map((section) => (
                <NavbarSectionRow section={section} />
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </AppShell.Navbar>
  );
};
