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
          id="uploadManualTTM"
          onChange={(event) => this.props.reducer(event.target.value)}
          className="uploadManualInput"
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder}
          style={{ width: this.props.width, height: this.props.height }}
        ></textarea>
      </div>
    );
  }
}

export default EditItem;