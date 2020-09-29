import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import LazyLoad from "react-lazyload";

class UserTournaments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      OnlineTournaments: [],
      OfflineTournaments: [],
      toggle: false,
      toggle_id: ""
    };
  }

  componentDidMount = () => {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/participate-tournament/upcoming-online-tournaments",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          OnlineTournaments: res.data
        });
      }
      console.log(res.data);
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/participate-tournament/upcoming-offline-tournaments",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          OfflineTournaments: res.data
        });
      }
      console.log(res.data);
    });
  };

  toggle = id => {
    this.setState({
      toggle: !this.state.toggle,
      toggle_id: id
    });
  };

  participate = (id, entry_fee) => {
    console.log(id);
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/participate-tournament/delete",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        tournament_id: id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        requestOptions = {
          method: "POST",
          url: "http://localhost:5000/api/auth/refund-balance",
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json"
          },
          data: {
            amount: entry_fee
          }
        };

        axios(requestOptions).then(data => {
          if (data.status === 200) {
            let obj = this.state.userDetails;
            obj.account_balance += (entry_fee * 80) / 100;
            localStorage.setItem("user-details", JSON.stringify(obj));
            alert("You have successfully cancelled your participation");
            location.reload();
          } else {
            alert("Something went wrong");
          }
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container style={{ backgroundColor: "black", marginBottom: "200px" }} className="p-4 mt-5">
          <Container>
            <h1>
              <strong>Upcoming Online Tournaments</strong>
            </h1>
            {this.state.OnlineTournaments.length > 0 ? (
              <div>
                {this.state.OnlineTournaments.map(tournament => (
                  <Container className="mb-4">
                    <h2 className="mt-3">
                      <strong>
                        <Link to={`/single-online-tournament/${tournament._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                          {tournament.title}
                        </Link>
                      </strong>
                    </h2>
                    {tournament.image ? <img src={require(`../../public/${tournament.image}`)} height="auto" width="500px" /> : ""}
                    <p className="mt-2">
                      {tournament.description.substring(0, 500)}... <Link>read more</Link>
                    </p>
                    <p>
                      <strong>Entry Fee: </strong>
                      Rs. {tournament.entry_fee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <p>
                      <strong>No of Slots: </strong>
                      {tournament.no_of_slots.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <p>
                      <strong>Available Slots: </strong>
                      {tournament.no_of_slots_available.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <Button onClick={() => this.toggle(tournament._id)} color="dark">
                      Remove participation
                    </Button>
                    {this.state.toggle === true && this.state.toggle_id === tournament._id ? (
                      <div className="mt-3">
                        <p>By continuing, you'll be layed off by the tournament, and 80% of the entry fee will be returned to your account</p>
                        <Button onClick={() => this.participate(tournament._id, tournament.entry_fee)} className="mr-3 mt-2" color="dark">
                          Continue
                        </Button>
                        <Button onClick={this.toggle} className="mt-2" color="dark">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </Container>
                ))}
              </div>
            ) : (
              <p>
                <strong>No upcoming online tournaments available</strong>
              </p>
            )}
          </Container>
          <div className="border-top mt-5 mb-5"></div>
          <Container>
            <h1>
              <strong>Upcoming Offline Tournaments</strong>
            </h1>
            {this.state.OfflineTournaments.length > 0 ? (
              <div>
                {this.state.OfflineTournaments.map(tournament => (
                  <Container className="mb-4">
                    <h2 className="mt-3">
                      <strong>
                        <Link to={`/single-offline-tournament/${tournament._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                          {tournament.title}
                        </Link>
                      </strong>
                    </h2>
                    {tournament.image ? <img src={require(`../../public/${tournament.image}`)} height="auto" width="500px" /> : ""}
                    <p className="mt-2">
                      {tournament.description.substring(0, 500)}... <Link>read more</Link>
                    </p>
                    <p>
                      <strong>Entry Fee: </strong>
                      Rs. {tournament.entry_fee.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <p>
                      <strong>No of Slots: </strong>
                      {tournament.no_of_slots.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <p>
                      <strong>Available Slots: </strong>
                      {tournament.no_of_slots_available.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <Button onClick={() => this.toggle(tournament._id)} color="dark">
                      Remove participation
                    </Button>
                    {this.state.toggle === true && this.state.toggle_id === tournament._id ? (
                      <div className="mt-3">
                        <p>By continuing, you'll be layed off by the tournament, and 80% of the entry fee will be returned to your account</p>
                        <Button onClick={() => this.participate(tournament._id, tournament.entry_fee)} className="mr-3 mt-2" color="dark">
                          Continue
                        </Button>
                        <Button onClick={this.toggle} className="mt-2" color="dark">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </Container>
                ))}
              </div>
            ) : (
              <p>
                <strong>No upcoming offline tournaments available</strong>
              </p>
            )}
          </Container>
        </Container>
      </div>
    );
  }
}

export default UserTournaments;
