import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DashFamilyItem from "./DashFamilyItem";

class DashFamily extends Component {
  state = {
    family: undefined,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  componentDidMount() {
    axios
      .get("/api/getfamily", { cancelToken: this.source.token })
      .then((result) => {
        this.setState({ family: result.data });
      });
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  render() {
    const checkFamily = () => {
      if (this.state.family === false) {
        return (
          <div className="dashRecipeContent">
            <div>You're not apart of a family!</div>
            <Link to="/dashboard/family" style={{ textDecoration: "none" }}>
              <span className="dashRecipeCreate">Join family</span>
            </Link>
          </div>
        );
      } else {
        return (
          <div>
            <div id="dashFamilyName">{this.state.family}</div>
            <div id="dashFamilyContent">
              <DashFamilyItem title="Stuff" />
              <DashFamilyItem />
              <DashFamilyItem />
            </div>
          </div>
        );
      }
    };
    return (
      <div className="dashOutlineWrapper">
        <div className="dashOutlineHeader">Family</div>
        {checkFamily()}
      </div>
    );
  }
}

export default DashFamily;
