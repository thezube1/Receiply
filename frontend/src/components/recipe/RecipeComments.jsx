import React, { Component } from "react";

class RecipeComments extends Component {
  state = {
    comment: "",
    comments: [""],
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleButtonVisible = () => {
    if (this.state.comment !== "") {
      return (
        <React.Fragment>
          <input
            type="button"
            className="recipeCommentButton"
            id="recipeCommentSubmit"
            value="Comment"
          />
          <input
            type="button"
            className="recipeCommentButton"
            id="recipeCommentCancel"
            value="Cancel"
          />
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
        <div className="recipeCommentBorder"></div>
        {this.handleButtonVisible()}
        {this.state.comments.map((item) => {
          return <div>item</div>;
        })}
      </div>
    );
  }
}

export default RecipeComments;
