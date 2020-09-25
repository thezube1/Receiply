import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DashFamilyItem from "./DashFamilyItem";

class DashFamily extends Component {
  state = {
    family: undefined,
    family_recipe: [],
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  componentDidMount() {
    Promise.all([
      axios
        .get("/api/getfamily", { cancelToken: this.source.token })
        .then((result) => {
          this.setState({ family: result.data });
        })
        .catch((err) => console.log(err)),
      axios
        .get("/api/recipes/family")
        .then((res) => this.setState({ family_recipe: res.data }))
        .catch((err) => console.log(err)),
    ]);
  }

  randomShowRange = () => {
    const recipeLength = this.state.family_recipe.length;
    if (recipeLength > 3) {
      let secondNum;
      let randomNum = Math.floor(Math.random() * Math.floor(recipeLength));

      if (randomNum === recipeLength) {
        secondNum = randomNum - 3;
      } else if (randomNum + 1 === recipeLength) {
        randomNum = randomNum - 2;
        secondNum = recipeLength;
      } else if (randomNum + 2 === recipeLength) {
        randomNum = randomNum - 1;
        secondNum = recipeLength;
      } else {
        secondNum = randomNum + 3;
      }
      console.log(randomNum, secondNum);
      return [randomNum, secondNum];
    } else {
      return [0, 3];
    }
  };

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  render() {
    const num = this.randomShowRange();
    return (
      <div className="dashOutlineWrapper" id="dashFamilyWrapper">
        <div className="dashOutlineHeader">Family</div>
        {this.state.family === false ? (
          <div className="dashRecipeContent">
            <div>You're not apart of a family!</div>
            <Link to="/family" style={{ textDecoration: "none" }}>
              <span className="dashRecipeCreate">Join family</span>
            </Link>
          </div>
        ) : (
          <div>
            <div id="dashFamilyName">{this.state.family}</div>
            <div id="dashFamilyContent">
              {this.state.family_recipe === false ? (
                <div>Your family does not have any recipes yet!</div>
              ) : (
                <div>
                  {this.state.family_recipe
                    .slice(num[0], num[1])
                    .map((item) => {
                      return (
                        <Link
                          to={`/recipe/${item.RECIPE_IDENTIFIER}`}
                          key={item.RECIPE_ID}
                          className="recipeCardLink"
                        >
                          <DashFamilyItem
                            key={item.RECIPE_ID}
                            title={item.RECIPE_NAME}
                            description={item.DESCRIPTION}
                            image={item.PHOTO_NAME}
                          />
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}
        {this.state.family_recipe !== false ? (
          <Link to="/browse/family" className="browseMore" id="dashFamilyView">
            View more
          </Link>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }
}

export default DashFamily;
