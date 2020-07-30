import React, { useState, useEffect, useContext, useCallback } from "react";
import { Route, Switch, Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import MainPageContext from "../context/MainPageContext";
import { animateScroll } from "react-scroll";
import * as Scroll from "react-scroll";
import Alert from "../components/layout/Alert";
import "../styles/MainPage.css";

/*material UI*/
import LinearProgress from "@material-ui/core/LinearProgress";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Snackbar from "@material-ui/core/Snackbar";

/*utils*/
import usersAPI from "../utils/usersAPI";
import projectsAPI from "../utils/projectsAPI";
import todosAPI from "../utils/todosAPI";

/*components*/
import RouteComponents from "../components/containers/RouteComponents";
import Users from "../components/containers/Users";
import SearchField from "../components/containers/SearchField";
import LandingLayout from "../components/containers/LandingLayout";
import headerImg from "../images/header.png";

const MainPage = () => {
  const ScrollLink = Scroll.Link;
  const { state, dispatch } = useContext(GlobalContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [expanded, setExpanded] = useState("usersPanel");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: "HIDE_LOADER",
      });
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await usersAPI.getAllUsers();
        dispatch({
          type: "FETCH_USERS",
          payload: users.reverse(),
        });
        const projects = await projectsAPI.getAllProjects();
        dispatch({
          type: "FETCH_PROJECTS",
          payload: projects.reverse(),
        });
        const todos = await todosAPI.getAllTodos();
        dispatch({
          type: "FETCH_TODOS",
          payload: todos.reverse(),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <MainPageContext.Provider
      value={{
        closeAccordion: () => setExpanded(false),
      }}>
      <header>
        <Link to={"/"}>
          <img
            className='header-logo'
            src={headerImg}
            alt='header'
            onClick={() => {
              animateScroll.scrollToTop();
              setExpanded("usersPanel");
            }}
          />
        </Link>
      </header>
      {state.isLoading ? (
        <LinearProgress />
      ) : (
        <div className='container'>
          <SearchField />
          <Snackbar
            className='snack-bar'
            open={state.snackBar.open}
            autoHideDuration={1500}
            onClose={() =>
              dispatch({
                type: "HIDE_SNACK_BAR",
              })
            }>
            <Alert
              onClose={() =>
                dispatch({
                  type: "HIDE_SNACK_BAR",
                })
              }
              severity='success'>
              {state.snackBar.massage}
            </Alert>
          </Snackbar>
          <div className='main-page'>
            <div className='container-left'>
              {width < 650 ? (
                <Accordion
                  style={{
                    backgroundColor: "transparent",
                    marginBottom: "1em",
                  }}
                  expanded={expanded === "usersPanel"}
                  onChange={handleChange("usersPanel")}>
                  <ScrollLink
                    activeClass='active'
                    to='container-left'
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}>
                    <AccordionSummary
                      style={{
                        backgroundColor: "#a7d5f2a2",
                      }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='usersPanel-content'
                      id='usersPanel-header'>
                      <Typography
                        style={{
                          textDecoration: `${
                            expanded === "usersPanel" ? "underline" : ""
                          }`,
                        }}>
                        Users List
                      </Typography>
                    </AccordionSummary>
                  </ScrollLink>
                  <AccordionDetails>
                    <Users isAccordion={true} />
                  </AccordionDetails>
                </Accordion>
              ) : (
                <Users isAccordion={false} />
              )}
            </div>
            <Switch>
              <Route exact path='/' component={LandingLayout} />
              <Route component={RouteComponents} />
            </Switch>
          </div>
        </div>
      )}

      {scrollPosition > 350 && (
        <div className='scroll'>
          <button
            className='btn btn-scroll'
            onClick={() => animateScroll.scrollToTop()}>
            <span> Back to top</span>
            <i className='fas fa-chevron-up'></i>
          </button>
        </div>
      )}
      <footer>
        <span className='footer-span'>
          Created with<i className='fas fa-heart heart-icon'></i>
          by @Anael-dev
        </span>
        <a
          className='footer-link'
          href='https://www.linkedin.com/in/anael-mashinsky/'
          target='_blank'
          rel='noopener noreferrer'>
          <i className='fab fa-linkedin-in'></i>
        </a>
        <br />
        <a
          className='footer-link'
          href='https://github.com/Anael-dev'
          target='_blank'
          rel='noopener noreferrer'>
          <i className='fab fa-github'></i>
        </a>
      </footer>
    </MainPageContext.Provider>
  );
};

export default MainPage;
