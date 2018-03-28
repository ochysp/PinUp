// @flow

import React from "react";
import { Redirect } from "react-router-dom";

import { signup } from "../api";

export default class Signup extends React.Component<{}, *> {
  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    redirectToReferrer: false
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value });
    }
  };

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const {login, firstname, lastname, password} = this.state;
    signup(login, firstname, lastname, password)
      .then(result => {
        console.log("Signup result ", result);
        this.setState({redirectToReferrer: true, error: null});
      })
      .catch(error => this.setState({error}));
  };

  render() {
    const { redirectToReferrer, error, firstname, lastname, login, password} = this.state;
    const canRegister = login.length >= 3 && password.length >= 3;

    if (redirectToReferrer) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h1>Bank of Rapperswil</h1>
        <form className="ui form">
          <h2>Registrieren</h2>
          <label>Username</label>
          <input
            onChange={this.handleLoginChanged}
            placeholder="Login"
            value={login}
          />
          <div>{login.length < 3 && <p>Muss mind. 3 Buchstaben haben</p>}</div>

          <label>Vorname</label>
          <input
            onChange={this.handleFirstNameChanged}
            placeholder="Vorname"
            value={firstname}
          />

          <label>Nachname</label>
          <input
            onChange={this.handleLastNameChanged}
            placeholder="Nachname"
            value={lastname}
          />

          <label>Passwort</label>
          <input
            id="pw"
            onChange={this.handlePasswordChanged}
            placeholder="Passwort"
            type="password"
            value={password}
          />
          <div>{password.length < 3 && <p>Muss mind. 3 Buchstaben haben</p>}</div>

          <button className="ui blue button" onClick={this.handleSubmit} disabled={!canRegister}>Account eröffnen</button>
        </form>
        {error && <p>Es ist ein Fehler aufgetreten!</p>}
      </div>
    );
  }
}