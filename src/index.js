import React, {useState,useEffect} from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { HomePage, Nav } from "./components";



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

  return(
    <Router>

    <Nav user={user} setUser={setUser}/>
  <HomePage/>
    </Router>
  

 
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
