import { useEffect, useState } from "react";
import { useRef } from "react";
import classes from "./MyAccount.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase, ref, set } from "firebase/database";
import { connect } from "react-redux";
import Loader from "../components/ui/Loader";

function MyAccount(props) {
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

    const users = [];
    for (const key in props.users) {
      const user = {
        id: key,
        ...props.users[key],
      };
      users.push(user);
    }
    console.log(users);
    findCurrentUser(users);
  }, [props.users]);

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
  }

  if (!props.users) {
    return <Loader />;
  }
  return (
    <div>
      <h1>My Account</h1>
      {!editInput ? (
        <button className={classes.buttonEdit} onClick={setEditInput(true)}>
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
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={classes.control}>
          <label for="myLastName">My last name:</label>
          <input
            className={editInput ? classes.banner : classes.active}
            disabled={!editInput ? "disabled" : ""}
            ref={lastNameInputRef}
            id="myLastName"
            onChange={(e) => setUserLastname(e.target.value)}
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
              onChange={(e) => setUserPhoto(e.target.value)}
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

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};
export default connect(mapStateToProps)(MyAccount);
