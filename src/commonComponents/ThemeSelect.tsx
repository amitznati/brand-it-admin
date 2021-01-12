import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Card, CardActionArea} from "@material-ui/core";
import {useGetList} from 'react-admin';
import {FontLoader} from 'template-editor';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        overflowX: 'auto',
        height: '15rem',
        margin: '2rem 0'
    },
    themeWrap: {
        width: '15rem',
        margin: '1rem',
    },
    themeActionArea: {
        backgroundSize: "cover",
        textAlign: "center",
        padding: '.5rem',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        height: '100%'
    },
    themeName: {
        fontSize: 30
    },
    primaryFont: {
        fontSize: 20
    },
    secondaryFont: {
        fontSize: 16
    },
    tertiaryFont: {
        fontSize: 16
    },
    colorsWrap: {

    },
    paletteColor: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem',
        height: '2rem',
        width: '2rem',
        color: '#fff',
        borderRadius: '50%',
        fontSize: 10
    },
    checkCircleIcon: {
        position: 'absolute',
        right: '1rem'
    }
});

export const getFontDataFromTheme = (themes) => {
    const googleFonts: Array<string> = [];
    const uploadedFonts: Array<{fontFamily: string, fontUrl: string}> = [];
    const fontProvider: Array<string> = [];
    themes.forEach((theme) => {
        ['primary', 'secondary', 'tertiary'].forEach((fontType) => {
            const {fontFamily, fontUrl, fontProvider} = theme.fontFamilies[fontType];
            if (fontProvider === 'google' && !googleFonts.includes(`${fontFamily}:400n`)) {
                googleFonts.push(
                    `${fontFamily}:400n`
                );
            } else if (!uploadedFonts.find(f => f.fontUrl === fontUrl && f.fontFamily === fontFamily) && fontProvider === 'uploaded') {
                uploadedFonts.push({
                    fontFamily,
                    fontUrl
                });
            }
        });
    });
    if (googleFonts.length) fontProvider.push('google');
    if (uploadedFonts.length) fontProvider.push('custom');
    return {
        fontProvider,
        googleFonts,
        uploadedFonts
    }
}

export default function ThemeSelect({onSelect, selectedTheme}) {
    const classes = useStyles();
    const { data, ids, loading } = useGetList(
        'Theme',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    const onSelectTheme = (theme) => {
        if (theme.id === selectedTheme?.id) {
            onSelect(null);
        } else {
            onSelect(theme);
        }
    };
    if (loading) return <div>Loading...</div>;
    const themes = ids.map(id => data[id]);
    const { fontProvider, uploadedFonts, googleFonts } = getFontDataFromTheme(themes);
    return (
        <div className={classes.root}>
            {fontProvider.length && (
                <FontLoader
                    fontProvider={fontProvider}
                    fontFamilies={googleFonts}
                    customFontFamilies={uploadedFonts}
                />
            )}
            Select Theme
            {themes.map((theme) => {
                const selectedThemeStyle = {margin: '1rem'};
                const isSelected = selectedTheme && selectedTheme.id === theme.id;
                if (isSelected) {
                    selectedThemeStyle.margin = '0';
                }
                return (
                    <Card
                        key={theme.id}
                        className={classes.themeWrap}
                        style={{
                            ...selectedThemeStyle
                        }}
                    >
                        <CardActionArea
                            onClick={() => onSelectTheme(theme)}
                            className={classes.themeActionArea}
                            style={{
                                backgroundImage: `url(${theme.images.bg})`,
                            }}
                        >
                            {isSelected && (
                                <CheckCircleIcon
                                    fontSize="large"
                                    color="primary"
                                    className={classes.checkCircleIcon}
                                />
                            )}
                            <div>
                                {theme.fontFamilies.primary &&
                                    <div
                                        className={classes.themeName}
                                        style={{fontFamily: theme.fontFamilies.primary.fontFamily}}>
                                        {theme.name}
                                        <div className={classes.primaryFont}>
                                            primary font: {theme.fontFamilies.primary.fontFamily}
                                        </div>
                                    </div>
                                }
                                {theme.fontFamilies.secondary &&
                                    <div
                                        className={classes.secondaryFont}
                                        style={{fontFamily: theme.fontFamilies.secondary.fontFamily}}>
                                        secondary font: {theme.fontFamilies.secondary.fontFamily}
                                    </div>
                                }
                                {theme.fontFamilies.tertiary &&
                                    <div
                                        className={classes.tertiaryFont}
                                        style={{fontFamily: theme.fontFamilies.tertiary.fontFamily}}>
                                        tertiary font: {theme.fontFamilies.tertiary.fontFamily}
                                    </div>
                                }
                            </div>
                            <div className={classes.colorsWrap}>
                                <div style={{backgroundColor: theme.palette.primary}} className={classes.paletteColor} >Primary</div>
                                <div style={{backgroundColor: theme.palette.secondary}} className={classes.paletteColor} >Secondary</div>
                                <div style={{backgroundColor: theme.palette.tertiary}} className={classes.paletteColor} >Tertiary</div>
                            </div>
                        </CardActionArea>

                    </Card>
                );
            })}
        </div>
    )
}
