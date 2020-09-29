import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      error_message: "",
      password_message: "Enter atleast 8 characters",
      password_alert: "primary"
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (this.state.password.length >= 8) {
      this.setState({
        password_message: "Strength: Strong",
        password_alert: "success"
      });
    } else if (this.state.password.length < 5) {
      this.setState({
        password_message: "Strength: Weak",
        password_alert: "danger"
      });
    } else {
      this.setState({
        password_message: "Strength: Medium",
        password_alert: "warning"
      });
    }
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
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("confirm_password", this.state.confirm_password);

    const requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/register",
      header: {
        "Content-Type": "application/json"
      },
      data: formData
    };

    axios(requestOptions).then(res => {
      if (res.data.status == 200) {
        alert("Your profile has been created successfully");
        this.props.history.push("/");
      } else if (res.data.status == 400) {
        console.log("HELLO");
        this.setState({
          error_message: res.data.msg
        });
      }
    });
  };

  toggle = () => {
    this.setState({
      vendorSignUp: !this.state.vendorSignUp
    });
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div>
        <Header />
        <Container style={{ backgroundColor: "black" }} className="p-3 mt-5 mb-5">
          <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
            <Col>
              <h2>SignUp</h2>
            </Col>
            {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Full Name</Label>
                <Input type="text" name="name" id="name" placeholder="name" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="myemail@email.com" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="********" onChange={this.changeHandler} />
                <Alert className="mt-2" color={this.state.password_alert}>
                  {this.state.password_message}
                </Alert>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input type="password" name="confirm_password" id="confirm_password" placeholder="********" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col className="mb-5 mt-3">
              <FormGroup>
                <Label>Upload Profile Picture (Optional)</Label>
                <Input type="file" name="file" id="file" placeholder="profile picture" onChange={this.changeHandlerForFile} />
              </FormGroup>
            </Col>
            <Col>
              <Button type="submit" color="dark">
                Register
              </Button>
            </Col>
            <Col>
              Already have an account?
              <Button color="link">
                <Link to="/">Login</Link>
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
