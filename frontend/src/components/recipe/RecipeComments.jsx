import React, { Component } from "react";

class RecipeComments extends Component {
  state = {
    comment: "",
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleButtonVisible = () => {
    if (this.state.comment !== "") {
      return (
        <React.Fragment>
          <br />
          <input type="button" id="recipeCommentSubmit" value="Comment" />
        </React.Fragment>
      );
    }
  };
  render() {
    return (
      <div>
        <div id="recipeCommentBarrier"></div>
        <div className="recipeHeader" id="recipeCommentHeader">
          Comments
        </div>
        <input
          type="text"
          placeholder="Write a comment"
          id="recipeCommentInput"
          onChange={this.handleChange("comment")}
        ></input>
        {this.handleButtonVisible()}
        <div className="recipeCommentBorder"></div>
      </div>
    );
  }
}

export default RecipeComments;
