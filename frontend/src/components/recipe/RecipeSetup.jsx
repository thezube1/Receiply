import React, { Component } from "react";

class RecipeSetup extends Component {
  state = {
    prep: this.props.prep,
    ingredients: this.props.ingredients,
  };
  render() {
    return (
      <div>
        <div id="recipeInfoPreps">
          <div id="recipePrep">
            <div className="recipeHeader">Prep instructions</div>
            <ol id="recipePrepItemWrapper">
              {this.state.prep.map((item, index) => {
                return (
                  <li className="recipePrepItem" key={index}>
                    {item.PREP}
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <div className="recipeHeader">Ingredients</div>
            <ul id="recipeIngredientsItemWrapper">
              {this.state.ingredients.map((item, index) => {
                return (
                  <li className="recipePrepItem" key={index}>
                    {item.INGREDIENT}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeSetup;
