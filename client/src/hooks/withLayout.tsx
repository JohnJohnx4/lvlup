// app/hocs/withLayout.tsx
import { Layout } from "components/Layout/Layout";

export const withNavLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };

  return HOC;
};

export const withCourseLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC: React.FC<P> = (props) => {
    return (
      <Layout courseNavbar>
        <WrappedComponent {...props} />
      </Layout>
    );
  };

  return HOC;
};
