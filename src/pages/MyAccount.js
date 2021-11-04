import { useEffect, useState } from "react";
import { useRef } from "react";
import classes from "./MyAccount.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function MyAccount() {
  const [loadedUsers, setLoadedUsers] = useState([]);
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

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  // const auth = getAuth();

  const nameInputRef = useRef();
  const lastNameInputRef = useRef();
  const myPhotoRef = useRef();
  const [dataChanged, setDataChanged] = useState(true);
  let [userName, setUsername] = useState("");
  let [userLastName, setUserLastname] = useState("");
  let [userPhoto, setUserPhoto] = useState("");
  let [editInput, setEditInput] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (authUser) {
      if (authUser) {
        localStorage.setItem("useruid", authUser.uid);
        console.log(typeof authUser.uid);
      }
    });

    fetch("https://meetup-67602-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const users = [];
        for (const key in data) {
          const user = {
            id: key,
            ...data[key],
          };
          users.push(user);
        }
        console.log(users);
        findCurrentUser(users);
        setLoadedUsers(users);
      }); //send get request to database
  }, []); //render only first time thankful to useeffect

  function findCurrentUser(users) {
    let uidUser = localStorage.getItem("useruid");
    for (let i = 0; i < users.length; i++) {
      if (users[i].ids == uidUser) {
        console.log(users[i].id);
        if (users[i].id !== undefined) {
          localStorage.setItem("userKey", users[i].id);
        }
        setUsername(users[i].name);
        setUserLastname(users[i].lastName);
        setUserPhoto(users[i].photo);
      }
    }
  }

  function unaibleInput() {
    setEditInput(true);
  }

  function onAccountChange(value) {
    setUserPhoto(value);
  }

  function onAccountChangeLastName(value) {
    setUserLastname(value);
  }

  function onAccountChangeName(value) {
    setUsername(value);
  }

  function submitForm(event) {
    event.preventDefault();

    const enteredTitle = nameInputRef.current.value;
    const enteredlastName = lastNameInputRef.current.value;
    const enteredPhoto = myPhotoRef.current.value;
    const ids = localStorage.getItem("useruid");

    const keyUser = localStorage.getItem("userKey");
    const db = getDatabase();
    set(ref(db, "users/" + keyUser), {
      ids: ids,
      name: enteredTitle,
      lastName: enteredlastName,
      photo: enteredPhoto,
    })
      .then(() => {
        setDataChanged(true);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetch("https://meetup-67602-default-rtdb.firebaseio.com/users.json", {
    //   method: "POST",
    //   body: JSON.stringify(datauser),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // }).then(() => {
    //   setDataChanged(true);
    // });

    // localStorage.setItem("userName", enteredTitle);
    // localStorage.setItem("userLastName", enteredlastName);
    // localStorage.setItem("userPhoto", enteredPhoto);
  }
  return (
    <div>
      <h1>My Account</h1>
      {!editInput ? (
        <button className={classes.buttonEdit} onClick={unaibleInput}>
          Edit
        </button>
      ) : null}
      <form
        onSubmit={submitForm}
        className={editInput ? classes.formMain : classes.formMainEdit}
      >
        <div className={classes.control}>
          <label for="myName">My name:</label>
          <input
            className={editInput ? classes.banner : classes.active}
            disabled={!editInput ? "disabled" : ""}
            ref={nameInputRef}
            id="myName"
            type="text"
            required
            value={userName}
            onChange={(e) => onAccountChangeName(e.target.value)}
          />
        </div>

        <div className={classes.control}>
          <label for="myLastName">My last name:</label>
          <input
            className={editInput ? classes.banner : classes.active}
            disabled={!editInput ? "disabled" : ""}
            ref={lastNameInputRef}
            id="myLastName"
            onChange={(e) => onAccountChangeLastName(e.target.value)}
            required
            type="text"
            value={userLastName}
          />
        </div>

        <div className={classes.control}>
          <label for="myPhoto">Upload profile photo (URL)</label>
          <div className={classes.specialControl}>
            <img
              src={
                userPhoto
                  ? userPhoto
                  : "https://www.cruzyortiz.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
              }
            />
            <input
              disabled={!editInput ? "disabled" : ""}
              ref={myPhotoRef}
              className={editInput ? classes.banner : classes.active}
              type="text"
              id="myPhoto"
              onChange={(e) => onAccountChange(e.target.value)}
              value={userPhoto}
              placeholder={userPhoto ? userPhoto : null}
            />
          </div>
        </div>

        {editInput ? (
          <button className={classes.saveDataBtn}>Save</button>
        ) : null}
        {!dataChanged ? <p>Successfully changed!</p> : null}
      </form>
    </div>
  );
}

export default MyAccount;
