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

function ItemMeeting(datas) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [meetingItem, setMeeting] = useState({
    title: "",
    description: "",
  });

  let stringPath = window.location.pathname;
  let hrefLocation = stringPath.replace("/", "");

  useEffect(() => {
    //useeefect helps to do code only once. it helps from loop
    setIsLoading(true);
    fetch("https://meetup-67602-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          if (key == hrefLocation) {
            const meetup = {
              id: key,
              ...data[key],
            };
            meetups.push(meetup);
          }
        }
        setDataExact(meetups);
        setIsLoading(false);
      }); //send get request to database
  }, []); //render only first time thankful to useeffect

  function setDataExact(meetups) {
    let result = meetups.map((a) =>
      setMeeting((prevState) => ({
        ...prevState,
        title: a.title,
        description: a.description,
        image: a.image,
        address: a.address,
        date: a.date,
        time: a.time,
        user: a.user,
      }))
    );
    console.log(meetingItem);
  }

  const mystyle = {
    background: `linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ),
    url(${meetingItem.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

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
        <div style={mystyle} className={classes.wrapperImageMeeting}>
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
                  meetingItem.user.photo
                    ? meetingItem.user.photo
                    : "https://www.cruzyortiz.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                }
              />
            </div>
            <div className={classes.wrapperNameUser}>
              <p className={classes.firstnameuser}>{meetingItem.user.name}</p>
              <p>{meetingItem.user.lastName}</p>
            </div>
          </div>
        </div>
        <div>
          <p>Contact details:</p>
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

export default ItemMeeting;
