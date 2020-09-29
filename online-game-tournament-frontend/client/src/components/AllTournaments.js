import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import LazyLoad from "react-lazyload";

let redirectLink;
const Loading = () => <h4>Loading...</h4>;
class AllTournaments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournament: []
    };
  }

  componentDidMount = () => {
    const {
      match: { params }
    } = this.props;

    let url;
    if (params.type === "upcoming-online") {
      url = "http://localhost:5000/api/online-tournament/get-upcoming-tournaments";
      redirectLink = "/single-online-tournament";
    } else if (params.type === "upcoming-offline") {
      url = "http://localhost:5000/api/offline-tournament/get-upcoming-tournaments";
      redirectLink = "/single-offline-tournament";
    } else if (params.type === "past-online") {
      url = "http://localhost:5000/api/online-tournament/get-past-tournaments";
    } else {
      url = "http://localhost:5000/api/offline-tournament/get-past-tournaments";
    }

    let requestOptions = {
      method: "GET",
      url
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          tournament: res.data
        });
      }
      console.log(this.state.tournament);
    });
  };
  render() {
    return (
      <div>
        {" "}
        <Header />
        <Container style={{ backgroundColor: "black" }} className="p-3 mt-5 mb-5">
          {this.state.tournament.length > 0 ? (
            <div>
              {this.state.tournament.map((tournament, index) => (
                <LazyLoad placeholder={<Loading />}>
                  <Container className="mb-4">
                    {index > 0 ? <div className="border-top mt-5 mb-5"></div> : ""}
                    <h2 className="mt-3">
                      <strong>
                        <Link to={`${redirectLink}/${tournament._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
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
                    <Link to={`${redirectLink}/${tournament._id}`} style={{ color: "#FFF", textDecoration: "none" }}>
                      <Button color="dark" className="mt-2 p-2">
                        View Details
                      </Button>
                    </Link>
                  </Container>
                </LazyLoad>
              ))}
            </div>
          ) : (
            <p>
              <strong>No upcoming online tournaments available</strong>
            </p>
          )}
        </Container>
      </div>
    );
  }
}

export default AllTournaments;
