import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "../components/recipe/recipe.css";

import { Modal } from "react-bootstrap";
import NavbarSwitch from "../components/navbar/navbarswitch";
import Loading from "../Loading";
import NotFoundPage from "./404page";

import RecipeInfo from "../components/recipe/RecipeInfo";
import RecipePhoto from "../components/recipe/RecipePhoto";
import RecipeCooking from "../components/recipe/RecipeCooking";
import RecipeComments from "../components/recipe/RecipeComments";
import { Button } from "react-bootstrap";

class RecipePage extends Component {
  state = {
    recipe: undefined,
    isUsers: undefined,
    modal: false,
    check: undefined,
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

  canEdit = () => {
    if (this.state.isUsers === true) {
      return (
        <div id="recipeUserWrapper">
          <span id="recipeUserCheck">This is your recipe</span>
          <Link to={`${window.location.pathname}/edit`} id="recipeEditButton">
            Edit
          </Link>
          <Button
            id="recipeDeleteButton"
            onClick={() => this.setState({ modal: true })}
          >
            Delete
          </Button>
        </div>
      );
    }
  };

  componentDidMount() {
    axios
      .get(`/api/recipe/${this.props.match.params.recipeid}`)
      .then((response) => this.setState({ recipe: response.data }))
      .catch((err) => console.log(err));
    axios
      .get(`/api/recipe/${this.props.match.params.recipeid}/edit/authenticate`)
      .then((response) => this.setState({ isUsers: response.data }));
  }

  render() {
    if (this.state.recipe === undefined || this.state.isUsers === undefined) {
      return <Loading />;
    } else if (this.state.recipe === false) {
      return <NotFoundPage />;
    } else {
      let prep = JSON.parse(this.state.recipe[0].PREP_INSTRUCTIONS);
      let ingredients = JSON.parse(this.state.recipe[0].INGREDIENTS);
      let cooking = JSON.parse(this.state.recipe[0].COOKING_INSTRUCTIONS);
      return (
        <React.Fragment>
          <NavbarSwitch />
          <div id="recipeWrapper">
            {this.state.check === true ? (
              <Redirect to="/" />
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <Modal
              show={this.state.modal}
              onHide={() => this.setState({ modal: false })}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontWeight: 300,
                    fontSize: 25,
                  }}
                >
                  Are you sure you want to delete?
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button
                    className="settingsItemButton"
                    onClick={() =>
                      axios
                        .delete(
                          `/api/recipe/${this.props.match.params.recipeid}`
                        )
                        .then((res) => this.setState({ check: res.data }))
                    }
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.setState({ modal: false })}
                    className="settingsItemButton"
                    style={{
                      backgroundColor: "gray",
                      border: "rgb(184, 184, 184)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Modal.Body>
            </Modal>
            {this.canEdit()}
            <div id="recipeContent">
              {this.checkURL()}
              <div id="recipePhotoWrapper">
                <RecipePhoto
                  image={this.state.recipe[0].PHOTO_NAME}
                  TTM={this.state.recipe[0].TTM}
                />
              </div>
              <div id="recipeInfoWrapper">
                <RecipeInfo
                  recipeid={this.props.match.params.recipeid}
                  title={this.state.recipe[0].RECIPE_NAME}
                  description={this.state.recipe[0].DESCRIPTION}
                  prep={prep.prep}
                  ingredients={ingredients.ingredients}
                  likes={this.state.recipe[0].LIKES}
                />
              </div>
              <div id="recipeCookingWrapper">
                <RecipeCooking cooking={cooking.cooking} />
              </div>
              <div id="recipeCommentsWrapper">
                <RecipeComments recipeid={this.props.match.params.recipeid} />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default RecipePage;
