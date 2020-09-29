import React, { Component } from "react";

class RecipeCooking extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="recipeHeader" id="recipeCookingHeader">
          Cooking instructions
        </div>
        <ol id="recipeCookingItemsWrapper">
          {this.props.cooking.map((item, index) => {
            return (
              <li key={index} className="recipeCookingItem">
                {item.COOKING_INSTRUCTION}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default RecipeCooking;
