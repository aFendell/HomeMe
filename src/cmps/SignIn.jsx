import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'


import {
  login,
  logout,
} from '../store/actions/user.actions'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function _SignIn(props) {
  const classes = useStyles();

  const user = {}

  function handleChanges(ev) {
    user[ev.target.name] = ev.target.value
  }

  function doLogin(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    props.login(user)
    props.history.push('/')
  }

  return (
    <div className="krapppp">
      <Container component="main" maxWidth="xs" onSubmit={doLogin}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3" >
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              select
              variant="outlined"
              margin="normal"
              color="secondary"
              required
              fullWidth
              id="username"
              name="username"
              autoComplete="username"
              onChange={handleChanges}
              SelectProps={{ native: true }}
            >
              <option value="">Select User</option>
              <option value="aylam1">User1</option>
              <option value="assaf1">Host1</option>

            </TextField>
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
            </Button>
            
          </form>
        </div>

      </Container>
    </div >
  );
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
  }
}
const mapDispatchToProps = {
  login,
  logout,
}

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(_SignIn)