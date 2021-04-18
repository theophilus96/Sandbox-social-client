import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./post/Comments";
import CommentForm from "./post/CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// material ui
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    // maxWidth: 200,
    // height: 200,
    // borderRadius: "50%",
    // objectFit: "cover",
    borderColor: "#768bff",
    border: "2px solid #768bff",
    "@media (min-width: 415px)": {
      width: 150,
      height: 150,
      borderColor: "#768bff",
      border: "2px solid #768bff",
    },
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    marginLeft: 'auto',
    "@media (min-width: 415px)": {
    position: "absolute",
    left: "90%",
    },
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  username: {
    color: "primary",
  },
  date: {
    color: "secondary",
  },
});

export class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, postId } = this.props;
    const newPath = `/users/${userHandle}/scream/${postId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      scream: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={1}>
        <Grid item sm={4}>
          {/* <img src={userImage} className={classes.profileImage} /> */}
            <Avatar
              src={userImage}
              className={classes.profileImage}
              component={Link}
              to={`/users/${userHandle}`}
              alt="Profile"
            ></Avatar>
          
        </Grid>
        <Grid item sm={8}>
          <Link to={`/users/${userHandle}`} style={{ textDecoration: "none" }}>
            <h3 component={Link} className={classes.username}>
              @{userHandle}
            </h3>
          </Link>
          <hr className={classes.invisibleSeparator} />
          <h6 variant="body2" color="textSecondary" className={classes.date}>
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </h6>
          <hr className={classes.invisibleSeparator} />
          <h5 variabnt="body1">{body}</h5>
          <LikeButton postId={postId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand thread"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
