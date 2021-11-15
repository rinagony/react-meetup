
  const reducerMeetups = (state = [], action) => {
    switch (action.type) {
      case "GET_MEETUPS":
          {
          let x = []
          for(let v in action.payload) {
            action.payload[v].id = v;
            x.push(action.payload[v])
          }
          return {...state, meetips: x};
        }
      default:
        return state;
    }
  };
  
  export default reducerMeetups;