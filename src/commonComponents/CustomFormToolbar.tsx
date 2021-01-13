import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {SaveButton, Toolbar} from "react-admin";
import DeleteButtonWithConfirmation from "./DeleteButtonWithConfirmation";

const useStyles = makeStyles({
    toolBar: {display: "flex", justifyContent: "space-between"}
});

const CustomFormToolbar = (props) => {
    const {invalid, ...rest} = props;
    const isEdit = Object.keys(props.record).length > 0;
    const classes = useStyles();
    return (
        <Toolbar {...props} className={classes.toolBar}>
            <SaveButton disabled={invalid} {...rest} />
            {isEdit && <DeleteButtonWithConfirmation />}
        </Toolbar>
    );
};

export default CustomFormToolbar;
