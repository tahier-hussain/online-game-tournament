import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class HomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      upComingOnlineTournaments: [],
      upComingOfflineTournaments: [],
      pastOnlineTournaments: [],
      pastOfflineTournaments: []
    };
  }

  componentDidMount = () => {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/offline-tournament/get-upcoming-two-tournaments"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          upComingOfflineTournaments: res.data
        });
      }
      console.log(res.data);
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/online-tournament/get-upcoming-two-tournaments"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          upComingOnlineTournaments: res.data
        });
      }
      console.log(res.data);
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/offline-tournament/get-past-two-tournaments"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          pastOfflineTournaments: res.data
        });
      }
      console.log(res.data);
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/online-tournament/get-past-two-tournaments"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          pastOnlineTournaments: res.data
        });
      }
      console.log(res.data);
    });
  };
  render() {
    return (
      <div>
        <Container style={{ backgroundColor: "black", marginBottom: "200px" }} className="p-4 mt-5">
          {this.state.userDetails.image ? <img src={require(`../../public/${this.state.userDetails.image}`)} height="300px" width="auto" /> : ""}
          <h1 className="mt-3">
            <strong>{this.state.userDetails.name}</strong>
          </h1>
          <p>
            Email: <strong>{this.state.userDetails.email}</strong>
          </p>
          <p>
            Account Balance: <strong>{this.state.userDetails.account_balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
          </p>
          <Link to="/user-tournaments" style={{ color: "#FFF", textDecoration: "none" }}>
            <Button color="dark" className="mr-3 p-3">
              Your Tournaments
            </Button>
          </Link>
          <Button color="dark" className="p-3">
            Your Past Tournaments
          </Button>
          <div className="border-top mt-5 mb-5"></div>
          <Container>
            <h1>
              <strong>Upcoming Online Tournaments</strong>
            </h1>
            {this.state.upComingOnlineTournaments.length > 0 ? (
              <div>
                {this.state.upComingOnlineTournaments.map(tournament => (
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
                  </Container>
                ))}
                <Link to="/all-tournaments/upcoming-online" style={{ color: "#FFF", textDecoration: "none" }}>
                  <Button color="dark">See All</Button>
                </Link>
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
            {this.state.upComingOfflineTournaments.length > 0 ? (
              <div>
                {this.state.upComingOfflineTournaments.map(tournament => (
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
                  </Container>
                ))}
                <Link to="/all-tournaments/upcoming-offline" style={{ color: "#FFF", textDecoration: "none" }}>
                  <Button color="dark">See All</Button>
                </Link>{" "}
              </div>
            ) : (
              <p>
                <strong>No upcoming offline tournaments available</strong>
              </p>
            )}
          </Container>
          <div className="border-top mt-5 mb-5"></div>
          <Container>
            <h1>
              <strong>Past Online Tournaments</strong>
            </h1>
            {this.state.pastOnlineTournaments.length > 0 ? (
              <div>
                {this.state.pastOnlineTournaments.map(tournament => (
                  <Container className="mb-4">
                    <h2 className="mt-3">
                      <strong>{tournament.title}</strong>
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
                  </Container>
                ))}
                <Link to="/all-tournaments/past-online" style={{ color: "#FFF", textDecoration: "none" }}>
                  <Button color="dark">See All</Button>
                </Link>{" "}
              </div>
            ) : (
              <p>
                <strong>No past online tournaments available</strong>
              </p>
            )}
          </Container>
          <div className="border-top mt-5 mb-5"></div>
          <Container>
            <h1>
              <strong>Past Offline Tournaments</strong>
            </h1>
            {this.state.pastOfflineTournaments.length > 0 ? (
              <div>
                {this.state.pastOfflineTournaments.map(tournament => (
                  <Container className="mb-4">
                    <h2 className="mt-3">
                      <strong>{tournament.title}</strong>
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
                  </Container>
                ))}
                <Link to="/all-tournaments/past-offline" style={{ color: "#FFF", textDecoration: "none" }}>
                  <Button color="dark">See All</Button>
                </Link>{" "}
              </div>
            ) : (
              <p>
                <strong>No past offline tournaments available</strong>
              </p>
            )}
          </Container>
        </Container>
      </div>
    );
  }
}

export default HomeUser;
