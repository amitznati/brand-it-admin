import React from 'react';
import {Grid, TextField, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    section: { marginTop: '2rem' },
});

const DynamicTextOptionsFields = ({dynamicTextOptions, dynamicTextValues, setDynamicTextValues}) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid className={classes.section} item xs={12}><Typography component="h6">Logo Text values</Typography></Grid>
            {['Logo - Brand Name', 'Logo - Slogan'].map((textOption) => {
                return (
                    <Grid key={textOption} item md={2} sm={4} xs={6}>
                        <TextField
                            label={textOption}
                            value={dynamicTextValues[textOption]}
                            onChange={(e) =>
                                setDynamicTextValues({...dynamicTextValues, [textOption]: e.target.value})
                            }
                        />
                    </Grid>
                );
            })}
            <Grid className={classes.section} item xs={12}><Typography component="h6">Dynamic Text values</Typography></Grid>
            {dynamicTextOptions.map((textOption) => {
                return (
                    <Grid key={textOption} item md={2} sm={4} xs={6}>
                        <TextField
                            label={textOption}
                            value={dynamicTextValues[textOption]}
                            onChange={(e) =>
                                setDynamicTextValues({...dynamicTextValues, [textOption]: e.target.value})
                            }
                        />
                    </Grid>
                );
            })}
        </Grid>
    )
};

export default DynamicTextOptionsFields;
