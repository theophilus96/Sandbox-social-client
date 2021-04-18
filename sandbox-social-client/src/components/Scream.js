import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import LikeButton from "./LikeButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
// MUI Stuff
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Badge from "@material-ui/core/Badge";
// media query

//Icons
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";

const styles = {
  root: {},
  card: {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
    minWidth: 345,
    "@media (min-width: 415px)": {
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 10,
      position: "relative",
      display: "flex",
    },
  },
  image: {
    minWidth: 200,
  },
  content: {
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 25,
    objectFit: "cover",
  },
  avatar: {
    borderColor: "#768bff",
    border: "2px solid #768bff",
    "@media (min-width: 415px)": {
      width: 150,
      height: 150,
      borderColor: "#768bff",
      border: "2px solid #768bff",
    },
  },
  header: {
    marginRight: 0,
    paddingRight: 0,
  },
  cardActions: {
    disableSpacing: true,
    paddingLeft: 0,
  },
  favourite: {
    // paddingLeft: 0,
  },
  ScreamDialog: {
    // paddingRight: 25,
    // paddingTop: 0,
    // paddingBottom: 25,
    // paddingLeft: 0,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  username: {
    color: "primary",
  },
  date: {
    color: "secondary",
  },
  actions: {
    "@media (min-width: 415px)": {
      display: "block",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  delete: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};

// const mediaQuery = window.matchMedia("(min-width: 415px)");

// function handleTabletChange(e) {
//   // Check if the media query is true
//   if (e.matches) {
//     // Then log the following message to the console
//     console.log("Media Query Matched!    415px");
//   }
// }
// // Register event listener
// mediaQuery.addListener(handleTabletChange);

// // Initial check
// handleTabletChange(mediaQuery);

class Scream extends Component {
  constructor(props) {
    super(props);
    this.state = { matches: window.matchMedia("(min-width: 415px)").matches };
  }

  componentDidMount() {
    const handler = (e) =>
      this.setState({ matches: e.matches });
    window.matchMedia("(min-width: 415px)").addListener(handler);
  }

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream postId={postId} />
      ) : null;
    return (
      <Card className={classes.card} direction={{ xs: "column", sm: "row" }}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar
              src={userImage}
              className={classes.avatar}
              component={Link}
              to={`/users/${userHandle}`}
            ></Avatar>
          }
          // action={<IconButton aria-label="delete">{deleteButton}</IconButton>}

          
          action={this.state.matches ? "" : deleteButton}

          
          title={`${this.state.matches ? "" : userHandle}`}
          subheader={`${this.state.matches ? "" : dayjs(createdAt).fromNow()}`}
        />
        <CardContent className={classes.content}>
          {this.state.matches ? (
            <Link
              to={`/users/${userHandle}`}
              style={{ textDecoration: "none" }}
            >
              <h3 component={Link} color="primary" className={classes.username}>
                {userHandle}
              </h3>
            </Link>
          ) : (
            ""
          )}

          {this.state.matches ? (
            <div aria-label="delete" className={classes.delete}>
              {deleteButton}{" "}
            </div>
          ) : (
            ""
          )}

          {this.state.matches ? (
            <h6 variant="body2" color="textSecondary" className={classes.date}>
              {dayjs(createdAt).fromNow()}
            </h6>
          ) : (
            ""
          )}

          <h5>{body}</h5>

          <CardActions disableSpacing className={classes.actions}>
            <Badge
              badgeContent={likeCount}
              color="secondary"
              max={999}
              overlap="circle"
            >
              <LikeButton postId={postId} />
            </Badge>
            <Badge
              badgeContent={commentCount}
              color="secondary"
              max={999}
              overlap="circle"
            >
              <MyButton tip="comments" tipClassName={classes.favourite}>
                <ChatIcon color="primary" />
              </MyButton>{" "}
            </Badge>

            {/* <span>{likeCount} Likes &nbsp;&nbsp;</span> */}

            {/* <span>{commentCount}comments</span> */}
            <ScreamDialog
              postId={postId}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
              tipClassName={classes.ScreamDialog}
            />
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(withStyles(styles)(Scream));
