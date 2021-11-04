import React, { useState } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import classes from "./Login.module.css";
import { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [usernameRegistr, setUserNameRegistr] = useState();
  const [passwordRegistr, setPasswordRegistr] = useState();
  const [nameRegistr, setNameRegistr] = useState();
  const [tabIndex, setTabIndex] = useState(1);
  const [messageError, setMessageError] = useState(false);
  const [messageErrorRegistr, setMessageErrorRegistr] = useState(false);
  console.log(tabIndex);
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

  const app = firebase.initializeApp(firebaseConfig);
  const auth = app.auth();
  const db = app.firestore;


  const registerWithEmailAndPassword = async (
    usernameRegistr,
    passwordRegistr
  ) => {
    try {
      await auth.createUserWithEmailAndPassword(
        usernameRegistr,
        passwordRegistr
      ).then(function(data){
        sendDataUser(data.user.uid);
        //Here if you want you can sign in the user
      })
      setTabIndex(0);
      //   setToken(true);
    } catch (err) {
      console.error(err);
      setMessageErrorRegistr(true);
    }
  };

  function sendDataUser(uid) {
      let datauser = {
        name: nameRegistr,
        ids: uid,
      };
      fetch("https://meetup-67602-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        body: JSON.stringify(datauser),
        headers: {
          "Content-type": "application/json",
        },
      });
  }

  function registration(e) {
    e.preventDefault();
    registerWithEmailAndPassword(usernameRegistr, passwordRegistr);
  }

  const signInWithEmailAndPassword = async (username, password) => {
    try {
      await auth.signInWithEmailAndPassword(username, password).then(function(data){
        // sendDataUser(data.user.uid);
       console.log(data);
      })
      setToken(true);
      reloadFunctions();
      console.log("dd");
    } catch (err) {
      console.error(err);
      setMessageError(true);
    }
  };

  function reloadFunctions() {
    window.location.reload();
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(username, password);
  };

  return (
    <div className={classes.wrapperLogin}>
      <div className={classes.wrapperLogo}>
        <h1 className={classes.logo}>Meetup</h1>
        <p>Explore new people and new events in your city 💖</p>
      </div>
      <div className={classes.container}>
        <Tabs
          className={classes.tabsWrapper}
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabPanel>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.control}>
                <label>Email</label>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className={classes.control}>
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {messageError ? (
                <span>The email address or password is badly formatted</span>
              ) : null}
              <div className={classes.actions}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </TabPanel>
          <TabPanel>
            <h2>Register in 1 minute</h2>
            <form onSubmit={registration} className={classes.form}>
              <div className={classes.control}>
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => setNameRegistr(e.target.value)}
                />
              </div>
              <div className={classes.control}>
                <label>Email</label>
                <input
                  type="text"
                  onChange={(e) => setUserNameRegistr(e.target.value)}
                />
              </div>
              <div className={classes.control}>
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => setPasswordRegistr(e.target.value)}
                />
              </div>
              {messageErrorRegistr ? (
                <span>The email address or password is badly formatted</span>
              ) : null}
              <div className={classes.actions}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </TabPanel>
          <TabList>
            <Tab
              className={!tabIndex ? classes.itemTabActive : classes.itemTab}
            >
              Already have account? Log In!
            </Tab>
            <Tab className={tabIndex ? classes.itemTabActive : classes.itemTab}>
              Registration
            </Tab>
          </TabList>
        </Tabs>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
