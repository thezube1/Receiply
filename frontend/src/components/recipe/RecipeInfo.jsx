import React, { Component } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class RecipeInfo extends Component {
  state = {
    name: [{ FIRST_NAME: "", LAST_NAME: "" }],
    color: "black",
    liked: undefined,
    likes: this.props.likes,
    isLogged: undefined,
    ingredients: this.props.ingredients,
    prep: this.props.prep,
  };

  componentDidMount() {
    axios
      .get(`/api/recipe/${this.props.recipeid}/creator`)
      .then((response) => this.setState({ name: response.data }));
    axios.get(`/api/recipe/${this.props.recipeid}/check-like`).then((res) => {
      this.setState({ liked: res.data });
      if (res.data === false) {
        this.setState({ color: "black" });
      } else {
        this.setState({ color: "rgb(131, 226, 133)" });
      }
    });
  }

  handleLike() {
    this.state.color === "black"
      ? this.setState({
          color: "rgb(131, 226, 133)",
          likes: this.state.likes + 1,
        })
      : this.setState({ color: "black", likes: this.state.likes - 1 });
    if (this.state.liked === true) {
      axios
        .get(`/api/recipe/${this.props.recipeid}/unlike`)
        .then((res) => this.setState({ isLogged: res.data }));
      this.setState({ liked: false });
    } else {
      axios
        .get(`/api/recipe/${this.props.recipeid}/like`)
        .then((res) => this.setState({ isLogged: res.data }));
      this.setState({ liked: true });
    }
  }

  render() {
    if (this.state.isLogged === false) {
      return <Redirect to="/login" />;
    } else {
      return (
        <React.Fragment>
          <div id="recipeTitleWrapper">
            <div>
              <span id="recipeTitle">{this.props.title}</span>
            </div>
            <div id="recipeTitleDivider"></div>
            <div id="recipeLikesWrapper">
              <button
                id="recipeLikeButton"
                onClick={() => this.handleLike()}
                style={{ color: this.state.color }}
              >
                <FaThumbsUp id="recipeLikeIcon" />
              </button>
              <div>Likes: {this.state.likes}</div>
            </div>
          </div>
          <Link
            to={`/user/${this.state.name[0].USERNAME}`}
            style={{ textDecoration: "none", outline: "none" }}
          >
            <div id="recipeCreator">
              by {this.state.name[0].FIRST_NAME} {this.state.name[0].LAST_NAME}
            </div>
          </Link>
          <div id="recipeDescription">{this.props.description}</div>
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
        </React.Fragment>
      );
    }
  }
}

export default RecipeInfo;
