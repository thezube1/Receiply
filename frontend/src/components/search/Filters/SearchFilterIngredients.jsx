import React, { Component } from "react";
class SearchFilterIngredients extends Component {
  state = {
    value: "",
    ingredients: [],
  };

  handleAdd = (name, type) => {
    type.push(this.state.value);
    this.setState({ [name]: type, value: "" });
  };

  handleChange = (type) => (event) => {
    this.setState({ [type]: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="searchFilterHeader">Ingredient filter:</div>
        <div id="searchFilterIngredientInputWrapper">
          <input
            type="text"
            id="searchFilterIngreidentInput"
            onChange={this.handleChange("value")}
            value={this.state.value}
          />
          <button
            className="searchFilterIngredientButton"
            onClick={() =>
              this.handleAdd("ingredients", this.state.ingredients)
            }
          >
            <span id="searchFilterIngredientAddIcon">+</span>
          </button>
        </div>
        {this.state.ingredients.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginTop: 10,
              }}
            >
              {item}
              <button
                style={{ backgroundColor: "red" }}
                className="searchFilterIngredientButton"
              >
                <span id="searchFilterIngredientRemoveIcon">-</span>
              </button>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default SearchFilterIngredients;
