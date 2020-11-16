import React, { Component } from "react";
import NavbarMain from "../navbar/navbarmain";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import EditItem from "../edit/EditItem";
import EditItemArray from "../edit/EditItemArray";
import EditShare from "../edit/EditShare";

import "../edit/edit.css";
import "./uploadManual/uploadManual.css";

class UploadManual extends Component {
  state = {
    selectedFile: undefined,
    complete: undefined,
    cleared: false,
  };

  handleSubmit = () => {
    const formData = new FormData();
    formData.append("myImage", this.state.selectedFile);
    const data = {
      name: this.props.editReducer.recipe_name,
      TTM: this.props.editReducer.ttm,
      description: this.props.editReducer.recipe_description,
      ingredients: JSON.stringify(this.props.editReducer.recipe_ingredients),
      prep: JSON.stringify(this.props.editReducer.prep_instructions),
      steps: JSON.stringify(this.props.editReducer.cooking_instructions),
      tags: JSON.stringify(this.props.editReducer.tags),
      sharing: this.props.editReducer.share,
    };

    for (var key in data) {
      formData.append(key, data[key]);
    }
    if (
      this.state.selectedFile === undefined ||
      this.props.editReducer.share === undefined ||
      this.props.editReducer.recipe_name === "" ||
      this.props.editReducer.ttm === "" ||
      this.props.editReducer.recipe_description === "" ||
      this.props.editReducer.cooking_instructions.length === 0 ||
      this.props.editReducer.cooking_instructions[0] === ""
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

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handlePhotoName = () => {
    console.log(this.state.selectedFile);
    if (this.state.selectedFile !== undefined) {
      return this.state.selectedFile.name;
    } else {
      return "Choose a file";
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

  componentDidUpdate() {
    if (this.state.complete === true) {
      if (this.state.cleared !== true) {
        this.setState({ cleared: true });
        this.props.clear_recipe();
      }
    }
  }

  componentDidMount() {
    document.body.style.backgroundColor = "rgb(136, 228, 138)";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "white";
  }

  render() {
    if (this.state.complete === true) {
      return (
        <div id="uploadManualConfirmed">
          <div id="uploadManualContent">
            <div id="uploadManualWrapper">
              <div id="uploadRedirectText">Your recipe has been uploaded</div>
              <Link
                id="uploadManualReturn"
                className="uploadManualButton"
                onClick={this.handleSubmit}
                to="/"
              >
                Return to dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <NavbarMain />
        <div id="uploadManualWrapper">
          <div id="uploadManualContent">
            <div id="uploadInnerContent">
              <div id="uploadManualTitleWrapper">
                <div id="uploadManualTitle">Upload recipe</div>
                <div className="uploadManualRequired">
                  Items with * are required fields
                </div>
              </div>
              {this.handleWarning()}
              <div>
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
                width={700}
              />
              <EditItem
                title="Description"
                isRequired={true}
                reducer={this.props.write_recipe_description}
                defaultValue={this.props.editReducer.recipe_description}
                placeholder="Enter description of Recipe"
                width={700}
                height={200}
              />
              <EditItemArray
                title="Ingredients:"
                reducer={this.props.write_recipe_ingredient}
                defaultValue={this.props.editReducer.recipe_ingredients}
                placeholder="Enter ingredient"
                addReducer={this.props.add_recipe_ingredient}
                removeReducer={this.props.remove_recipe_ingredient}
                width={600}
              />
              <EditItemArray
                title="Prep instructions:"
                reducer={this.props.write_prep_instruction}
                defaultValue={this.props.editReducer.prep_instructions}
                placeholder="Enter step"
                addReducer={this.props.add_prep_instruction}
                removeReducer={this.props.remove_prep_instruction}
                width={600}
              />
              <EditItemArray
                title="Cooking instructions:"
                reducer={this.props.write_cooking_instruction}
                defaultValue={this.props.editReducer.cooking_instructions}
                placeholder="Enter step"
                addReducer={this.props.add_cooking_instruction}
                removeReducer={this.props.remove_cooking_instruction}
                isRequired={true}
                width={600}
              />
              <EditItemArray
                title="Tags:"
                reducer={this.props.write_tags}
                defaultValue={this.props.editReducer.tags}
                placeholder="Enter tag"
                addReducer={this.props.add_tag}
                removeReducer={this.props.remove_tag}
                width={600}
              />
              <EditShare
                reducer={this.props.share}
                defaultValue={this.props.editReducer.share}
              />
              <div className="uploadManualInputWrapper">
                <button
                  id="uploadManualSave"
                  className="uploadManualButton"
                  onClick={this.handleSubmit}
                >
                  Save recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadManual);
