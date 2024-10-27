import styled from "@emotion/styled";

const StyledContentScreen = {
  content: styled.div`
    background-color: #f0f0f0;
    border: 1px solid red;
    border-radius: 8px;
    width: 100%;
    height: 90%;
    padding: 32px 48px;
    display: flex;
    justify-content: center;
  `,
  buttonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  `,
  video: styled.video`
    width: 100%;
    height: auto;
    max-height: 100%;
  `,
  image: styled.img`
    width: 100%;
    height: auto;
    max-height: 100%;
  `,
  contentContainer: styled.div`
    overflow-y: scroll;
  `,
};

interface ContentProps {
  content: string;
  type: string;
}

export const Content = ({ content, type }: ContentProps) => {
  const renderContent = () => {
    switch (type) {
      case "text":
        return <TextContent content={content} />;
      case "image":
        return <ImageContent content={content} />;
      case "video":
        return <VideoContent content={content} />;
      case "document":
        return <DocumentContent content={content} />;
      default:
        return <TextContent content={content} />;
    }
  };

  return (
    <StyledContentScreen.content>{renderContent()}</StyledContentScreen.content>
  );
};

const TextContent = ({ content }: { content: string }) => {
  return (
    <StyledContentScreen.contentContainer>
      <div>Text Content</div>
      {content.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </StyledContentScreen.contentContainer>
  );
};

const ImageContent = ({ content }: { content: string }) => {
  return (
    <StyledContentScreen.contentContainer>
      <div>Image</div>
      <StyledContentScreen.image src={content} alt="content" />
    </StyledContentScreen.contentContainer>
  );
};

const VideoContent = ({ content }: { content: string }) => {
  return (
    <StyledContentScreen.contentContainer>
      <div>Video</div>
      <StyledContentScreen.video controls>
        <source src={content} type="video/mp4" />
      </StyledContentScreen.video>
    </StyledContentScreen.contentContainer>
  );
};

const DocumentContent = ({ content }: { content: string }) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div>Document</div>
      <iframe src={content} width="100%" height="100%" />
    </div>
  );
};
