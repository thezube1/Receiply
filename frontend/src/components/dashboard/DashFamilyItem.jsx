import React, { Component } from "react";

class DashFamilyItem extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
  };
  render() {
    return (
      <div id="dashFamilyItem" className="dashPopItem">
        <div className="dashPopItemContent">
          <div className="dashPopItemTitle">{this.state.title}</div>
          <div className="dashPopItemImg" id="dashFamImg"></div>
          <div className="dashPopItemDesc">{this.state.description}</div>
        </div>
      </div>
    );
  }
}

export default DashFamilyItem;
