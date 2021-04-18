import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Icons
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
//redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

const styles = {
  favourite:{
    paddingLeft: 0,
    paddingRight: 10,
  }
}

export class LikeButton extends Component {

  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.postId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.postId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.postId);
  };
  render() {
    const {classes} = this.props;
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like" tipClassName={classes.favourite}>
          <ThumbUpAltOutlinedIcon color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="Undo like" onClick={this.unlikeScream} tipClassName={classes.favourite}>
        <ThumbUpAltIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream} tipClassName={classes.favourite}>
        <ThumbUpAltOutlinedIcon color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton));
