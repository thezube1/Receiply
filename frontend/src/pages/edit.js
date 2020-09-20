import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import LoadingPage from "../Loading";
import NotFoundPage from "./404page";
import Upload from "../components/upload/uploadManual/uploadManual";
class EditPage extends Component {
  state = {
    auth: undefined,
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
      .get(`/api/recipe/${this.props.match.params.recipeid}/edit/authenticate`)
      .then((response) => this.setState({ auth: response.data }))
      .catch((err) => console.log(err));
    axios
      .get(`/api/recipe/${this.props.match.params.recipeid}`)
      .then((response) => this.setState({ recipe: response.data }))
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state.auth, this.state.recipe);
    if (this.state.auth === undefined || this.state.recipe === undefined) {
      return <LoadingPage />;
    } else if (this.state.auth === false) {
      return <NotFoundPage />;
    } else {
      return <Upload />;
    }
  }
}

export default EditPage;
