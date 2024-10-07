import { DocumentNode, gql, useQuery } from "@apollo/client";
import { useAuthToken } from "src/hooks/getAuthToken";
import { getCourseArray } from "src/utils/mocks/courseMock";

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

export const useCourseQuery = (query: DocumentNode) => {
  const token = useAuthToken();

  const { loading, error, data } = useQuery(query, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
    skip: !token,
  });

  const courses = getCourseArray(data?.courses ?? []);

  return { loading, error, data, courses };
};
