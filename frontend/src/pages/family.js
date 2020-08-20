import React, { Component } from "react";
import axios from "axios";

import CreateFamilyPage from "./createfamily";
import FamilyNav from "../components/family/FamilyNav";
import FamilyMain from "../components/family/familyMain";

import LoadingPage from "../Loading";
import "../components/family/family.css";

class FamilyPage extends Component {
  state = {
    family: undefined,
  };
  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  componentDidMount() {
    axios
      .get("/api/getfamily", { cancelToken: this.source.token })
      .then((result) => this.setState({ family: result.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  render() {
    if (this.state.family === undefined) {
      return <LoadingPage />;
    } else if (this.state.family === false) {
      return <CreateFamilyPage />;
    } else {
      return (
        <React.Fragment>
          <React.Fragment>
            <div id="familyWrapper">
              <div>
                <FamilyNav />
              </div>
              <div>
                <FamilyMain />
              </div>
            </div>
          </React.Fragment>
        </React.Fragment>
      );
    }
  }
}

export default FamilyPage;
