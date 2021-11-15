import { useHistory } from "react-router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

function NewMeetupPage() {
  const dispatch = useDispatch();

  const { newMeetup } = bindActionCreators(actionCreators, dispatch);

  const history = useHistory();
  function addMeetupHandler(meetupData) {
    newMeetup(meetupData);
    history.replace("/");
  }

  return (
    <section>
      <h1>Add new meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
