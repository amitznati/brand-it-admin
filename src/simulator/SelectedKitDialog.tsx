import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid} from "@material-ui/core";
import {TemplatePreviewForPreview, CoreSlider} from 'template-editor';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            alignItems: 'center'
        },
    }),
);

export default function SelectedKitDialog({open, onClose, kit, selectedTheme, dynamicTextValues, selectedLogo}) {
    const classes = useStyles();
    const [scale, setScale] = React.useState(0.15);
    return (
        <Dialog
            fullWidth
            maxWidth="xl"
            open={open}
            onClose={onClose}
            aria-labelledby="max-width-Selected-kit-dialog"
        >
            <DialogTitle id="max-width-Selected-kit-dialog">Selected Kit</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change the scale of the templates
                </DialogContentText>
                <CoreSlider
                    label='Scale'
                    value={scale}
                    max={3}
                    step={0.01}
                    handleSliderChange={(v) =>
                        setScale(Number(Number(v).toFixed(2)))
                    }
                />
                <Grid container className={classes.gridContainer}>
                    {kit.map(({product, template}) => {
                        return (
                            <Grid item xs={6} key={[product.id, template.id].join('-')}>
                                <TemplatePreviewForPreview
                                    {...{
                                        selectedTheme,
                                        product,
                                        dynamicTextValues,
                                        selectedLogo,
                                        scale
                                    }}
                                    template={template.template}
                                    isActiveTextValues
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
