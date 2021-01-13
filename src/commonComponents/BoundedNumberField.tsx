import React from "react";
import {Input, FormControl, InputLabel} from "@material-ui/core";
import {useInput, useTranslate} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {propertyByString} from "../utils";

const useStyles = makeStyles({
    root: {width: "10rem", display: "inline-flex"},
    errorText: {
        color: "red"
    },
    inputLabel: {
        marginBottom: "1rem"
    }
});
export const BoundedNumberField = (props) => {
    const translate = useTranslate();
    const [value, setValue] = React.useState(propertyByString(props.record, props.source));
    const classes = useStyles();
    const inputProps = useInput(props);
    const {
        input: {name, onChange},
        meta: {touched, error},
        isRequired
    } = inputProps;
    const onValueChange = (e) => {
        const v = Number(e.target.value);
        setValue(v);
        onChange && onChange(v);
    };
    const id = `input-for-${name}`;
    return (
        <FormControl className={classes.root}>
            <InputLabel shrink htmlFor={id} className={classes.inputLabel}>
                {props.label}
            </InputLabel>
            <Input
                {...props.InputProps}
                id={id}
                name={name}
                onChange={onValueChange}
                error={!!(touched && error)}
                required={isRequired}
                value={value || value === 0 ? value : ""}
                type="number"
            />
            {error && !touched && <span className={classes.errorText}>{translate(error)}</span>}
        </FormControl>
    );
};
