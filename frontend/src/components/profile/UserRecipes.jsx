import React, { Component } from "react";
import SearchItem from "../search/SearchItem";
import { Link } from "react-router-dom";

class UserRecipes extends Component {
  state = {};

  renderRecipes = () => {
    if (this.props.recipes.length === 0) {
      return <div>This user has no public recipes</div>;
    } else {
      return this.props.recipes.map((item) => {
        return (
          <Link
            key={item.RECIPE_ID}
            to={`/recipe/${item.RECIPE_IDENTIFIER}`}
            className="recipeCardLink"
          >
            <SearchItem
              title={item.RECIPE_NAME}
              image={item.PHOTO_NAME}
              description={item.DESCRIPTION}
              likes={item.LIKES}
            />
          </Link>
        );
      });
    }
  };

  render() {
    return <div id="userRecipeContent">{this.renderRecipes()}</div>;
  }
}

export default UserRecipes;
