import React, { useContext, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/new sandbox logo.png";
import { Link } from "react-router-dom";
import { useForm } from '../util/hooks';


//Material ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
...theme
}));

function Login() {
  const classes = useStyles();

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="logo" className={classes.image}></img>
      </Grid>
    </Grid>
  );
}

export default Login;
