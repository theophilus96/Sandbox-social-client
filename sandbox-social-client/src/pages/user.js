import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
//skeletons
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
//redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
//test css
import "../components/css/libs.css";
import "../components/css/theme.css";

export class user extends Component {
  state = {
    profile: null,
    postIdParam: null,
  };
  componentDidMount() {
    // const handle = this.props.match.params.handle;
    // const postId = this.props.match.params.postId;

    const { handle } = this.props.match.params;
    const { postId } = this.props.match.params;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const { postIdParam } = this.state;

    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : !postIdParam ? (
      screams.map((scream) => <Scream key={scream.postId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.postId !== postIdParam)
          return <Scream key={scream.postId} scream={scream} />;
        else return <Scream key={scream.postId} scream={scream} openDialog />;
      })
    );

    return (
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}
user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
