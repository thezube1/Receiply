import React, { Component } from "react";
import UserRecipeCard from "./UserRecipeCard";

class UserRecipes extends Component {
  state = {};

  renderRecipes = () => {
    if (this.props.recipes.length === 0) {
      return <div>This user has no public recipes</div>;
    } else {
      return this.props.recipes.map((item) => {
        return (
          <UserRecipeCard
            title={item.RECIPE_NAME}
            description={item.DESCRIPTION}
            image={item.PHOTO_NAME}
          />
        );
      });
    }
  };

  render() {
    return <div id="userRecipeContent">{this.renderRecipes()}</div>;
  }
}

export default UserRecipes;
