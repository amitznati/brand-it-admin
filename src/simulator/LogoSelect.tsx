import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActionArea} from "@material-ui/core";
import {useGetList} from "react-admin";
import {TemplatePreviewForPreview} from "template-editor";
import {logoProduct} from "../logo/editCreate";

const useStyles = makeStyles({
    root: {
        display: "flex",
        overflowX: "auto",
        height: "15rem",
        margin: "2rem 0"
    },
    logoWrap: {
        width: "15rem",
        margin: "1rem"
    },
    themeActionArea: {
        backgroundSize: "cover",
        textAlign: "center",
        padding: ".5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        height: "100%"
    }
});

export default function LogoSelect({onSelect, selectedLogo}) {
    const classes = useStyles();
    const {data, ids, loading} = useGetList(
        "Logo",
        {page: 1, perPage: 100},
        {field: "name", order: "ASC"}
    );
    const onSelectTheme = (logo) => {
        if (logo.id === selectedLogo?.id) {
            onSelect(null);
        } else {
            onSelect({
                ...logo,
                template: JSON.parse(logo.template)
            });
        }
    };
    if (loading) return <div>Loading...</div>;
    const logos = ids.map((id) => data[id]);
    return (
        <div className={classes.root}>
            Select Logo
            {logos.map((logo) => {
                const selectedLogoStyle = {margin: "1rem"};
                if (selectedLogo && selectedLogo.id === logo.id) {
                    selectedLogoStyle.margin = "0";
                }
                return (
                    <Card
                        key={logo.id}
                        className={classes.logoWrap}
                        style={{
                            ...selectedLogoStyle
                        }}
                    >
                        <CardActionArea onClick={() => onSelectTheme(logo)}>
                            <TemplatePreviewForPreview
                                scale={0.5}
                                product={logoProduct}
                                template={JSON.parse(logo.template)}
                            />
                        </CardActionArea>
                    </Card>
                );
            })}
        </div>
    );
}
