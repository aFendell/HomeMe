import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconAlerts from './IconAlerts.jsx'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({loggedInUser}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title"> </h2>
      <p id="simple-modal-description">
        {loggedInUser && <span>Your order was submitted successfully!</span>}
        {!loggedInUser && <span>Please Login first</span>}
      </p>
      <IconAlerts />
    </div>
  );

  return (
    <div>
      <button className="btn-btn-save" onClick={toggleOpen}>
        <h2>Reserve</h2>
      </button>
      <Modal
        open={open}
        onClose={toggleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >

        {body}
      </Modal>
    </div>
  );
}