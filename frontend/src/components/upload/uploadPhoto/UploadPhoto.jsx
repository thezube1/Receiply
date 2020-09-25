import React, { Component } from "react";
import "./UploadPhoto.css";
import Tesseract from "tesseract.js";

class UploadPhoto extends Component {
  state = {
    selectedFile: undefined,
    name: "",
    tesseract: undefined,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handlePhotoName = () => {
    if (this.state.selectedFile !== undefined) {
      return this.state.selectedFile.name;
    } else {
      return "Choose a file";
    }
  };

  handleProcess = (photo) => {
    Tesseract.recognize(photo, "eng", { logger: (m) => console.log(m) }).then(
      ({ data: { text } }) => {
        this.setState({ tesseract: text });
      }
    );
  };

  handleOCR = () => {
    if (typeof this.state.tesseract === "string") {
      return <div>{this.state.tesseract}</div>;
    }
  };

  render() {
    return (
      <div id="uploadPhotoWrapper">
        <div id="uploadPhotoContent">
          <div>Upload Photo:</div>
          <input
            id="uploadManualPhoto"
            type="file"
            name="uploadManualPhoto"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={this.onFileChange}
          />
          <label htmlFor="uploadManualPhoto">{this.handlePhotoName()}</label>
          <div>
            <input
              type="button"
              value="Submit"
              onClick={() => this.handleProcess(this.state.selectedFile)}
            />
          </div>
          {this.handleOCR()}
        </div>
      </div>
    );
  }
}

export default UploadPhoto;
