import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import PropTypes from "prop-types";

import FavoritesContext from "../../store/favorites-context";
import GoingContext from "../../store/iamgoing-context";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useToken from "../../useToken";

function MainNavigation(props) {
  const { token, setToken } = useToken();
  const favoritesCtx = useContext(FavoritesContext);
  const goingCtx = useContext(GoingContext);
  const firebaseConfig = {
    apiKey: "AIzaSyAo3DBB-GThtgoOLdCJ44_6besiBr0ijTM",
    authDomain: "meetup-67602.firebaseapp.com",
    databaseURL: "https://meetup-67602-default-rtdb.firebaseio.com",
    projectId: "meetup-67602",
    storageBucket: "meetup-67602.appspot.com",
    messagingSenderId: "704763914024",
    appId: "1:704763914024:web:cd40972252c7ed5647d21d",
    measurementId: "G-JCTL8EN83V",
  };
  console.log(token)
  const app = firebase.initializeApp(firebaseConfig);
  const auth = app.auth();

  async function logoutnavigation() {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
    setToken(false);
    reloadFunctions();
    // let tokenItem = false;
    // props.conditionToken(tokenItem);
  }

  function reloadFunctions() {
    window.location.reload();
  }
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Meetup</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add new meetup</Link>
          </li>
          <li>
            <Link to="/favorites">
              Favorites
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/going">
              I'm going
              <span className={classes.badge}>{goingCtx.totalGoing}</span>
            </Link>
          </li>
          <li>
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>Settings</button>
              <div className={classes.dropdownContent}>
                <Link to={`/myaccount`}>My account</Link>
                <Link to={`/myaccount`}>Settings</Link>
              </div>
            </div>
          </li>
          <li>
            <button className={classes.btnLogOut} onClick={logoutnavigation}>
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
