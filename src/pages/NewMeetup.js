import { useHistory } from "react-router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {

  const history = useHistory();
  function addMeetupHandler(meetupData) {
    //get data from the child
    fetch("https://meetup-67602-default-rtdb.firebaseio.com/meetups.json", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      history.replace("/"); //go back to home page after request has completed
    }); //send request to database
  }

  return (
    <section>
      <h1>Add new meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
