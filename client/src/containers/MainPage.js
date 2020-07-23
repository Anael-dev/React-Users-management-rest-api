import React, { useState, useEffect, useContext, useCallback } from "react";
import { Route, Switch, Link } from "react-router-dom";
import UsersContext from "../context/UsersContext";
import { animateScroll } from "react-scroll";
import "../styles/MainPage.css";

/*utils*/
import usersDAL from "../utils/usersDAL";
import postsDAL from "../utils/postsDAL";
import todosDAL from "../utils/todosDAL";

/*components*/
import RouteComponents from "../containers/RouteComponents";
import Users from "../components/wrappers/Users";
import SearchField from "../components/SearchField";
import LandingLayout from "../components/wrappers/LandingLayout";
import headerImg from "../images/header.png";

const MainPage = () => {
  const { dispatch } = useContext(UsersContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await usersDAL.getAllUsers();
        dispatch({
          type: "FETCH_USERS",
          payload: users,
        });
        const posts = await postsDAL.getAllPosts();
        dispatch({
          type: "FETCH_POSTS",
          payload: posts,
        });
        const todos = await todosDAL.getAllTodos();
        dispatch({
          type: "FETCH_TODOS",
          payload: todos,
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
    <div>
      <header>
        <Link to={"/"}>
          <img
            className='header-logo'
            src={headerImg}
            alt='header'
            onClick={() => animateScroll.scrollToTop()}
          />
        </Link>
      </header>
      <div className='container'>
        <SearchField />
        <div className='main-page'>
          <div className='container-left'>
            <Users />
          </div>
          <Switch>
            <Route exact path='/users/default' component={LandingLayout} />
            <Route component={RouteComponents} />
          </Switch>
        </div>
      </div>
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
    </div>
  );
};

export default MainPage;
