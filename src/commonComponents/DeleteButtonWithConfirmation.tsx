import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import ActionDelete from "@material-ui/icons/Delete";
import classnames from "classnames";
import IconCancel from "@material-ui/icons/Cancel";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";

import {DeleteButton, Button} from "react-admin";

const styles = (theme) => ({
    deleteButton: {
        color: theme.palette.error.main,
        "&:hover": {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            "@media (hover: none)": {
                backgroundColor: "transparent"
            }
        }
    }
});

const DeleteButtonWithConfirmation = (props) => {
    const [showDialog, setShowDialog] = React.useState(false);
    const {label = "ra.action.delete", classes = {}, className} = props;

    const handleClick = () => setShowDialog(true);

    const handleCloseClick = () => setShowDialog(false);

    return (
        <Fragment>
            <Button
                onClick={handleClick}
                label={label}
                className={classnames("ra-delete-button", classes.deleteButton, className)}
            >
                <ActionDelete />
            </Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
                aria-label="Are you sure?"
            >
                <DialogTitle>Are you sure you want to delete this entity?</DialogTitle>
                <DialogContent>
                    <div>Your actions will be logged.</div>
                </DialogContent>
                <DialogActions>
                    <DeleteButton
                        label={label}
                        className={classnames("ra-delete-button", classes.deleteButton, className)}
                        {...props}
                    >
                        <ActionDelete />
                    </DeleteButton>
                    <Button label="ra.action.cancel" onClick={handleCloseClick}>
                        <IconCancel />
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default withStyles(styles)(DeleteButtonWithConfirmation);
