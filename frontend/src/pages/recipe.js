import React, { Component } from "react";
import axios from "axios";

class RecipePage extends Component {
  state = {};
  componentDidMount() {
    axios.get(`/api/recipe/${this.props.match.params.recipeid}`);
  }
  render() {
    return (
      <React.Fragment>
        <div>{this.props.match.params.recipeid}</div>
        <div>{this.props.match.params.recipe}</div>
      </React.Fragment>
    );
  }
}

export default RecipePage;
