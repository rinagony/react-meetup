import { useRef } from "react";
import classes from "./NewMeetupForm.module.css";
import Card from "../ui/Card";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function NewMeetupForm(props) {
  let [userName, setUsername] = useState("");
  let [userLastName, setUserLastname] = useState("");
  let [userPhoto, setUserPhoto] = useState("");

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
        findCurrentUser(users);
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

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();
  const timeInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredTime = timeInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    const meetupData = {
      user: {
        name: userName,
        lastName: userLastName,
        photo: userPhoto
      },
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
      time: enteredTime,
      date: enteredDate
    };

    props.onAddMeetup(meetupData); //send data to parent
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label for="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label for="start">Date for your Meetup:</label>
          <input type="date" id="start" name="trip-start" required ref={dateInputRef}/>
        </div>
        <div className={classes.control}>
          <label for="appt">Time for your Meetup:</label>
          <input type="time" id="appt" name="appt" required ref={timeInputRef}></input>
        </div>
        <div className={classes.control}>
          <label for="image">Meetup Image (URL)</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label for="address">Meetup Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label for="description">Meetup Description</label>
          <textarea
            rows="5"
            required
            id="description"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
