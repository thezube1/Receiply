import React, { Component } from "react";
import axios from "axios";

class DashHeader extends Component {
  state = {
    name: "Zubin",
  };

  abortController = new AbortController();
  componentDidMount() {
    axios
      .get("/api/getname", { signal: this.abortController.signal })
      .then((response) => {
        this.setState({ name: response.data.FIRST_NAME });
      });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }
  render() {
    return (
      <React.Fragment>
        <div id="welcomeText" className="headerText">
          Welcome back, {this.state.name}
        </div>
        <div id="subwelcomeText" className="headerText">
          Here are things you
          <br /> might be interested in:
        </div>
        <div id="headerBar"></div>
      </React.Fragment>
    );
  }
}

export default DashHeader;
