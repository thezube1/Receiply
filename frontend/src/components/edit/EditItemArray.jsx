import React, { Component } from "react";

class EditItemArray extends Component {
  state = {
    ingredientCount: [""],
  };

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
        {this.props.defaultValue.map((item, index) => {
          return (
            <div key={index} className="uploadManualInputWrapper2">
              <textarea
                style={{ width: this.props.width }}
                className="uploadManualInput"
                id="uploadManualInputIngredient"
                placeholder={this.props.placeholder}
                value={item}
                onChange={(event) =>
                  this.props.reducer([index, event.target.value])
                }
              ></textarea>

              {this.props.defaultValue.length !== 1 ? (
                <button
                  className="uploadManualRemove"
                  onClick={() => {
                    this.props.removeReducer(index);
                  }}
                >
                  <div className="uploadManualRemoveInner"></div>
                </button>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {this.props.defaultValue.length === index + 1 ? (
                <button
                  className="uploadManualAdd"
                  onClick={() => this.props.addReducer()}
                >
                  <div className="uploadManualAddInner1"></div>
                  <div className="uploadManualAddInner2"></div>
                </button>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default EditItemArray;
