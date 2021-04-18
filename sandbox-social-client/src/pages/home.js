import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Scream from "../components/Scream";
import ScreamSkeleton from "../util/ScreamSkeleton";
import Profile from "../components/Profile";

//Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const styles = {
  root: { minWidth: 345 },
  item1: {
    order: 2,
    "@media (min-width: 600px)": {
      order: 1,
    },
  },
  item2: {
    order: 1,
    "@media (min-width: 600px)": {
      order: 2,
    },
  },
};

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;

    const { classes } = this.props;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.postId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={1} className={classes.root}>
        <Grid item sm={8} xs={12} className={classes.item1}>
          {recentScreamsMarkup}
        </Grid>

        <Grid item sm={4} xs={12} className={classes.item2}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(
  withStyles(styles)(home)
);
