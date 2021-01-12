import React from 'react';
import { FormControl } from '@material-ui/core';
import { useInput, useTranslate } from 'react-admin';
import {makeStyles} from "@material-ui/core/styles";
import { SketchPicker } from 'react-color';
import TextField from "@material-ui/core/TextField";
import {propertyByString} from "../utils";
const useStyles = makeStyles({
    root: { width: '25rem', display: 'inline-flex', minHeight: '20rem' },
    errorText: {
        color: 'red'
    },
    inputLabel: {
        marginBottom: '1rem',
        fontFamily: "Roboto,  Helvetica, Arial, sans-serif"
    }
});
export const ColorInput = props => {
    const translate = useTranslate();
    const {record, source} = props;
    const [value, setValue] = React.useState(propertyByString(record, source));
    const classes = useStyles();
    const inputProps = useInput(props);
    const {
        input: { name, onChange },
        meta: { error },
        isRequired
    } = inputProps;
    const onColorValueChange = color => {
        const v = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
        setValue(v);
        onChange && onChange(v);
    };
    React.useEffect(() => onChange(value), [value, onChange]);
    return (
        <FormControl className={classes.root}>
            <p className={classes.inputLabel}>
                {props.label}
            </p>
            <TextField
                name={name}
                error={!!(error)}
                helperText={error && translate(error)}
                required={isRequired}
                value={value || ''}
            />
            <div style={{height: '5rem', width: '5rem', borderRadius: '50%', backgroundColor: value}} >&nbsp;</div>
            <SketchPicker
                color={ value }
                onChangeComplete={ onColorValueChange }
            />
        </FormControl>

    );
};
