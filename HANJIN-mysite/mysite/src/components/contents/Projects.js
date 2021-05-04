import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import Context from "../common/Context";
import LinkCustom from "../common/LinkCustom";
import projectsArray from "../../lib/projects";
import { GrProjects } from "react-icons/gr";

const StyledProjects = styled(Responsive)`
  text-align: center;
  background: none;
  height: 100%;
`;

const ProjectsWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: left;
`;

const StyledLinkCustom = styled(LinkCustom)`
  height: 7rem;
  margin-top: 1rem;
  padding-right: 0;
  transition: all ease 0.1s;
  &:hover {
    transform: scale(1.02);
    font-weight: bold;
  }

  @media (max-width: 1024px) {
    height: auto;
    padding-right: 1rem;
  }

  .intext {
    .description {
      color: black;
      font-size: 1rem;
      margin-right: 1rem;
    }
  }

  img {
    width: 20rem;
    height: auto;
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

const StyledProject = styled.div`
  padding: 1rem;
  @media (max-width: 1024px) {
    margin-right: 2rem;
  }
`;

const Projects = () => {
  const projects = projectsArray;

  return (
    <StyledProjects>
      <ProjectsWrapper>
        <Context>
          <h3>
            <GrProjects className="icon" />
            Projects (최근 순)
          </h3>
          {projects.map((project) => (
            <StyledProject key={project.key}>
              <StyledLinkCustom url={project.gitgub}>
                <div className="intext">
                  <h3>
                    {project.key}. {project.title}
                  </h3>
                  <div>
                    <p>{project.tags.map((tag) => "#" + tag + " ")}</p>
                    <p>{project.description}</p>
                  </div>
                </div>
                <img src={project.imgSrc} alt="" />
              </StyledLinkCustom>
            </StyledProject>
          ))}
        </Context>
      </ProjectsWrapper>
    </StyledProjects>
  );
};

export default Projects;
