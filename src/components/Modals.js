import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const Modals = ({ children, open, onClose, className, ...rest }) => {
    const classes = useStyles();
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {children}
            </Modal>
        </div>
    );
};

export default Modals;
