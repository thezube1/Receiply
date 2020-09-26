import React, { Component } from "react";
import "./uploadManual.css";
import NavbarMain from "../../navbar/navbarmain";
import axios from "axios";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

class uploadManual extends Component {
  state = {
    selectedFile: null,
    complete: false,
    check: true,
    name: "",
    TTM: "",
    description: "",
    ingredientCount: [""],
    prepCount: [""],
    cookingCount: [""],
    tags: [""],
    sharing: undefined,
  };

  handleSubmit = () => {
    const formData = new FormData();
    formData.append("myImage", this.state.selectedFile);
    const data = {
      name: this.state.name,
      TTM: this.state.TTM,
      description: this.state.description,
      ingredients: JSON.stringify(this.state.ingredientCount),
      prep: JSON.stringify(this.state.prepCount),
      steps: JSON.stringify(this.state.cookingCount),
      tags: JSON.stringify(this.state.tags),
      sharing: this.state.sharing,
    };

    for (var key in data) {
      formData.append(key, data[key]);
    }
    if (
      this.state.sharing === undefined ||
      this.state.name === "" ||
      this.state.TTM === "" ||
      this.state.description === "" ||
      this.state.cookingCount.length === 0 ||
      this.state.cookingCount[0] === ""
    ) {
      window.scrollTo(0, 0);
      this.setState({ check: false });
    } else {
      console.log(formData);

      axios
        .post("/api/recipe", formData)
        .then((res) => this.setState({ complete: res.data }));
    }
  };

  handleChange2 = (event) => {
    this.setState({ sharing: event });
  };

  handleRemove = (name, type, index) => {
    const array = type;
    array.splice(index, 1);
    this.setState({ [name]: array });
  };

  handleAdd = (name, type) => {
    type.push("");
    this.setState({ [name]: type });
  };

