import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Loading from "../Loading";
import NotFoundPage from "./404page";

class RecipePage extends Component {
  state = {
    recipe: undefined,
  };

  convertURL = () => {
    const recipeName = this.state.recipe[0].RECIPE_NAME;
    const newURL = recipeName.toLowerCase().replace(" ", "-");
    return newURL;
  };

  checkURL = () => {
    if (this.props.match.params.recipe !== this.convertURL()) {
      return (
        <Redirect
          to={`/${this.convertURL()}/${this.props.match.params.recipeid}`}
        />
      );
    }
  };

  componentDidMount() {
    axios
      .get(`/api/recipe/${this.props.match.params.recipeid}`)
      .then((response) => this.setState({ recipe: response.data }))
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    this.checkURL();
  }

  render() {
    if (this.state.recipe === undefined) {
      return <Loading />;
    } else if (this.state.recipe === false) {
      return <NotFoundPage />;
    } else {
      console.log(JSON.parse(this.state.recipe[0].TAGS));

      return (
        <React.Fragment>
          {this.checkURL()}
          <div>{this.props.match.params.recipeid}</div>
          <div>{this.props.match.params.recipe}</div>
        </React.Fragment>
      );
    }
  }
}

export default RecipePage;
