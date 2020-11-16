import React, { Component } from "react";

class EditItem extends Component {
  state = {};

  render() {
    return (
      <div className="uploadManualInputWrapper">
        <div>
          {this.props.isRequired === true ? (
            <span className="uploadManualRequired">*</span>
          ) : (
            <React.Fragment></React.Fragment>
          )}

          <span>{this.props.title}</span>
        </div>
        <textarea
          onChange={(event) => this.props.reducer(event.target.value)}
          className="uploadManualInput"
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder}
        ></textarea>
      </div>
    );
  }
}

export default EditItem;
