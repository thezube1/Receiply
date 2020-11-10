import React, { Component } from "react";

class UserInfo extends Component {
  state = {};
  render() {
    return (
      <div id="userInfoContent">
        <div id="userUsername">{this.props.username}</div>
        {this.props.first !== false || this.props.last !== false ? (
          <div className="userInfo">
            <span className="userInfoHeader">Name: </span>
            <span>{this.props.first} </span>
            <span>{this.props.last}</span>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {this.props.family !== false ? (
          <div className="userInfo">
            <span className="userInfoHeader">Family: </span>
            <span>{this.props.family}</span>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }
}

export default UserInfo;
