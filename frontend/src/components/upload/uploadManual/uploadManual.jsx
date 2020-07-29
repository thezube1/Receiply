import React, { Component } from "react";
import "./uploadManual.css";
import NavbarMain from "../../navbar/navbarmain";

class uploadManual extends Component {
  state = {
    ingredientCount: [""],
    prepCount: [""],
    cookingCount: [""],
    tags: [""],
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

  componentDidMount() {
    document.body.style.backgroundColor = "rgb(136, 228, 138)";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "white";
  }
  render() {
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
            <div className="uploadManualInputWrapper">
              <div>Upload Photo:</div>
              <input
                className="uploadManualButton"
                type="button"
                value="select"
              />
            </div>
            <div className="uploadManualInputWrapper">
              <div>
                <span className="uploadManualRequired">*</span>
                <span>Name of Recipe:</span>
              </div>
              <textarea
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
              <input
                id="uploadManualSave"
                className="uploadManualButton"
                type="button"
                value="Save recipe"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default uploadManual;
