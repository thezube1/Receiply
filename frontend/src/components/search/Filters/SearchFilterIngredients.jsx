import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isEqual } from "lodash";

import { connect } from "react-redux";

class SearchFilterIngredients extends Component {
  state = {
    value: "",
    ingredients: [],
    error: false,
    redirect: false,
    check: false,
  };

  handleAdd = (type, value) => {
    if (this.state.value !== "") {
      const array = this.state[type];
      array.push(value);
      this.setState({ [type]: array, value: "", error: false });
      if (window.location.search.includes("&ingr=") === false) {
        let query =
          window.location.search + `&ingr=${this.state.ingredients.join(",")}`;
        this.setState({ redirect: query });
      } else {
        let query = window.location.search.replace(
          `&ingr=${this.props.search_query.ingr}`,
          `&ingr=${this.state.ingredients.join(",")}`
        );
        this.setState({ redirect: query });
      }
    } else {
      this.setState({ error: true });
    }
  };

  handleDelete = (index, type) => {
    let array = type;
    array.splice(index, 1);
    //let newArray = array.splice(index, index);
    this.setState({ ingredients: array });
    if (array.length === 0) {
      if (typeof this.props.search_query.ingr === "string") {
        let query = window.location.search.replace(
          `&ingr=${this.props.search_query.ingr}`,
          ""
        );
        this.setState({ redirect: query });
      } else {
        let query = window.location.search.replace(
          `&ingr=${this.props.search_query.ingr.join(",")}`,
          ""
        );
        this.setState({ redirect: query });
      }
    } else {
      let query = window.location.search.replace(
        `&ingr=${this.props.search_query.ingr}`,
        `&ingr=${array.join(",")}`
      );
      this.setState({ redirect: query });
    }
  };

  handleFilter = () => {
    if (this.state.redirect !== false) {
      return <Redirect to={window.location.pathname + this.state.redirect} />;
    }
  };

  defaultIngredients = () => {
    if (this.props.search_query.ingr !== undefined) {
      if (typeof this.props.search_query.ingr === "string") {
        this.setState({ ingredients: [this.props.search_query.ingr] });
      } else {
        this.setState({ ingredients: this.props.search_query.ingr });
      }
    }
  };

  componentDidUpdate() {
    if (this.state.redirect !== false) {
      this.setState({ redirect: false });
    }

    if (typeof this.props.search_query.ingr === "string") {
      if (this.state.ingredients[0] !== this.props.search_query.ingr) {
        this.defaultIngredients();
      }
    } else {
      if (
        isEqual(this.state.ingredients, this.props.search_query.ingr) === false
      ) {
        this.defaultIngredients();
      }
    }
  }

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

  render() {
    return (
      <React.Fragment>
        <div className="searchFilterHeader">Ingredient filter:</div>
        {this.handleError()}
        {this.handleFilter()}
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

const mapStateToProps = (state) => {
  return {
    search_query: state.search_query,
  };
};

export default connect(mapStateToProps)(SearchFilterIngredients);
