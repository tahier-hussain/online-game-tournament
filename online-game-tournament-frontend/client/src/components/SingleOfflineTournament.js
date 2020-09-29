import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

class SingleOfflineTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      tournament: {},
      toggle: false
    };
  }

  componentDidMount = () => {
    const {
      match: { params }
    } = this.props;

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/offline-tournament/get-one",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id: params.id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        res.data.entry_fee.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        res.data.no_of_slots.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        res.data.no_of_slots_available.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.setState({
          tournament: res.data
        });
      }
    });
  };

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  participate = event => {
    event.preventDefault();
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/participate-tournament/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        tournament_id: this.state.tournament._id,
        tournament_type: "online"
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        console.log(res.data);
        if (res.data.msg) {
          console.log(res.data.msg);
          alert("Already Participated");
        } else {
          requestOptions = {
            method: "POST",
            url: "http://localhost:5000/api/auth/reduce-balance",
            headers: {
              "x-auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json"
            },
            data: {
              amount: this.state.tournament.entry_fee
            }
          };

          axios(requestOptions).then(data => {
            if (data.status === 200) {
              let obj = this.state.userDetails;
              obj.account_balance -= this.state.tournament.entry_fee;
              localStorage.setItem("user-details", JSON.stringify(obj));
              alert("You have successfully participated in the event");
              location.reload();
            } else {
              alert("Something went wrong");
            }
          });
        }
      }
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container style={{ backgroundColor: "black", marginBottom: "200px" }} className="p-4 mt-5">
          <h1 className="mt-3">
            <strong>{this.state.tournament.title}</strong>
          </h1>
          {this.state.tournament.image ? <img src={require(`../../public/${this.state.tournament.image}`)} height="auto" width="700px" /> : ""}
          <p className="mt-2">{this.state.tournament.description}</p>
          <p>
            <strong>Entry Fee: </strong>
            Rs. {this.state.tournament.entry_fee}
          </p>
          <p>
            <strong>No of Slots: </strong>
            {this.state.tournament.no_of_slots}
          </p>
          <p>
            <strong>Available Slots: </strong>
            {this.state.tournament.no_of_slots_available}
          </p>
          <p>
            <strong>Address: </strong>
            {this.state.tournament.address}
          </p>
          {this.state.tournament.no_of_slots_available > 0 && this.state.userDetails.type === "user" ? (
            <div>
              <Button onClick={this.toggle} color="dark">
                Participate
              </Button>
              {this.state.toggle === true ? (
                <div className="mt-3">
                  <p>
                    <strong>Once you participate, the entry fee will be deducted from your account, and you will be included in the tournament</strong>
                  </p>
                  <Button onClick={this.participate} color="dark" className="mr-3">
                    Continue
                  </Button>
                  <Button onClick={this.toggle} color="dark">
                    Cancel
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </Container>
      </div>
    );
  }
}

export default SingleOfflineTournament;
