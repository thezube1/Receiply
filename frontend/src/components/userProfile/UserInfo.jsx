import React, { Component } from "react";

class UserInfo extends Component {
  state = {};
  render() {
    return (
      <div id="userInfoContent">
        <div id="userUsername">{this.props.username}</div>
        <div className="userInfo">
          <span className="userInfoHeader">Name: </span>
          <span>{this.props.first} </span>
          <span>{this.props.last}</span>
        </div>
        <div className="userInfo">
          <span className="userInfoHeader">Family: </span>
          <span>{this.props.family}</span>
        </div>
      </div>
    );
  }
}

export default UserInfo;
