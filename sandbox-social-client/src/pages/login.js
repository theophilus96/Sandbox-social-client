import React from "react";
import { Component } from "react"
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SandboxLogo from "../images/faviconlogo.png";
// MUI Stuff
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

// Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";


const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(14),
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    alignSelf: "center",
    justifyContent: "center",
    display: "flex",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ minHeight: "92vh" }}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar} src={SandboxLogo} alt="Sandbox">
              {/* <img src={SandboxLogo} alt="Sandbox" className={classes.image} /> */}
            </Avatar>

            <h1 className={classes.pageTitle}>Login</h1>
            <form
              noValidate
              onSubmit={this.handleSubmit}
              className={classes.form}
            >
              <TextField
                variant="standard"
                margin="normal"
                id="email"
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="standard"
                margin="normal"
                id="password"
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
                autoComplete="current-password"
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                dont have an account ? sign up <Link to="/signup">here</Link>
              </small>
            </form>
          </div>
          {/* <Box mt={8}>
          <Copyright />
        </Box> */}
        </Grid>
      </Container>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
