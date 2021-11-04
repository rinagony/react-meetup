import { Route, Switch } from 'react-router-dom';
import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import ItemMeeting from "./pages/ItemMeeting";
import Layout from "./components/layout/Layout";
import GoingPage from "./pages/Imgoing";
import { useEffect } from "react";
import MyAccount from "./pages/MyAccount";
import useToken from "./useToken";
import Login from "./components/layout/Login";
import People from './pages/People';

function App() {
  const { token, setToken } = useToken();
  // function tokenCondition(tokenItem) {
  //   if (!tokenItem) {
  //     return <Login setToken={setToken} />;
  //   }
  //   console.log(tokenItem)
  // }
  useEffect(() => {
    console.log(token)
    
  });
  console.log(token)
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Layout >
      <Switch>
        <Route path="/" exact>
          <AllMeetupsPage />
        </Route>

        <Route path="/new-meetup">
          <NewMeetupPage />
        </Route>

        <Route path="/favorites">
          <FavoritesPage />
        </Route>

        <Route path="/going">
          <GoingPage />
        </Route>

        <Route path="/myaccount">
          <MyAccount />
        </Route>

        
        <Route path="/people">
          <People />
        </Route>

        <Route path="/:id">
          <ItemMeeting />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
