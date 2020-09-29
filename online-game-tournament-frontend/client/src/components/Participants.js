import React, { Component } from "react";
import axios from "axios";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Header from "./Header";

class Participants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: []
    };
  }

  componentDidMount = () => {
    const {
      match: { params }
    } = this.props;

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/participate-tournament/participants",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Conten-Type": "application/json"
      },
      data: {
        id: params.id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          participants: res.data
        });
      }
      console.log(res.data);
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Container style={{ backgroundColor: "black", marginBottom: "200px" }} className="p-4 mt-5">
          <h1 className="mb-4">
            <strong>Total Participants: {this.state.participants.length}</strong>
          </h1>
          {this.state.participants.length > 0 ? (
            <div>
              {this.state.participants.map(participant => (
                <Container className="mb-3">
                  {participant.image ? <img src={require(`../../public/${participant.image}`)} height="150px" width="auto" /> : ""}
                  <h2 className="mt-2">
                    <strong>{participant.name}</strong>
                  </h2>
                  <Button color="danger">Remove</Button>
                  <div className="border-top mt-5 mb-5"></div>
                </Container>
              ))}
            </div>
          ) : (
            <p>No participants</p>
          )}
        </Container>
      </div>
    );
  }
}

export default Participants;
