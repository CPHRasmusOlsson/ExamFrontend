import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./screens/LoginScreen";
import { Switch, Route, useHistory } from "react-router-dom";
import Nav from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./screens/HomeScreen";
import Facade from "./facades/apiFacade";
import AdminScreen from "./screens/AdminScreen";
import DemoScreen from "./screens/DemoScreen";
import TripScreen from "./screens/TripScreen";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(Facade.loggedIn());
  const [user, setUser] = useState();
  let history = useHistory();

  const changeLoginStatus = (pageToGo) => {
    setLoggedIn(!loggedIn);
    history.push(pageToGo);
  };

  useEffect(() => {
    setUser(Facade.getUser);
    console.log(user);
  }, [loggedIn, history]);

  return (
    <div className="App">
      <Nav
        loggedIn={loggedIn}
        user={user}
        changeLoginStatus={changeLoginStatus}
      />

      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <PrivateRoute path="/demo" loggedIn={loggedIn} component={DemoScreen} />
        <PrivateRoute
          path="/protected"
          loggedIn={loggedIn}
          user={user}
          component={TripScreen}
        />
        <PrivateRoute
          path="/admin"
          loggedIn={loggedIn}
          user={user}
          component={AdminScreen}
        />
        <Route path="/login">
          <Login changeLoginStatus={changeLoginStatus} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
