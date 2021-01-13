import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useListContext} from "react-admin";
import {Grid, Card, CardContent, withWidth, CardActionArea} from "@material-ui/core";
import {FontLoader} from "template-editor";
import {getFontDataFromTheme} from "../commonComponents/ThemeSelect";
import LoadingGridList from "../commonComponents/LoadingList";

const useStyles = makeStyles(() => ({
    card: {
        margin: "1rem"
    },
    imageWrap: {
        display: "inline-flex",
        flexDirection: "column",
        margin: "1rem"
    },
    tileBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)"
    },
    image: {
        maxHeight: "4rem",
        maxWidth: "4rem"
    },
    title: {
        fontSize: "4rem"
    },
    paletteColor: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem",
        height: "4rem",
        width: "4rem",
        color: "#fff",
        borderRadius: "50%"
    },
    fontField: {
        fontSize: "2rem"
    }
}));

const imagesFields = [
    {label: "Background", src: "bg"},
    {label: "Frame", src: "frame"},
    {label: "Side-Left", src: "sideL"},
    {label: "Side-Right", src: "sideR"},
    {label: "Side-Top", src: "sideT"},
    {label: "Side-Bottom", src: "sideB"}
];

const fontFields = [
    {type: "primary", text: "Primary font example"},
    {type: "secondary", text: "Secondary font example"},
    {type: "tertiary", text: "Tertiary font example"}
];

const LoadedGridList = () => {
    const {ids, data /* basePath */} = useListContext();
    const classes = useStyles();
    if (!ids || !data) return null;
    const themes = ids.map((id) => data[id]);
    const {fontProvider, googleFonts, uploadedFonts} = getFontDataFromTheme(themes);
    return (
        <Grid container>
            {fontProvider.length && (
                <FontLoader
                    fontProvider={fontProvider}
                    fontFamilies={googleFonts}
                    customFontFamilies={uploadedFonts}
                />
            )}
            {themes.map((theme) => {
                const item = theme;
                return (
                    <Grid key={item.id} item sm={12} md={6}>
                        <Card className={classes.card}>
                            <CardActionArea href={`#/Theme/${item.id}`}>
                                <CardContent>
                                    <span
                                        style={{fontFamily: item.fontFamilies.primary.fontFamily}}
                                        className={classes.title}
                                    >
                                        {item.name}
                                    </span>
                                    <div>
                                        <p>Images</p>
                                        {imagesFields.map((field) => {
                                            return (
                                                <span key={field.src} className={classes.imageWrap}>
                                                    <span>{field.label}</span>
                                                    <img
                                                        src={item.images[field.src]}
                                                        alt={field.label}
                                                        className={classes.image}
                                                    />
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <div>
                                        <p>Palette</p>
                                        <div
                                            style={{backgroundColor: item.palette.primary}}
                                            className={classes.paletteColor}
                                        >
                                            Primary
                                        </div>
                                        <div
                                            style={{backgroundColor: item.palette.secondary}}
                                            className={classes.paletteColor}
                                        >
                                            Secondary
                                        </div>
                                        <div
                                            style={{backgroundColor: item.palette.tertiary}}
                                            className={classes.paletteColor}
                                        >
                                            Tertiary
                                        </div>
                                    </div>
                                    <div>
                                        <p>Fonts</p>
                                        {fontFields.map((font) => {
                                            return (
                                                <div
                                                    key={font.type}
                                                    style={{
                                                        fontFamily:
                                                            item.fontFamilies[font.type].fontFamily
                                                    }}
                                                    className={classes.fontField}
                                                >
                                                    {font.text}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

const GridList = ({width}) => {
    const {loaded} = useListContext();
    return loaded ? <LoadedGridList /> : <LoadingGridList width={width} />;
};

export default withWidth()(GridList);
