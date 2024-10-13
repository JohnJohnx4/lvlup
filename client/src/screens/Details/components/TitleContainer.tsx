import { Container } from "components/Details/Container";
import { StyledTitle } from "./Title.styles";

interface TitleContainerProps {
  title: string;
  description: string;
}

export const TitleContainer = ({ title, description }: TitleContainerProps) => {
  return (
    <Container>
      <StyledTitle.container>
        <StyledTitle.title>{title}</StyledTitle.title>
        <StyledTitle.description>{description}</StyledTitle.description>
      </StyledTitle.container>
    </Container>
  );
};
