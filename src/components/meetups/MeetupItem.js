import { useContext } from "react";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { Link } from "react-router-dom";
import favoritesContext from "../../store/favorites-context";

function MeetupItem(props) {

  const favoritesCtx = useContext(favoritesContext);
  const itemIsFavorites = favoritesCtx.itemIsFavorite(props.id);
  function toggleFavoriteStatusHandler() {
    if (itemIsFavorites) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <Link
          to={`/${props.id}`}
        >
          <div className={classes.image}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={classes.content}>
            <h3>{props.title}</h3>
            <address>{props.address}</address>
            <p>{props.description}</p>
          </div>
        </Link>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorites ? "Remove from favorites" : "Add to Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
