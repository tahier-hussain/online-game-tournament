import React, { Component } from "react";
import Header from "./Header";
import HomeUser from "./HomeUser";
import HomeAdmin from "./HomeAdmin";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details"))
    };
  }

  componentDidMount = () => {
    if (!this.state.userDetails) {
      this.props.history.push("/");
    }
  };
  render() {
    return (
      <div>
        <Header />
        {this.state.userDetails.type === "user" ? <HomeUser /> : <HomeAdmin />}
      </div>
    );
  }
}

export default Home;
