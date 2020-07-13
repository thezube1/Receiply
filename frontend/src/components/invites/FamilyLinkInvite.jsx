import React, { Component } from "react";
import axios from "axios";

class FamilyLinkInvite extends Component {
  state = {
    family: "",
  };
  componentDidMount() {
    //axios.get(`/api/invite/${params.familyID}`);
  }
  render() {
    return <div>Welcome to the family!</div>;
  }
}

export default FamilyLinkInvite;
