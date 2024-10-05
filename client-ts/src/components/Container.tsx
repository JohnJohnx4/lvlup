interface Props {
  children: React.ReactNode;
}

// const StyledContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 100%;
// `;

export const Container = ({ children }: Props) => {
  return <div>{children}</div>;
};
