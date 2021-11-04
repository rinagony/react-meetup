import { createContext, useState } from 'react';

const GoingContext = createContext({
  going: [],
  totalGoing: 0,
  addGoing: (goingMeetup) => {},
  removeGoing: (meetupId) => {},
  itemIsGoing: (meetupId) => {}
});

export function GoingContextProvider(props) {
  const [userGoing, setUserGoing] = useState([]);

  function addGoingHandler(goingMeetup) {
    setUserGoing((prevUserGoing) => {
      return prevUserGoing.concat(goingMeetup);
    });
  }

  function removeGoingHandler(meetupId) {
    setUserGoing(prevUserGoing => {
      return prevUserGoing.filter(meetup => meetup.id !== meetupId);
    });
  }

  function itemIsGoingHandler(meetupId) {
    return userGoing.some(meetup => meetup.id === meetupId);
  }

  const context = {
    going: userGoing,
    totalGoing: userGoing.length,
    addGoing: addGoingHandler,
    removeGoing: removeGoingHandler,
    itemIsGoing: itemIsGoingHandler
  };

  return (
    <GoingContext.Provider value={context}>
      {props.children}
    </GoingContext.Provider>
  );
}

export default GoingContext;