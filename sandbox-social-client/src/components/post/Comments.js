import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
  ...theme.spreadThis,
  commentImage: {
    // maxWidth: "100%",
    // height: 100,
    // objectFit: "cover",
    // borderRadius: "50%",

    borderColor: "#768bff",
    border: "2px solid #768bff",
    "@media (min-width: 415px)": {
      width: 150,
      height: 150,
      borderColor: "#768bff",
      border: "2px solid #768bff",
    },
  },
  commentData: {
    marginLeft: 10,
    "@media (min-width: 415px)": {
      marginLeft: 40,
    },
  },
  username: {
    color: "primary",
  },
  date: {
    color: "secondary",
  },
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;

    return (
      <Grid container spacing={1}>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={3}>
                    {/* <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    /> */}
                    <Avatar
                      src={userImage}
                      className={classes.commentImage}
                      component={Link}
                      to={`/users/${userHandle}`}
                      alt="comment"
                    ></Avatar>
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Link
                        to={`/users/${userHandle}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h3
                          component={Link}
                          color="primary"
                          className={classes.username}
                        >
                          {userHandle}
                        </h3>
                      </Link>

                      <h6
                        variant="body2"
                        color="textSecondary"
                        className={classes.date}
                      >
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </h6>
                      <hr className={classes.invisibleSeparator} />
                      <h5 variant="body1">{body}</h5>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
