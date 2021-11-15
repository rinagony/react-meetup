export const getMeetups = () => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      fetch("https://meetup-67602-default-rtdb.firebaseio.com/meetups.json")
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          dispatch({
            type: "GET_MEETUPS",
            payload: json,
          });
          resolve(json);
        })
        .catch((err) => {
          console.log(err.response, err.response.status);
          reject(err);
        });
    });
  };
};

export const newMeetup = (meetupData) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      fetch("https://meetup-67602-default-rtdb.firebaseio.com/meetups.json", {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-type": "application/json",
        },
      }).then((json) => {
        dispatch(getMeetups());
        resolve(json);
      }).catch((err) => {
        console.log(err.response, err.response.status);
        reject(err);
      });
    });
  };
};


export const getUser = () => {
  return function(dispatch) {
    return new Promise ((resolve, reject) => {
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
        return users
      }).then((users) => {
        dispatch({
          type: "GET_USERS",
          payload: users,
        });
      })
    })
  }
}