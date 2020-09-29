import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import LoadingPage from "../Loading";
import NotFoundPage from "./404page";
import EditForm from "../components/edit/EditForm";
import "../components/edit/edit.css";

class EditPage extends Component {
  state = {
    auth: undefined,
    recipe: undefined,
  };

  convertURL = () => {
    const recipeName = this.state.recipe.recipe.RECIPE_NAME;
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
    document.body.style.backgroundColor = "rgb(136, 228, 138)";
    Promise.all([
      axios
        .get(
          `/api/recipe/${this.props.match.params.recipeid}/edit/authenticate`
        )
        .then((response) => this.setState({ auth: response.data }))
        .catch((err) => console.log(err)),
      axios
        .get(`/api/recipe/${this.props.match.params.recipeid}`)
        .then((response) => this.setState({ recipe: response.data }))
        .catch((err) => console.log(err)),
    ]);
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = "white";
  }

  render() {
    if (this.state.auth === undefined || this.state.recipe === undefined) {
      return <LoadingPage />;
    } else if (this.state.auth === false) {
      return <NotFoundPage />;
    } else {
      return <EditForm recipe={this.props.match.params.recipeid} />;
    }
  }
}

export default EditPage;
