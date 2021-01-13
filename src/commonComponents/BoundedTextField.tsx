import React from "react";
import TextField from "@material-ui/core/TextField";
import {useInput} from "react-admin";

export const BoundedTextField = (props) => {
    const [value, setValue] = React.useState(props.record?.name);
    const {
        input: {name, onChange},
        meta: {touched, error},
        isRequired
    } = useInput(props);
    const onValueChange = (e) => {
        setValue(e.target.value);
        onChange && onChange(e);
    };
    return (
        <TextField
            name={name}
            label={props.label}
            onChange={onValueChange}
            error={!!error}
            helperText={error}
            required={isRequired}
            className={props.className}
            value={value}
        />
    );
};
