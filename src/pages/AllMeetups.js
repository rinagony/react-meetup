import { useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { connect } from "react-redux";
import Loader from "../components/ui/Loader";

function AllMeetupsPage(props) {

  if (!props.meetings) {
    return (
      <Loader />
    );
  }

  return (
    props.meetings ? 
    <section>
      <h1>All meetups</h1>
      <MeetupList meetups={props.meetings} />
    </section>
    : <p>Error</p>
  );
}

const mapStateToProps = (state) => {
  return {
    meetings: state.meetups.meetips,
  };
};
export default connect(mapStateToProps)(AllMeetupsPage);
