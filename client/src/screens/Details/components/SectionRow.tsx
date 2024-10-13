import styled from "@emotion/styled";
import { Accordion } from "@mantine/core";

interface ModuleRowProps {
  section: {
    id: string;
    title: string;
    description: string;
    modules: {
      id: string;
      title: string;
      description: string;
      type: string;
      content: string;
    }[];
  };
}

const StyledModuleRow = {
  container: styled.div``,
  title: styled.div``,
  titleWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 16px 0 0;
  `,
  description: styled.div``,
  type: styled.div``,
  modules: styled.div``,
};

export const SectionRow = ({ section: section }: ModuleRowProps) => {
  return (
    <div>
      <StyledModuleRow.container key={section.id}>
        <Accordion.Item value={"section-" + section.id}>
          <Accordion.Control>
            <StyledModuleRow.titleWrapper>
              <StyledModuleRow.title>{section.title}</StyledModuleRow.title>
              <StyledModuleRow.title>
                {section.modules.length +
                  " " +
                  (section.modules.length > 1 ? "Modules" : "Module")}
              </StyledModuleRow.title>
            </StyledModuleRow.titleWrapper>
          </Accordion.Control>
          <Accordion.Panel>
            <StyledModuleRow.description>
              {section.description}
            </StyledModuleRow.description>

            {section.modules.map((module) => (
              <StyledModuleRow.modules>
                {module.title} {"\u2714"} {"\u274c"}
              </StyledModuleRow.modules>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      </StyledModuleRow.container>
    </div>
  );
};

export const NavbarSectionRow = ({ section: section }: ModuleRowProps) => {
  return (
    <div>
      <StyledModuleRow.container key={section.id}>
        <Accordion.Item value={"section-" + section.id}>
          <Accordion.Control>
            <StyledModuleRow.titleWrapper>
              <StyledModuleRow.title>{section.title}</StyledModuleRow.title>
            </StyledModuleRow.titleWrapper>
          </Accordion.Control>
          <Accordion.Panel>
            {section.modules.map((module) => (
              <StyledModuleRow.modules>
                {module.title} {"\u2714"} {"\u274c"}
              </StyledModuleRow.modules>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      </StyledModuleRow.container>
    </div>
  );
};
