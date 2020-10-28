import React, { Component } from "react";
import EditItem from "./EditItem";
import EditItemArray from "./EditItemArray";
import EditShare from "./EditShare";
import { connect } from "react-redux";
import NavbarMain from "../navbar/navbarmain";
import axios from "axios";
import { Redirect } from "react-router-dom";

class EditForm extends Component {
  state = {
    check: undefined,
  };

  componentDidMount() {
    axios.get(`/api/recipe/${this.props.recipe}`).then((res) => {
      const recipe = res.data;
      this.props.write_recipe(recipe);
    });
  }

  handleSave = () => {
    axios
      .put(`/api/recipe/${this.props.recipe}`, {
        recipe: {
          ...this.props.editReducer,
          recipe_identifier: this.props.recipe,
        },
      })
      .then((res) => this.setState({ check: res.data }));
  };

  render() {
    if (this.state.check === true) {
      return <Redirect to={`/recipe/${this.props.recipe}`} />;
    } else {
      return (
        <React.Fragment>
          <NavbarMain />
          <div id="editWrapper">
            <div id="editContentWrapper">
              <div id="editContent">
                <div id="uploadManualTitleWrapper">
                  <div id="uploadManualTitle">Edit recipe</div>
                  <div className="uploadManualRequired">
                    Items with * are required fields
                  </div>
                </div>
                <EditItem
                  title="Time to make"
                  isRequired={true}
                  reducer={this.props.write_ttm}
                  defaultValue={this.props.editReducer.ttm}
                  placeholder="Enter estimated time to make"
                  width={300}
                />
                <EditItem
                  title="Name of Recipe"
                  isRequired={true}
                  reducer={this.props.write_recipe_name}
                  defaultValue={this.props.editReducer.recipe_name}
                  placeholder="Enter name of Recipe"
                  width={900}
                />
                <EditItem
                  title="Description"
                  isRequired={true}
                  reducer={this.props.write_recipe_description}
                  defaultValue={this.props.editReducer.recipe_description}
                  placeholder="Enter description of Recipe"
                  width={900}
                  height={200}
                />
                <EditItemArray
                  title="Ingredients:"
                  reducer={this.props.write_recipe_ingredient}
                  defaultValue={this.props.editReducer.recipe_ingredients}
                  placeholder="Enter ingredient"
                  addReducer={this.props.add_recipe_ingredient}
                  removeReducer={this.props.remove_recipe_ingredient}
                />
                <EditItemArray
                  title="Prep instructions:"
                  reducer={this.props.write_prep_instruction}
                  defaultValue={this.props.editReducer.prep_instructions}
                  placeholder="Enter step"
                  addReducer={this.props.add_prep_instruction}
                  removeReducer={this.props.remove_prep_instruction}
                />
                <EditItemArray
                  title="Cooking instructions:"
                  reducer={this.props.write_cooking_instruction}
                  defaultValue={this.props.editReducer.cooking_instructions}
                  placeholder="Enter step"
                  addReducer={this.props.add_cooking_instruction}
                  removeReducer={this.props.remove_cooking_instruction}
                  isRequired={true}
                />
                <EditItemArray
                  title="Tags:"
                  reducer={this.props.write_tags}
                  defaultValue={this.props.editReducer.tags}
                  placeholder="Enter tag"
                  addReducer={this.props.add_tag}
                  removeReducer={this.props.remove_tag}
                  width={300}
                />
                <EditShare
                  reducer={this.props.share}
                  defaultValue={this.props.editReducer.share}
                />
                <div className="uploadManualInputWrapper">
                  <button
                    id="uploadManualSave"
                    className="uploadManualButton"
                    onClick={this.handleSave}
                  >
                    Save edits
                  </button>
                  <button
                    id="uploadManualSave"
                    className="uploadManualButton"
                    style={{ marginLeft: 20, backgroundColor: "gray" }}
                    onClick={() => {
                      this.setState({ check: true });
                      this.props.clear_recipe();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_recipe: (data) => dispatch({ type: "UPDATE_RECIPE", payload: data }),
    write_ttm: (data) => dispatch({ type: "TTM", payload: data }),
    write_recipe_name: (data) =>
      dispatch({ type: "RECIPE_NAME", payload: data }),
    write_recipe_description: (data) =>
      dispatch({ type: "RECIPE_DESCRIPTION", payload: data }),
    write_recipe_ingredient: (data) =>
      dispatch({ type: "RECIPE_INGREDIENT", payload: data }),
    add_recipe_ingredient: () => dispatch({ type: "ADD_RECIPE_INGREDIENT" }),
    remove_recipe_ingredient: (data) =>
      dispatch({ type: "REMOVE_RECIPE_INGREDIENT", payload: data }),
    write_prep_instruction: (data) =>
      dispatch({ type: "PREP_INSTRUCTION", payload: data }),
    add_prep_instruction: () => dispatch({ type: "ADD_PREP_INSTRUCTION" }),
    remove_prep_instruction: (data) =>
      dispatch({ type: "REMOVE_PREP_INSTRUCTION", payload: data }),
    write_cooking_instruction: (data) =>
      dispatch({ type: "COOKING_INSTRUCTION", payload: data }),
    add_cooking_instruction: () =>
      dispatch({ type: "ADD_COOKING_INSTRUCTION" }),
    remove_cooking_instruction: (data) =>
      dispatch({ type: "REMOVE_COOKING_INSTRUCTION", payload: data }),
    write_tags: (data) => dispatch({ type: "TAGS", payload: data }),
    add_tag: () => dispatch({ type: "ADD_TAG" }),
    remove_tag: (data) => dispatch({ type: "REMOVE_TAG", payload: data }),
    share: (data) => dispatch({ type: "SHARE", payload: data }),
    clear_recipe: () => dispatch({ type: "CLEAR_RECIPE" }),
  };
};

const mapStateToProps = (state) => {
  return {
    editReducer: state.edit_reducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
