import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import Header from "../components/Header";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class CreateOnlineTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      title: "",
      description: "",
      entry_fee: "",
      no_of_slots: "",
      event_date: "",
      error_message: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeHandlerForFile = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  submitHandler = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("entry_fee", this.state.entry_fee);
    formData.append("event_date", this.state.event_date);
    formData.append("no_of_slots", this.state.no_of_slots);

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/online-tournament/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: formData
    };

    console.log(requestOptions);
    axios(requestOptions).then(res => {
      if (res.status == 200) {
        alert("Tournament has been created successfully");
        this.props.history.push("/home");
      } else if (res.status == 400) {
        this.setState({
          error_message: res.data.msg
        });
      }
    });
  };

  render() {
    const center = [37.7833, -122.4167];
    return (
      <div>
        <Header />
        <Container style={{ backgroundColor: "black", marginBottom: "200px" }} className="p-4 mt-5">
          <Link to="/home" style={{ color: "#FFF", textDecoration: "none" }}>
            <Button color="dark" className="m-3 p-2">
              {"<<"}Go Back
            </Button>
          </Link>
          <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
            <Col>
              <h2>Create New Online Tournament</h2>
            </Col>
            {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Title</Label>
                <Input type="text" size="5" name="title" id="title" placeholder="title" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" size="5" name="description" id="description" placeholder="description" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Entry Fee</Label>
                <Input type="number" name="entry_fee" id="entry_fee" placeholder="entry fee" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>No of slots</Label>
                <Input type="number" name="no_of_slots" id="no_of_slots" placeholder="no of slots" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Event Date</Label>
                <Input type="date" name="event_date" id="event_date" placeholder="event date" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Upload Picture</Label>
                <Input type="file" name="file" id="file" placeholder="profile picture" onChange={this.changeHandlerForFile} />
              </FormGroup>
            </Col>
            <Col>
              <Button type="submit" color="dark" className=" mt-3">
                Create Tournament
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateOnlineTournament;