  handleArrayChange = (inputType, type, index) => (event) => {
    let newItem = event.target.value;
    const newArray = this.state[inputType];
    newArray[index] = newItem;
    this.setState({
      [inputType]: newArray,
    });
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  includeAdd = (name, type, index) => {
    if (type.length === index + 1) {
      return (
        <button
          className="uploadManualAdd"
          onClick={() => this.handleAdd(name, type)}
        >
          <div className="uploadManualAddInner1"></div>
          <div className="uploadManualAddInner2"></div>
        </button>
      );
    }
  };

  includeDelete = (name, type, index) => {
    if (type.length !== 1) {
      return (
        <button
          className="uploadManualRemove"
          onClick={() => {
            this.handleRemove(name, type, index);
          }}
        >
          <div className="uploadManualRemoveInner"></div>
        </button>
      );
    } else if (index !== 0) {
      return (
        <button
          className="uploadManualRemove"
          onClick={() => {
            this.handleRemove(name, type, index);
          }}
        >
          <div className="uploadManualRemoveInner"></div>
        </button>
      );
    }
  };

  handleWarning = () => {
    if (this.state.check === false) {
      window.scrollTo(0, 0);
      return (
        <div className="uploadManualRequired">
          One or more fields is missing!
        </div>
      );
    } else if (this.state.complete === "badFamily") {
      window.scrollTo(0, 0);
      return (
        <div className="uploadManualRequired">
          Error: You are not apart of a family, so you cannot choose to share
          with family
        </div>
      );
    }
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handlePhotoName = () => {
    if (this.state.selectedFile !== null) {
      return this.state.selectedFile.name;
    } else {
      return "Choose a file";
    }
  };

  componentDidMount() {
    document.body.style.backgroundColor = "rgb(136, 228, 138)";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "white";
  }
  render() {
    if (this.state.complete === true) {
      return <div id="uploadManualWrapper">Recipe has been uploaded</div>;
    }
    return (
      <React.Fragment>
        <NavbarMain />
        <div id="uploadManualWrapper">
          <div id="uploadManualContent">
            <div id="uploadManualTitleWrapper">
              <div id="uploadManualTitle">Upload Recipe</div>
              <div className="uploadManualRequired">
                Items with * are required fields
              </div>
            </div>
            {this.handleWarning()}
            <div className="uploadManualInputWrapper">
              <div>Upload Photo:</div>
              <input
                id="uploadManualPhoto"
                type="file"
                name="uploadManualPhoto"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={this.onFileChange}
              />
              <label htmlFor="uploadManualPhoto">
                {this.handlePhotoName()}
              </label>
            </div>
            <div className="uploadManualInputWrapper">
              <div>
                <span className="uploadManualRequired">*</span>
                <span>Time to make</span>
              </div>
              <textarea
                id="uploadManualTTM"
                onChange={this.handleChange("TTM")}
                className="uploadManualInput"
                placeholder="Enter estimated time to make"
              ></textarea>
            </div>
            <div className="uploadManualInputWrapper">
              <div>
                <span className="uploadManualRequired">*</span>
                <span>Name of Recipe:</span>
              </div>
              <textarea
                onChange={this.handleChange("name")}
                className="uploadManualInput"
                placeholder="Enter name of Recipe"
              ></textarea>
            </div>
            <div className="uploadManualInputWrapper">
              <div>
                <span className="uploadManualRequired">*</span>
                <span>Description:</span>
              </div>
              <textarea
                onChange={this.handleChange("description")}
                className="uploadManualInput"
                id="uploadManualInputDescription"
                placeholder="Enter description of Recipe"
              ></textarea>
            </div>

            {/* Ingredients form*/}
            <div className="uploadManualInputWrapper">
              <div>
                <span>Ingredients:</span>
              </div>
              {this.state.ingredientCount.map((item, index) => {
                return (
                  <div key={index} className="uploadManualInputWrapper2">
                    <textarea
                      className="uploadManualInput"
                      id="uploadManualInputIngredient"
                      placeholder="Enter ingredient"
                      value={item}
                      onChange={this.handleArrayChange(
                        "ingredientCount",
                        this.state.ingredientCount,
                        index
                      )}
                    ></textarea>
                    {this.includeDelete(
                      "ingredientCount",
                      this.state.ingredientCount,
                      index
                    )}
                    {this.includeAdd(
                      "ingredientCount",
                      this.state.ingredientCount,
                      index
                    )}
                  </div>
                );
              })}
            </div>

            {/* Prep instructions form*/}
            <div className="uploadManualInputWrapper">
              <div>
                <span>Prep instructions:</span>
              </div>
              {this.state.prepCount.map((item, index) => {
                return (
                  <div key={index} className="uploadManualInputWrapper2">
                    <textarea
                      className="uploadManualInput"
                      id="uploadManualInputIngredient"
                      placeholder="Enter step"
                      value={item}
                      onChange={this.handleArrayChange(
                        "prepCount",
                        this.state.prepCount,
                        index
                      )}
                    ></textarea>
                    {this.includeDelete(
                      "prepCount",
                      this.state.prepCount,
                      index
                    )}
                    {this.includeAdd("prepCount", this.state.prepCount, index)}
                  </div>
                );
              })}
            </div>

            {/* Cooking instructions form*/}
            <div className="uploadManualInputWrapper">
              <div>
                <span className="uploadManualRequired">*</span>
                <span>Cooking instructions:</span>
              </div>
              {this.state.cookingCount.map((item, index) => {
                return (
                  <div key={index} className="uploadManualInputWrapper2">
                    <textarea
                      className="uploadManualInput"
                      id="uploadManualInputIngredient"
                      placeholder="Enter step"
                      value={item}
                      onChange={this.handleArrayChange(
                        "cookingCount",
                        this.state.cookingCount,
                        index
                      )}
                    ></textarea>
                    {this.includeDelete(
                      "cookingCount",
                      this.state.cookingCount,
                      index
                    )}
                    {this.includeAdd(
                      "cookingCount",
                      this.state.cookingCount,
                      index
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tags */}
            <div className="uploadManualInputWrapper">
              <div>
                <span>Tags:</span>
              </div>
              {this.state.tags.map((item, index) => {
                return (
                  <div key={index} className="uploadManualInputWrapper2">
                    <textarea
                      className="uploadManualInput"
                      id="uploadManualInputTags"
                      placeholder="Enter step"
                      value={item}
                      onChange={this.handleArrayChange(
                        "tags",
                        this.state.tags,
                        index
                      )}
                    ></textarea>
                    {this.includeDelete("tags", this.state.tags, index)}
                    {this.includeAdd("tags", this.state.tags, index)}
                  </div>
                );
              })}
            </div>
            <div className="uploadManualInputWrapper">
              <div>
                <span className="uploadManualRequired">*</span>
                <span>Who can view your recipe:</span>
              </div>
              <ToggleButtonGroup
                name="selectShare"
                type="radio"
                onChange={this.handleChange2}
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
            <div className="uploadManualInputWrapper">
              <input
                id="uploadManualSave"
                className="uploadManualButton"
                type="button"
                value="Save recipe"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
        <div id="uploadManualBottom"></div>
      </React.Fragment>
    );
  }
}

export default uploadManual;
