import React, { Component } from "react";

class UploadManualStep extends Component {
  state = {};
  render() {
    return (
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
              <button
                className="uploadManualRemove"
                onClick={() => {
                  this.handleRemove(
                    "ingredientCount",
                    this.state.ingredientCount,
                    index
                  );
                }}
              >
                <div className="uploadManualRemoveInner"></div>
              </button>
              {this.includeAdd(
                "ingredientCount",
                this.state.ingredientCount,
                index
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default UploadManualStep;
