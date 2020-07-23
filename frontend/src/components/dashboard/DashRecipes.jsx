import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashRecipes extends Component {
  state = {
    recipes: 0,
  };

  render() {
    const checkRecipe = () => {
      if (this.state.recipes === 0) {
        return (
          <div className="dashRecipeContent">
            <div>You don't have any recipes!</div>
            <Link to="/dashboard/upload" style={{ textDecoration: "none" }}>
              <span className="dashRecipeCreate">Create recipe</span>
            </Link>
          </div>
        );
      } else {
        return <div>Multiple recipes</div>;
      }
    };
    return (
      <div className="dashOutlineWrapper">
        <div className="dashOutlineHeader">My Recipes</div>
        {checkRecipe()}
      </div>
    );
  }
}

export default DashRecipes;
