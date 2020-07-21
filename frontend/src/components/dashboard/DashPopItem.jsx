import React, { Component } from "react";

class DashPopItem extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
  };
  render() {
    return (
      <div className="dashPopItem">
        <div className="dashPopItemContent">
          <div className="dashPopItemTitle">{this.state.title}</div>
          <div className="dashPopItemImg"></div>
          <div className="dashPopItemDesc">{this.state.description}</div>
        </div>
      </div>
    );
  }
}

export default DashPopItem;
