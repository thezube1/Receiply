import React, { Component } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";

class RecipeInfo extends Component {
  state = {
    name: [{ FIRST_NAME: "", LAST_NAME: "" }],
    color: "black",
    liked: undefined,
    likes: this.props.likes,
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
      axios.get(`/api/recipe/${this.props.recipeid}/unlike`);
      this.setState({ liked: false });
    } else {
      axios.get(`/api/recipe/${this.props.recipeid}/like`);
      this.setState({ liked: true });
    }
  }

  render() {
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
        <div id="recipeCreator">
          by {this.state.name[0].FIRST_NAME} {this.state.name[0].LAST_NAME}
        </div>
        <div id="recipeDescription">{this.props.description}</div>
        <div id="recipeInfoPreps">
          <div id="recipePrep">
            <div className="recipeHeader">Prep instructions</div>
            <ol id="recipePrepItemWrapper">
              {this.props.prep.map((item, index) => {
                return (
                  <li className="recipePrepItem" key={index}>
                    {item}
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <div className="recipeHeader">Ingredients</div>
            <ul id="recipeIngredientsItemWrapper">
              {this.props.ingredients.map((item, index) => {
                return (
                  <li className="recipePrepItem" key={index}>
                    {item}
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

export default RecipeInfo;