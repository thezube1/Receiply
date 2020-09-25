import React, { Component } from "react";
import NavbarMain from "../components/navbar/navbarmain";
import "../components/myrecipes/myrecipes.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyRecipesItem from "../components/myrecipes/MyRecipeItem";
import { user_recipes } from "../actions/actions";
import axios from "axios";

class MyRecipesPage extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("/api/recipes/user")
      .then((data) => this.props.write_user_recipes(data.data));
  }

  isRecipe = () => {
    if (this.props.user_recipes.length === 0) {
      return (
        <div>
          <div>You have no recipes!</div>
          <div>Create recipe</div>
        </div>
      );
    }
  };

  render() {
    console.log(this.props.user_recipes.length < 1);
    return (
      <div>
        <NavbarMain />
        <div id="myrecipesWrapper">
          <div className="contentOutline" id="myrecipesContent">
            {this.props.user_recipes.length > 1 ? (
              this.props.user_recipes.map((item) => {
                return (
                  <div key={item.RECIPE_ID}>
                    <Link
                      to={`/recipe/${item.RECIPE_IDENTIFIER}`}
                      className="recipeCardLink"
                    >
                      <MyRecipesItem
                        title={item.RECIPE_NAME}
                        description={item.DESCRIPTION}
                        image={item.PHOTO_NAME}
                        likes={item.LIKES}
                      />
                    </Link>
                    <div id="myrecipesShare">
                      Share type: {item.PUBLISH_STATE}
                    </div>
                  </div>
                );
              })
            ) : (
              <div id="myrecipeNoneWrapper">
                <div id="myrecipeText">You have no recipes</div>
                <Link to="/upload" id="myrecipeUploadButton">
                  Create recipe
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_recipes: state.user_recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    write_user_recipes: (event) => dispatch(user_recipes(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipesPage);
