import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/Scream";
import ScreamSkeleton from "../util/ScreamSkeleton";

export class home extends Component {
  state = {
    screams: null,
  };
  componentDidMount() {
    axios
      .get("/screams")
      .then((res) => {
        console.log(res.data);
        this.setState({
          screams: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { screams, loading } = this.state;

    let recentScreamsMarkup = screams ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {/* <Profile /> */}
          <h1>profile</h1>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default home;
