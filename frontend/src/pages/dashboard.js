import React, { Component } from "react";
import NavbarMain from "../components/navbar/navbarmain";
import axios from "axios";
import "../components/dashboard/dashboard.css";
import DashCard from "../components/dashboard/DashCard";
import { Link } from "react-router-dom";

class DashboardPage extends Component {
  state = {
    family: undefined,
    family_recipes: undefined,
    popular_recipes: undefined,
    my_recipes: undefined,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  componentDidMount() {
    Promise.all([
      axios
        .get("/api/getfamily", { cancelToken: this.source.token })
        .then((result) => {
          this.setState({ family: result.data });
        })
        .catch((err) => console.log(err)),
      axios
        .get("/api/recipes/family", { cancelToken: this.source.token })
        .then((res) => this.setState({ family_recipes: res.data }))
        .catch((err) => console.log(err)),
      axios
        .get("/api/recipes/public", { cancelToken: this.source.token })
        .then((res) => this.setState({ popular_recipes: res.data }))
        .catch((err) => console.log(err)),
      axios
        .get("/api/recipes/user", { cancelToken: this.source.token })
        .then((res) => this.setState({ my_recipes: res.data }))
        .catch((err) => console.log(err)),
    ]);
  }

  render() {
    return (
      <>
        <NavbarMain />
        {this.state.family === undefined ||
        this.state.family_recipes === undefined ||
        this.state.my_recipes === undefined ||
        this.state.popular_recipes === undefined ? (
          <div>Loading</div>
        ) : (
          <div id="dashboard-wrapper">
            <div id="dashboard-content">
              <div className="dashboard-section">
                <div className="dashboard-section-container">
                  <div className="dashboard-title-wrapper">
                    <div className="dashboard-title">Popular Recipes</div>
                  </div>
                  <div className="dashboard-card-container">
                    {this.state.popular_recipes.length === 0 ? (
                      <div style={{ display: "grid", justifyItems: "center" }}>
                        <div className="text dashboard-blank">No Recipes</div>
                        <Link
                          to="/upload/manual"
                          className="button dashboard-create-button"
                          style={{ textDecoration: "none" }}
                        >
                          Create Recipe
                        </Link>
                      </div>
                    ) : (
                      this.state.popular_recipes.slice(0, 7).map((item) => {
                        return (
                          <DashCard
                            key={item.RECIPE_ID}
                            identifier={item.RECIPE_IDENTIFIER}
                            image={item.PHOTO_NAME}
                            recipe_name={item.RECIPE_NAME}
                            description={item.DESCRIPTION}
                            creator={item.CREATOR_USERNAME}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
                {this.state.popular_recipes.length === 0 ? (
                  false
                ) : (
                  <Link
                    to="/myrecipes"
                    className="button dashboard-view-button"
                    style={{ textDecoration: "none" }}
                  >
                    View More
                  </Link>
                )}
              </div>
              <div className="dashboard-section">
                <div className="dashboard-section-container">
                  <div className="dashboard-title-wrapper">
                    <div className="dashboard-title">Family Recipes</div>
                  </div>
                  <div className="dashboard-card-container">
                    {this.state.family_recipes === "BadRecipe" ? (
                      <div style={{ display: "grid", justifyItems: "center" }}>
                        <div className="text dashboard-blank">No Recipes</div>
                        <Link
                          to="/upload/manual"
                          className="button dashboard-create-button"
                          style={{ textDecoration: "none" }}
                        >
                          Create Recipe
                        </Link>
                      </div>
                    ) : (
                      this.state.family_recipes.slice(0, 7).map((item) => {
                        return (
                          <DashCard
                            key={item.RECIPE_ID}
                            identifier={item.RECIPE_IDENTIFIER}
                            image={item.PHOTO_NAME}
                            recipe_name={item.RECIPE_NAME}
                            description={item.DESCRIPTION}
                            creator={item.CREATOR_USERNAME}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
                {this.state.family_recipes === "BadRecipe" ? (
                  false
                ) : (
                  <Link
                    to="/browse/family"
                    className="button dashboard-view-button"
                    style={{ textDecoration: "none" }}
                  >
                    View More
                  </Link>
                )}
              </div>
              <div className="dashboard-section">
                <div className="dashboard-section-container">
                  <div className="dashboard-title-wrapper">
                    <div className="dashboard-title">My Recipes</div>
                  </div>
                  <div className="dashboard-card-container">
                    {this.state.my_recipes === false ? (
                      <div style={{ display: "grid", justifyItems: "center" }}>
                        <div className="text dashboard-blank">No Recipes</div>
                        <Link
                          to="/upload/manual"
                          className="button dashboard-create-button"
                          style={{ textDecoration: "none" }}
                        >
                          Create Recipe
                        </Link>
                      </div>
                    ) : (
                      this.state.my_recipes.slice(0, 7).map((item) => {
                        return (
                          <DashCard
                            key={item.RECIPE_ID}
                            identifier={item.RECIPE_IDENTIFIER}
                            image={item.PHOTO_NAME}
                            recipe_name={item.RECIPE_NAME}
                            description={item.DESCRIPTION}
                            creator={item.CREATOR_USERNAME}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
                {this.state.my_recipes === false ? (
                  false
                ) : (
                  <Link
                    to="/myrecipes"
                    className="button dashboard-view-button"
                    style={{ textDecoration: "none" }}
                  >
                    View More
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default DashboardPage;
