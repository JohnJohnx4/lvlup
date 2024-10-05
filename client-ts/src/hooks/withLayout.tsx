// app/hocs/withLayout.tsx
import { Layout } from "components/Layout/Layout";

export const withLayout = <P extends object>(
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
