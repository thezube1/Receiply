import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashCard extends Component {
  state = {};
  render() {
    return (
      <Link
        to={`/recipe/${this.props.identifier}`}
        style={{ textDecoration: "none", outline: "none" }}
      >
        <div className="dash-card-wrapper">
          <div>
            <img
              src={`/${this.props.image}`}
              alt="Image of food"
              className="dash-card-image"
            />
          </div>
          <div>
            <div id="dash-card-title" className="text">
              {this.props.recipe_name}
            </div>
            <div id="dash-card-desc" className="text">
              {this.props.description.substring(0, 80)}...
            </div>
            <div id="dash-card-creator" className="text">
              Creator: {this.props.creator}
            </div>
          </div>
          <div></div>
        </div>
      </Link>
    );
  }
}

export default DashCard;
