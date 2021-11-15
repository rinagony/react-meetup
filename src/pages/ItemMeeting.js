import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./ItemMeeting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import favoritesContext from "../store/favorites-context";
import GoingContext from "../store/iamgoing-context";

import { connect } from "react-redux";

function ItemMeeting(props) {
  let stringPath = window.location.pathname;
  let hrefLocation = stringPath.replace("/", "");
  const [meetingItem, setMeeting] = useState({});

  useEffect(() => {
    for (let v in props.meetings) {
      if (props.meetings[v].id == hrefLocation) {
        console.log(props.meetings[v].user);
        setMeeting((prevState) => ({
          ...prevState,
          title: props.meetings[v].title,
          description: props.meetings[v].description,
          image: props.meetings[v].image,
          address: props.meetings[v].address,
          date: props.meetings[v].date,
          time: props.meetings[v].time,
          datePublic: props.meetings[v].datePublic,
          userName: props.meetings[v].user.name,
          userPhoto: props.meetings[v].user.photo,
          userLastName: props.meetings[v].user.lastName,
          userPhone: props.meetings[v].user.phone,
        }));
      }
    }
  }, [props.meetings]); 

  const [isLoading, setIsLoading] = useState(false);

  const favoritesCtx = useContext(favoritesContext);
  const itemIsFavorites = favoritesCtx.itemIsFavorite(hrefLocation);
  function toggleFavoriteStatusHandler() {
    if (itemIsFavorites) {
      favoritesCtx.removeFavorite(hrefLocation);
    } else {
      favoritesCtx.addFavorite({
        id: hrefLocation,
        title: meetingItem.title,
        description: meetingItem.description,
        image: meetingItem.image,
        address: meetingItem.address,
      });
    }
  }

  const goingCtx = useContext(GoingContext);
  const itemIsGoing = goingCtx.itemIsGoing(hrefLocation);
  function toggleGoingStatusHandler() {
    if (itemIsGoing) {
      goingCtx.removeGoing(hrefLocation);
    } else {
      goingCtx.addGoing({
        id: hrefLocation,
        title: meetingItem.title,
        description: meetingItem.description,
        image: meetingItem.image,
        address: meetingItem.address,
      });
    }
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  
  return (
    <section className={classes.block}>
      <h2>{meetingItem.title}</h2>
      <div className={classes.wrapperTopBlock}>
        <div style={{background: `linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ),
    url(${meetingItem.image})`}} className={classes.wrapperImageMeeting}>
          <div className={classes.itemTimeWrapper}>
            <div className={classes.wrapperItemInfo}>
              <h4>Date for a Meeting:</h4>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <p>{meetingItem.date}</p>
            </div>
            <div className={classes.wrapperItemInfo}>
              <h4>Time for a Meeting:</h4>
              <FontAwesomeIcon icon={faClock} />
              <p>{meetingItem.time}</p>
            </div>
            <div className={classes.wrapperItemInfo}>
              <h4>Address Meeting:</h4>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p>{meetingItem.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.wrapperContactUser}>
        <div className={classes.userWrapper}>
          <div>
            <p>Host of the event:</p>
          </div>
          <div className={classes.wrapperUserInfo}>
            <div>
              <img
                src={
                  meetingItem.userPhoto
                    ? meetingItem.userPhoto
                    : "https://www.cruzyortiz.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                }
              />
            </div>
            <div className={classes.wrapperNameUser}>
              <p className={classes.firstnameuser}>{meetingItem.userName}</p>
              <p>{meetingItem.userLastName}</p>
            </div>
          </div>
        </div>
        <div>
          <p>Contact details:</p>
          <p>{meetingItem.userPhone}</p>
        </div>
        <div>
          <p>Date of publication:</p>
          <p>{meetingItem.datePublic}</p>
        </div>
      </div>
      <div className={classes.wrapperDescription}>
        <div>
          <p>{meetingItem.description}</p>
        </div>
        <div className={classes.wrapperButtons}>
          <button onClick={toggleGoingStatusHandler}>
            {itemIsGoing ? "I am not going " : "I am going"}
          </button>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorites ? "Remove from favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    meetings: state.meetups.meetips,
  };
};

export default connect(mapStateToProps)(ItemMeeting);
