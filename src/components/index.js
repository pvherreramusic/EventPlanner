import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { HomePage, Nav, FormForNewEvent, CreateGroup, MainPage, GroupPage} from ".";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const bearer = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.post("api/users/login/token", {}, bearer).then((res) => {
        const userData = res.data;
        return setUser(userData);
      });
    }
  }, []);

  return (
    <Router>
      <Nav user={user} setUser={setUser} />
      
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/groupevent" exact render={() => <MainPage userid={user.id} />}/>
        <Route path= "/neweventform" exact render={() => <FormForNewEvent userid={user.id} />  }/>
        <Route path= "/createnewgroup" exact component={CreateGroup}/>


         


      
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
