import React, { Component } from "react";

class SearchItem extends Component {
  state = {};
  render() {
    return (
      <div id="searchItemWrapper">
        <div>{this.props.title}</div>
        <img
          id="searchItemImage"
          src={`/${this.props.image}`}
          alt={this.props.title}
        />
        <div>{this.props.description}</div>
      </div>
    );
  }
}

export default SearchItem;
