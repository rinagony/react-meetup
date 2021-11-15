import React from "react";
import { useEffect, useState } from "react";
import classes from "./People.module.css";
import { connect } from "react-redux";
import Loader from './../components/ui/Loader';

function People(props) {
  const [usersLoaded, setUsersLoaded] = useState([]);

  useEffect(() => {
    const users = [];
    for (const key in props.users) {
      const user = {
        id: key,
        ...props.users[key],
      };
      users.push(user);
    }
    setUsersLoaded(users);
  }, [props.users]);
  if(!props.users) {
    return (
        <Loader />
    )
  }

  return (
    <div>
      <h1>People who you may to meet 🧐</h1>
      <div>
        {usersLoaded.map((user) => (
          <div className={classes.userItem}>
            <img
              className={classes.imageUser}
              src={
                user.photo
                  ? user.photo
                  : "https://www.cruzyortiz.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
              }
            />
            <p className={classes.nameItem}>{user.name}</p>
            <p>{user.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};
export default connect(mapStateToProps)(People);
