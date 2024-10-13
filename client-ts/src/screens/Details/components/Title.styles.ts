import styled from "@emotion/styled";

export const StyledTitle = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  `,
  title: styled.h1`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  `,
  description: styled.p`
    font-size: 1rem;
    color: var(--mantine-color-gray-6);
  `,
};
