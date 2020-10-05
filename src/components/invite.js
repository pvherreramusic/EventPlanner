import React, { Component } from "react";
import axios from "axios";

class SendInvite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yourname: "",
      personname: "",
      email: "",
      subject: "",
      message: "",
      group: "",
    };
  }

  onYourNameChange(event) {
    this.setState({ yourname: event.target.value });
  }
  onPersonNameChange(event) {
    this.setState({ personname: event.target.value });
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onSubjectChange(event) {
    this.setState({ subject: event.target.value });
  }
  onMsgChange(event) {
    this.setState({ message: event.target.value });
  }
  onGroupChange(event) {
    this.setState({ group: event.target.value });
  }

  submitEmail(event) {
    event.preventDefault();

    axios({
      method: "POST",
      url: "/sendemail",
      data: this.state,
    }).then((response) => {
      if (response.data.status === "success") {
        this.resetForm();
      } else if (response.data.status === "fail") {
      }
    });
  }
  resetForm() {
    this.setState({
      yourname: "",
      personname: "",
      email: "",
      subject: "",
      message: "",
      group: "",
    });
  }

  render() {
    return (
      <div>
        {" "}
        <h2> Send a invite about this group</h2>
        <form onSubmit={this.submitEmail.bind(this)} method="POST">
          <div>
            <input
              placeholder="Type in your Name"
              id="yourname"
              type="text"
              required
              value={this.state.yourname}
              onChange={this.onYourNameChange.bind(this)}
            />
          </div>
          <div>
            <input
              placeholder="Type the person's Name"
              id="personname"
              type="text"
              required
              value={this.state.personname}
              onChange={this.onPersonNameChange.bind(this)}
            />
          </div>
          <div>
            <input
              placeholder="Type their Email"
              id="email"
              type="email"
              required
              value={this.state.email}
              onChange={this.onEmailChange.bind(this)}
            />
          </div>
          <div>
            <input
              placeholder="Subject"
              id="subject"
              type="subject"
              required
              value={this.state.subject}
              onChange={this.onSubjectChange.bind(this)}
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              id="message"
              type="message"
              required
              value={this.state.message}
              onChange={this.onMsgChange.bind(this)}
            />
          </div>
          <div>
            <input
              placeholder="Type in the group name"
              id="group"
              type="group"
              required
              value={this.state.group}
              onChange={this.onGroupChange.bind(this)}
            />
          </div>
          <br></br>
          <br></br>
          <button type="submit">submit your message</button>
          <br></br>
          <br></br>

          <p>
            *Please click once on the submit button, otherwise your friends will
            get more emails than should!{" "}
          </p>
        </form>
      </div>
    );
  }
}

export default SendInvite;
