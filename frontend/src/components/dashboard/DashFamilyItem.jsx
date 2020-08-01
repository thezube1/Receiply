import React, { Component } from "react";

class DashFamilyItem extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    image: this.props.image,
  };
  render() {
    return (
      <div id="dashFamilyItem" className="dashPopItem">
        <div className="dashPopItemContent" id="dashFamilyItemContent">
          <div className="dashPopItemTitle">{this.state.title}</div>
          <div>
            <img
              src={`/${this.state.image}`}
              alt="food"
              className="dashPopItemImg"
            />
          </div>
          <div className="dashPopItemDesc">{this.state.description}</div>
        </div>
      </div>
    );
  }
}

export default DashFamilyItem;
