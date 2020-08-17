import React, { useState, useEffect, useContext, useCallback } from "react";
import { Route, Switch, NavLink, Link } from "react-router-dom";
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
import Users from "../components/users/Users";
import SearchField from "../components/containers/SearchField";
import LandingLayout from "../components/containers/LandingLayout";
import headerImg from "../images/header.png";
import Skeleton from "@material-ui/lab/Skeleton";
import ProjectsTab from "../components/projects/ProjectsTab";

const useProgressiveImage = (src) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};

const MainPage = () => {
  const ScrollLink = Scroll.Link;
  const { state, dispatch } = useContext(GlobalContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [expanded, setExpanded] = useState("usersPanel");
  const [width, setWidth] = useState(window.innerWidth);
  const loaded = useProgressiveImage(headerImg);

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
        <Link to={"/users"}>
          {loaded ? (
            <img
              className='header-logo'
              src={headerImg}
              alt='header'
              onClick={() => {
                animateScroll.scrollToTop();
                setExpanded("usersPanel");
              }}
            />
          ) : (
            <Skeleton
              variant='rect'
              width={"100%"}
              height={"1.5rem"}
              animation='wave'
            />
          )}
        </Link>
      </header>
      {state.isLoading ? (
        <LinearProgress />
      ) : (
        <div className='container'>
          <SearchField callBack={() => setExpanded("usersPanel")} />
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
            <div className='container-users'>
              {width < 650 ? (
                <>
                  <Accordion
                    style={{
                      backgroundColor: "transparent",
                      marginBottom: "1em",
                    }}
                    expanded={expanded === "projectsPanel"}
                    onChange={handleChange("projectsPanel")}>
                    <ScrollLink
                      activeClass='active'
                      to='container-projects'
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}>
                      <AccordionSummary
                        style={{
                          backgroundColor: "#4591af85",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='projectsPanel-content'
                        id='projectsPanel-header'>
                        <Typography
                          style={{
                            textDecoration: `${
                              expanded === "projectsPanel" ? "underline" : ""
                            }`,
                          }}>
                          <i className='fas fa-briefcase icon'></i>
                          Projects
                        </Typography>
                      </AccordionSummary>
                    </ScrollLink>
                    <AccordionDetails>
                      <ProjectsTab isAccordion={true} />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    style={{
                      backgroundColor: "transparent",
                      marginBottom: "1em",
                    }}
                    expanded={expanded === "usersPanel"}
                    onChange={handleChange("usersPanel")}>
                    <ScrollLink
                      activeClass='active'
                      to='container-users'
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}>
                      <AccordionSummary
                        style={{
                          backgroundColor: "#da943285",
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
                          <i className='fas fa-user-tie icon'></i>
                          Users
                        </Typography>
                      </AccordionSummary>
                    </ScrollLink>
                    <AccordionDetails>
                      <Users isAccordion={true} />
                    </AccordionDetails>
                  </Accordion>
                </>
              ) : (
                <>
                  <div className='links-section'>
                    <NavLink
                      className='nav-link'
                      to='/users'
                      activeClassName='active-route'>
                      <h3 className='link-title'>Users</h3>
                    </NavLink>
                    <NavLink
                      className='nav-link'
                      to='/projects'
                      activeClassName='active-route'>
                      <h3 className='link-title'>Projects</h3>
                    </NavLink>
                  </div>
                  <Switch>
                    <Route path='/users' component={Users} />
                    <Route path='/projects' component={ProjectsTab} />
                  </Switch>
                  {/* <Users isAccordion={false} /> */}
                </>
              )}
            </div>
            <Switch>
              <Route exact path='/users' component={LandingLayout} />
              <Route exact path='/projects' component={LandingLayout} />
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
          <i className='fab fa-linkedin'></i>
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
