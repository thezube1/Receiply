import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class RecipeComments extends Component {
  state = {
    comment: "",
    comments: undefined,
    commented: undefined,
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleCancel = () => {
    this.setState({ comment: "" });
  };

  handleSubmit = () => {
    const comment = this.state.comment;
    const recipeid = this.props.recipeid;
    axios
      .post("/api/comment", { comment: comment, recipeid: recipeid })
      .then((res) => this.setState({ commented: res.data }));
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
            onClick={this.handleSubmit}
          />
          <input
            type="button"
            className="recipeCommentButton"
            id="recipeCommentCancel"
            value="Cancel"
            onClick={this.handleCancel}
          />
        </React.Fragment>
      );
    }
  };

  handleComments = () => {
    if (this.state.comments === undefined) {
      return <div>Loading comments...</div>;
    } else if (this.state.comments === false) {
      return <div>This recipe has no comments!</div>;
    } else {
      return this.state.comments.map((item) => {
        return (
          <div key={item.COMMENT_ID} id="recipeCommentItemWrapper">
            <div id="recipeCommentItemContent">
              <Link
                style={{ color: "black", textDecoration: "none" }}
                id="recipeCommentItemUserWrapper"
                to={`/user/${item.USERNAME}`}
              >
                <div id="recipeCommentItemUser">
                  {item.FIRST_NAME + " " + item.LAST_NAME}
                </div>
                <div id="recipeCommentItemProfile"></div>
                <div id="recipeCommentItemDivider"></div>
              </Link>
              <div id="recipeCommentItem">{item.COMMENT_CONTENT}</div>
            </div>
            <div className="recipeCommentBorder"></div>
          </div>
        );
      });
    }
  };

  componentDidMount() {
    axios
      .get(`/api/comment/${this.props.recipeid}`)
      .then((res) => this.setState({ comments: res.data }));
  }

  render() {
    if (this.state.commented === false) {
      return <Redirect to="/login" />;
    }
    if (this.state.commented === true) {
      window.location.reload(false);
    }
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
          value={this.state.comment}
        ></input>
        <div className="recipeCommentBorder"></div>
        {this.handleButtonVisible()}
        {this.handleComments()}
      </div>
    );
  }
}

export default RecipeComments;
