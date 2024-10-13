import { ReactNode } from "react";
import styled from "@emotion/styled";

interface ContainerProps {
  children: ReactNode;
  style?: React.CSSProperties | undefined;
}

export const Container = ({ children, style }: ContainerProps) => {
  return <StyledContainer style={style ?? {}}>{children}</StyledContainer>;
};

export const StyledContainer = styled.div`
  display: flex;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  border: 1px solid var(--mantine-color-gray-1);
`;
