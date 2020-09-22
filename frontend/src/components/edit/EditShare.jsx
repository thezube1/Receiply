import React, { Component } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

class EditShare extends Component {
  state = {};

  render() {
    return (
      <div className="uploadManualInputWrapper">
        <div>
          <span className="uploadManualRequired">*</span>
          <span>Who can view your recipe:</span>
        </div>
        <ToggleButtonGroup
          name="selectShare"
          type="radio"
          onChange={(data) => this.props.reducer(data)}
          id="uploadManualShare"
        >
          <ToggleButton
            variant="success"
            className="uploadManualShareButton"
            value={1}
          >
            Private
          </ToggleButton>
          <ToggleButton
            variant="success"
            className="uploadManualShareButton"
            value={2}
          >
            Family
          </ToggleButton>
          <ToggleButton
            variant="success"
            className="uploadManualShareButton"
            value={3}
          >
            Public
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
}

export default EditShare;
