import React, { Component } from "react";
import axios from "axios";

class RecipeInfo extends Component {
  state = {
    name: [{ FIRST_NAME: "", LAST_NAME: "" }],
  };

  componentDidMount() {
    axios
      .get(`/api/recipe/${this.props.recipeid}/creator`)
      .then((response) => this.setState({ name: response.data }));
  }

  render() {
    return (
      <React.Fragment>
        <span id="recipeTitle">{this.props.title}</span>
        <div id="recipeCreator">
          by {this.state.name[0].FIRST_NAME} {this.state.name[0].LAST_NAME}
        </div>
        <div id="recipeDescription">{this.props.description}</div>
        <div id="recipeInfoPreps">
          <div id="recipePrep">
            <div className="recipeHeader">Prep instructions</div>
            <ol id="recipePrepItemWrapper">
              {this.props.prep.map((item, index) => {
                return (
                  <li className="recipePrepItem" key={index}>
                    {item}
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <div className="recipeHeader">Ingredients</div>
            <ul id="recipeIngredientsItemWrapper">
              {this.props.ingredients.map((item, index) => {
                return (
                  <li className="recipePrepItem" key={index}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeInfo;
