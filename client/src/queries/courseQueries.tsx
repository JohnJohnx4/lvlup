import {
  ApolloError,
  DocumentNode,
  gql,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { CourseProps } from "components/Course/CourseCard";
import { useAuthToken } from "src/hooks/getAuthToken";
import { getCourseArray, getMappedCourse } from "src/utils/mocks/courseMock";

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
      createdBy
      isPublic
      createdAt
      updatedAt
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      title
      description
      createdBy
      isPublic
      createdAt
      updatedAt
    }
  }
`;

export const useCourseQuery = (
  query: DocumentNode,
  variables?: OperationVariables
): {
  loading: boolean;
  error: ApolloError | undefined;
  courses: CourseProps[];
  course: CourseProps | null;
} => {
  const token = useAuthToken();

  const { loading, error, data } = useQuery(query, {
    variables: variables ?? undefined,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
    skip: !token,
  });

  if (query === GET_COURSE) {
    return {
      loading,
      error,
      course: data?.course ? getMappedCourse(data.course) : null,
      courses: [],
    };
  }

  if (query === GET_COURSES) {
    return {
      loading,
      error,
      course: null,
      courses: getCourseArray(data?.courses ?? []),
    };
  }

  return { loading, error, courses: [], course: null };
};
