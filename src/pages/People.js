import React from "react";
import { useEffect, useState } from "react";
import classes from './People.module.css'

function People() {
  const [usersLoaded, setUsersLoaded] = useState([]);

  useEffect(() => {
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
        setUsersLoaded(users);
        console.log(users);
        loadedUsersShow();
      }); //send get request to database
  }, []); //render only first time thankful to useeffect

  function loadedUsersShow() {
    console.log(usersLoaded);
  }

  return (
    <div>
      <h1>People who you may to meet 🧐</h1>
      <div>
        {usersLoaded.map((user) => (
          <div className={classes.userItem}>
            <img className={classes.imageUser} src={
                user.photo
                  ? user.photo
                  : "https://www.cruzyortiz.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
              } />
            <p className={classes.nameItem}>{user.name}</p> 
            <p>{user.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;
