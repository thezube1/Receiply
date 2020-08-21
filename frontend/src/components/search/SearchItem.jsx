import React, { Component } from "react";

class SearchItem extends Component {
  state = {};
  render() {
    return (
      <div id="searchItemWrapper">
        <div id="searchItemTitle">{this.props.title}</div>
        <img
          id="searchItemImage"
          src={`/${this.props.image}`}
          alt={this.props.title}
        />
        <div id="searchItemDescription">{this.props.description}</div>
      </div>
    );
  }
}

export default SearchItem;
