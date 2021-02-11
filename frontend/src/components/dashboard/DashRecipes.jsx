import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DashRecipeItem from "./DashRecipeItem";
import DashFamilyItem from "./DashFamilyItem";

class DashRecipes extends Component {
  state = {
    recipes: false,
    width: 0,
    height: 0,
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
                className="recipeCardLink"
              >
                {this.state.width > 900 ? (
                  <DashRecipeItem
                    title={item.RECIPE_NAME}
                    description={item.DESCRIPTION}
                    image={item.PHOTO_NAME}
                    likes={item.LIKES}
                  />
                ) : (
                  <DashFamilyItem
                    title={item.RECIPE_NAME}
                    description={item.DESCRIPTION}
                    image={item.PHOTO_NAME}
                    likes={item.LIKES}
                  />
                )}
              </Link>
            );
          })}
        </div>
      );
    }
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    axios
      .get("/api/recipes/user", { cancelToken: this.source.token })
      .then((response) => this.setState({ recipes: response.data }))
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    this.source.cancel();
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    return (
      <div className="dashOutlineWrapper" id="dashRecipeWrapper">
        <div className="dashOutlineHeader">My Recipes</div>
        {this.checkRecipe()}
        {this.state.recipes !== false ? (
          <Link to="/myrecipes" className="browseMore" id="dashFamilyView">
            View more
          </Link>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }
}

export default DashRecipes;
