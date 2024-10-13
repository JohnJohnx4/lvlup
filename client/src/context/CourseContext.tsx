import { createContext, useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

// Define your GraphQL query
const GET_DATA = gql`
  query GetData {
    courses {
      id
      title
      description
    }
  }
`;

// Create the context
const DataContext = createContext<any>(null);

// Create a provider component
export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading, error, data } = useQuery(GET_DATA);
  const [contextData, setContextData] = useState<any>(null);

  const getSingleCourse = (id: string) => {
    return contextData?.courses?.find((course: any) => course.id === id);
  };

  useEffect(() => {
    if (data) {
      setContextData(data);
    }
  }, [data]);

  const setSelectedCourse = (id: string) => {
    const course = getSingleCourse(id);
    setContextData((prev: any) => ({ ...prev, selectedCourse: course }));
  };

  return (
    <DataContext.Provider
      value={{ loading, error, contextData, setSelectedCourse }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useCourseContext = () => {
  return useContext(DataContext);
};
