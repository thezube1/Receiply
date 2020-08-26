import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class SearchFilterIngredients extends Component {
  state = {
    value: "",
    ingredients: [],
    error: false,
  };

  handleAdd = (type, value) => {
    if (this.state.value !== "") {
      const array = this.state[type];
      array.push(value);
      this.setState({ [type]: array, value: "", error: false });
    } else {
      this.setState({ error: true });
    }
  };

  handleDelete = (index, type) => {
    let array = type;
    this.setState({ ingredients: array.splice(index, index) });
  };

  handleChange = (type) => (event) => {
    this.setState({ [type]: event.target.value });
  };

  handleError = () => {
    if (this.state.error === true) {
      return (
        <div
          style={{
            color: "red",
            fontFamily: "Source Sans Pro",
            fontWeight: 300,
            fontSize: 15,
          }}
        >
          Insert value
        </div>
      );
    }
  };

  handleFilter = (type) => {
    if (this.state.ingredients.length !== 0) {
      if (window.location.href.includes(`ingr=${type}`) === false) {
        if (window.location.href.includes("ingr") === true) {
          const newQuery = window.location.search.replace(
            `&ingr=${this.props.query.ingr}`,
            `&ingr=${type}`
          );
          return <Redirect to={window.location.pathname + newQuery} />;
        } else {
          return (
            <Redirect
              to={
                window.location.pathname +
                window.location.search +
                `&ingr=${type}`
              }
            />
          );
        }
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="searchFilterHeader">Ingredient filter:</div>
        {this.handleError()}
        <div id="searchFilterIngredientInputWrapper">
          <input
            type="text"
            id="searchFilterIngreidentInput"
            onChange={this.handleChange("value")}
            value={this.state.value}
          />
          <button
            className="searchFilterIngredientButton"
            onClick={() => this.handleAdd("ingredients", this.state.value)}
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
                onClick={() => this.handleDelete(index, this.state.ingredients)}
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
