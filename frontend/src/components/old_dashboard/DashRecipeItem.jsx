import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";

class DashRecipeItem extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    image: this.props.image,
  };

  render() {
    return (
      <div className="dashPopItem">
        <div className="dashPopItemContent">
          <div className="dashPopItemTitle">{this.state.title}</div>
          <div>
            <img
              src={`/${this.state.image}`}
              alt="food"
              className="dashPopItemImg"
            />
          </div>
          <div className="dashPopItemDesc">{this.state.description}</div>
          <div>Likes: {this.props.likes}</div>
        </div>
      </div>
    );
  }
}

export default DashRecipeItem;
