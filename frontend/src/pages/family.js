import React, { Component } from "react";
import axios from "axios";

import CreateFamilyPage from "./createfamily";
import FamilyNav from "../components/family/FamilyNav";

class FamilyPage extends Component {
  state = {
    family: "",
  };

  componentDidMount() {
    axios
      .get("/api/getfamily")
      .then((result) => this.setState({ family: result.data }));
  }

  render() {
    if (this.state.family === false) {
      return <CreateFamilyPage />;
    }
    return (
      <div>
        <FamilyNav />
      </div>
    );
  }
}

export default FamilyPage;
