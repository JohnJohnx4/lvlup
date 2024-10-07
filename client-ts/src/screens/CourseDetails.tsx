import { useParams } from "react-router-dom";
import { withLayout } from "src/hooks/withLayout";

const CourseDetailsScreen = () => {
  // get route param ID
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div>CourseDetails</div>
      <div>Course: {id}</div>
    </div>
  );
};

export const CourseDetails = withLayout(CourseDetailsScreen);
