import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Alert from '@material-ui/lab/Alert';
// import CheckIcon from '@material-ui/icons/Check';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function IconAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}>
        Your order was submitted successfully
      </Alert> */}
      {/* <Alert variant="outlined" severity="success">
      Your order was submitted successfully
      </Alert> */}
    </div>
  );
}