import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import MeetupList from "../components/meetups/MeetupList";
import { useHistory } from "react-router";

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  let content;
  const history = useHistory();

  function changeDirectory() {
    history.replace("/");
  }

  if (favoritesCtx.totalFavorites === 0) {
    content = (
      <div className="wrapperEmptyFav">
        <h3>You got no favorites yet. Start adding some?</h3>
        <button onClick={changeDirectory} className="backBtn">
          &#10229; Come back
        </button>
      </div>
    );
  } else {
    content = <MeetupList meetups={favoritesCtx.favorites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
