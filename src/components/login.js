import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Modal, Header, Menu } from "semantic-ui-react";

const Login = (props) => {
  const { user, setUser } = props;
  const [state, setState] = useState({});

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value });
  };

  async function handleRegister(event) {
    event.preventDefault();

    axios.post("api/users/register", state).then((res) => {
      const userData = res.data;
      localStorage.setItem("token", userData.token);
      setState({});
      return setUser(userData.user);
    });
  }

  async function handleLogin(event) {
    event.preventDefault();

    axios.post("api/users/login", state).then((res) => {
      const userData = res.data;
      localStorage.setItem("token", userData.token);
      setState({});
      setUser(userData.user);
    });
  }

  async function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    setUser({});
  }

  if (user.id) {
    return (
      <Menu.Item position="right">
        <Button content="Logout" onClick={handleLogout} />
      </Menu.Item>
    );
  } else {
    return (
      <Menu.Item position="right">
        <Modal
          dimmer="blurring"
          trigger={<Button>Register</Button>}
          basic
          size="small"
        >
          <Header content="Signup for an account" />
          <Modal.Content>
            <Form onSubmit={handleRegister}>
              <Form.Input
                label="Full Name"
                placeholder="Full Name"
                name="name"
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Username"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />
              <Form.Input
                type="password"
                label="Password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
              <Form.Button content="Submit" />
            </Form>
          </Modal.Content>
        </Modal>
        <Modal
          dimmer="blurring"
          trigger={<Button>Login</Button>}
          basic
          size="small"
        >
          <Header content="Log in" />
          <Modal.Content>
            <Form onSubmit={handleLogin}>
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />
              <Form.Input
                type="password"
                label="Password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
              <Form.Button content="Submit" onClick={close} />
            </Form>
          </Modal.Content>
        </Modal>
      </Menu.Item>
    );
  }
};

export default Login;