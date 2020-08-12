import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as Scroll from "react-scroll";
import Skeleton from "@material-ui/lab/Skeleton";
import headerImg from "../../images/backgrounds/headerImg.jpg";
import "../../styles/LandingLayout.css";

/*icons*/
import usersIcon from "../../images/benefits/userImg.png";
import todosIcon from "../../images/benefits/tasksList.png";
import projectsIcon from "../../images/benefits/projectPage.png";
import Benefit from "../welcome-section/Benefit";
import Statistics from "../welcome-section/Statistics";

const useProgressiveImage = (src) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};

const LandingLayout = (props) => {
  const ScrollLink = Scroll.Link;
  const { state } = useContext(GlobalContext);
  const [completedUsers, setCompletedUsers] = useState([]);
  const [mostProjects, setMostProjects] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);
  const loaded = useProgressiveImage(headerImg);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    if (state.todosProgress) {
      const mappedUsers = state.todosProgress
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);
      setCompletedUsers(mappedUsers);
    } else {
      setCompletedUsers([]);
    }
  }, [state.todosProgress]);

  useEffect(() => {
    if (state.projectsProgress) {
      const mappedMostProjects = state.projectsProgress
        .sort((a, b) => b.projects.length - a.projects.length)
        .slice(0, 5);
      setMostProjects(
        mappedMostProjects.map((x) => {
          return { ...x, projects: x.projects.length };
        })
      );
    } else {
      setMostProjects([]);
    }
  }, [state.projectsProgress]);

  return (
    <>
      {(width >= 650 || state.isWelcome) && (
        <div className='container-default'>
          <div className='top-section'>
            <div
              className='welcome-header'
              style={
                loaded
                  ? {
                      backgroundImage: `url(${loaded})`,
                    }
                  : null
              }>
              {!loaded && (
                <Skeleton
                  variant='rect'
                  height={width < 650 ? "20vh" : "30vh"}
                  animation='wave'
                />
              )}
              {loaded && (
                <h1>
                  <span className='capital-letter'>W</span>elcome!
                </h1>
              )}
            </div>
            <p className='intro-title'>
              On our platform you can do the following:
            </p>
            <div className='container-benefits'>
              <Benefit src={usersIcon} type='users' />
              <Benefit src={todosIcon} type='todos' />
              <Benefit src={projectsIcon} type='projects' />
            </div>
          </div>

          {width < 650 ? (
            <Accordion
              style={{ backgroundColor: "transparent", marginBottom: "1em" }}
              expanded={expanded === "statisticsPanel"}
              onChange={handleChange("statisticsPanel")}>
              <ScrollLink
                activeClass='active'
                to='container-statistics'
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}>
                <AccordionSummary
                  style={{
                    backgroundColor: "#cccccc81",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='usersPanel-content'
                  id='usersPanel-header'>
                  <Typography
                    style={{
                      textDecoration: `${
                        expanded === "statisticsPanel" ? "underline" : ""
                      }`,
                    }}>
                    <i className='fas fa-chart-line icon'></i>
                    Dashboard
                  </Typography>
                </AccordionSummary>
              </ScrollLink>
              <AccordionDetails>
                <Statistics
                  width={width}
                  completedUsers={completedUsers}
                  mostProjects={mostProjects}
                />
              </AccordionDetails>
            </Accordion>
          ) : (
            <Statistics
              width={width}
              completedUsers={completedUsers}
              mostProjects={mostProjects}
              loaded={loaded}
            />
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(LandingLayout);
