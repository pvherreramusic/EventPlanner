import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";

import { Login } from "./index";

const Nav = (props) => {
  const { user, setUser } = props;
  const history = useHistory();
  return (
    <Menu inverted>
      <Container>
        <Menu.Item as="a" header>
          <Image
            size="small"
            src="data:image/jpeg;base64,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"
            style={{ marginRight: "1.5em" }}
          />
          EVENT PLANNER
        </Menu.Item>
        <Menu.Item as="a" onClick={() => history.push("/")}>
          Home
        </Menu.Item>

        <Dropdown item simple text="MENU">
          <Dropdown.Menu>
            {[
              { text: "Create New Group", route: "/createnewgroup" },
              { text: "Explore Groups", route: "/exploregroups" },
              { text: "New Event Form", route: "/neweventform" },
              { text: "Group's Event", route: "/groupevent" },
            ].map(({ text, route }) => (
              <Dropdown.Item
                key={text}
                onClick={() => history.push(`${route}`)}
              >
                {text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Login user={user} setUser={setUser} />
      </Container>
    </Menu>
  );
};

export default Nav;
