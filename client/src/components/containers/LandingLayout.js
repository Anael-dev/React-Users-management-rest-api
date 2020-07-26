import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../context/UsersContext";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import * as Scroll from "react-scroll";

import "../../styles/LandingLayout.css";

/*icons*/
import usersIcon from "../../images/benefits/userImg.png";
import todosIcon from "../../images/benefits/tasksList.png";
import postsIcon from "../../images/benefits/postPage.png";

import Benefit from "../landing-layout/Benefit";
import Statistics from "../landing-layout/Statistics";

const LandingLayout = () => {
  const ScrollLink = Scroll.Link;
  const { state } = useContext(UsersContext);

  const [completedUsers, setCompletedUsers] = useState([]);
  const [bestAuthors, setBestAuthors] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);

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
    const mappedUsers = state.todosProgress
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
    setCompletedUsers(mappedUsers);
  }, [state.todosProgress]);

  useEffect(() => {
    const mappedAuthors = state.postsProgress
      .sort((a, b) => b.posts - a.posts)
      .slice(0, 5);
    setBestAuthors(mappedAuthors);
  }, [state.postsProgress]);

  return (
    <div className='container-default'>
      <div className='top-section'>
        <div className='welcome-header'>
          <h1>
            <span className='capital-letter'>W</span>elcome!
          </h1>
        </div>
        <p className='intro-title'>In our platform you can do the following:</p>
        <div className='container-benefits'>
          <Benefit src={usersIcon} type='users' />
          <Benefit src={todosIcon} type='todos' />
          <Benefit src={postsIcon} type='posts' />
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
                backgroundColor: "#dbd6d6bb",
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
                Statistics
              </Typography>
            </AccordionSummary>
          </ScrollLink>
          <AccordionDetails>
            <Statistics
              width={width}
              completedUsers={completedUsers}
              bestAuthors={bestAuthors}
            />
          </AccordionDetails>
        </Accordion>
      ) : (
        <Statistics
          width={width}
          completedUsers={completedUsers}
          bestAuthors={bestAuthors}
        />
      )}
    </div>
  );
};

export default React.memo(LandingLayout);
