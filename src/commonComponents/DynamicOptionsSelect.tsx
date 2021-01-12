import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {useInput, useGetList} from "react-admin";

const filter = createFilterOptions<string>();

export default function DynamicOptionsSelect({placeholder, label, ...props}) {
    const [value, setValue] = React.useState(props.record?.dynamicTextOptions || [])
    const [options, setOptions] = React.useState<Array<string>>([]);
    const [newOptions, setNewOptions] = React.useState<Array<string>>([]);
    useGetList(
        'Product',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' },
        undefined,
        {
            onSuccess: ({ data }) => {
                const ops: Array<string> = [];
                data.forEach(prod => prod.dynamicTextOptions.forEach(dyn => {
                    if (!ops.includes(dyn)) ops.push(dyn);
                }));
                setOptions(ops);
            },
            onFailure: (error) => console.error(`Error: ${error.message}`),
        }
    );

    const {
        input: { name, onChange },
    } = useInput(props);

    return (
        <Autocomplete
            multiple
            options={options.concat(newOptions)}
            getOptionLabel={(option) => option}
            value={value}
            renderInput={(params) => {
                return (
                <TextField
                    {...params}
                    variant="standard"
                    label={label}
                    placeholder={placeholder}
                    name={name}
                />
            )}}
            onChange={(event, newValue) => {
                onChange(newValue);
                setValue(newValue);
                const newAttr = newValue.find(v => !options.includes(v));
                const removeAttr = newOptions.find(v => newOptions.includes(v));
                if (newAttr) setNewOptions([...newOptions, newAttr]);
                else if (removeAttr) {
                    setNewOptions(newOptions.filter(v => v !== removeAttr));
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push(params.inputValue);
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
        />
    );
}
