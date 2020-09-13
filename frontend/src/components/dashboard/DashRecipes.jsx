import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DashRecipeItem from "./DashRecipeItem";

class DashRecipes extends Component {
  state = {
    recipes: false,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  checkRecipe = () => {
    if (this.state.recipes === false) {
      return (
        <div className="dashRecipeContent">
          <div>You don't have any recipes!</div>
          <Link to="/upload" style={{ textDecoration: "none" }}>
            <span className="dashRecipeCreate">Create recipe</span>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="dashPopItemWrapper">
          {this.state.recipes.slice(0, 3).map((item) => {
            return (
              <Link
                to={`/recipe/${item.RECIPE_IDENTIFIER}`}
                key={item.RECIPE_ID}
                style={{ color: "black" }}
              >
                <DashRecipeItem
                  title={item.RECIPE_NAME}
                  description={item.DESCRIPTION}
                  image={item.PHOTO_NAME}
                />
              </Link>
            );
          })}
        </div>
      );
    }
  };

  componentDidMount() {
    axios
      .get("/api/recipes/user", { cancelToken: this.source.token })
      .then((response) => this.setState({ recipes: response.data }))
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    return (
      <div className="dashOutlineWrapper">
        <div className="dashOutlineHeader">My Recipes</div>
        {this.checkRecipe()}
      </div>
    );
  }
}

export default DashRecipes;
