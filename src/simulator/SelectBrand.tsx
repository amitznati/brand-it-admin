import React from "react";
import {Grid, Typography, Card, CardActionArea} from "@material-ui/core";
import DynamicTextOptionsFields from "./DynamicTextOptionsFields";
import {TemplatePreviewForPreview} from "template-editor";
import {Loading, useQueryWithStore} from "react-admin";
import ThemeSelect from "../commonComponents/ThemeSelect";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import LogoSelect from "./LogoSelect";
import SelectedKitDialog from "./SelectedKitDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(2)
        }
    })
);

export default function SelectBrand({selectedCategory, selectedLogo: preSelectedLogo}) {
    const [dynamicTextOptions, setDynamicTextOptions] = React.useState<Array<string>>([]);
    const [selectedTheme, setSelectedTheme] = React.useState();
    const [maxTemplatesLength, setMaxTemplatesLength] = React.useState(0);
    const [products, setProducts] = React.useState<Array<any>>([]);
    const [dynamicTextValues, setDynamicTextValues] = React.useState({});
    const [selectedLogo, setSelectedLogo] = React.useState(preSelectedLogo);
    const [selectedKit, setSelectedKit] = React.useState<Array<{product: any; template: any}>>([]);
    const classes = useStyles();
    const {loading} = useQueryWithStore(
        {
            type: "getProductsWithTemplates",
            resource: "Products",
            payload: {categories: [selectedCategory]}
        },
        {
            onSuccess: ({data}) => {
                const dynOptions: Array<string> = [];
                const dynValues = {
                    "Logo - Brand Name": "Brand Name",
                    "Logo - Slogan": "some slogan for logo"
                };
                let maxTemplatesSize = 0;
                data.forEach((product) => {
                    if (product.categories.includes(selectedCategory)) {
                        maxTemplatesSize = Math.max(maxTemplatesSize, product.templates.length);
                        if (product.dynamicTextOptions && product.dynamicTextOptions.length) {
                            product.dynamicTextOptions.forEach((textOption) => {
                                if (!dynOptions.includes(textOption)) {
                                    dynOptions.push(textOption);
                                    dynValues[textOption] = textOption;
                                }
                            });
                        }
                    }
                });
                setDynamicTextOptions(dynOptions);
                setDynamicTextValues(dynValues);
                setProducts(data);
                setMaxTemplatesLength(maxTemplatesSize);
            }
        }
    );
    if (loading) return <Loading />;
    const renderProducts = () => {
        const kits: Array<Array<{product: any; template: any}>> = [];
        for (let i = 0; i < maxTemplatesLength; i++) {
            const productTemplate: Array<{product: any; template: any}> = [];
            products.forEach((product) => {
                if (product.templates[i]) {
                    productTemplate.push({
                        product,
                        template: {
                            template: JSON.parse(product.templates[i].template),
                            id: product.templates[i].id
                        }
                    });
                }
            });
            kits.push(productTemplate);
        }
        return kits.map((productTemplate, index) => {
            return (
                <Grid item xs={6} key={`kit-${index}`}>
                    <Card className={classes.card}>
                        <CardActionArea onClick={() => setSelectedKit(productTemplate)}>
                            <Grid container alignItems="center">
                                {productTemplate.map(({product, template}) => {
                                    return (
                                        <Grid item xs={3} key={[product.id, template.id].join("-")}>
                                            <TemplatePreviewForPreview
                                                {...{
                                                    selectedTheme,
                                                    product,
                                                    dynamicTextValues,
                                                    selectedLogo
                                                }}
                                                scale={0.15}
                                                template={template.template}
                                                isActiveTextValues
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
        });
    };
    return (
        <Grid container>
            <SelectedKitDialog
                selectedLogo={selectedLogo}
                dynamicTextValues={dynamicTextValues}
                selectedTheme={selectedTheme}
                onClose={() => setSelectedKit([])}
                open={selectedKit.length > 0}
                kit={selectedKit}
            />
            <Grid item xs={12}>
                <DynamicTextOptionsFields
                    dynamicTextOptions={dynamicTextOptions}
                    setDynamicTextValues={setDynamicTextValues}
                    dynamicTextValues={dynamicTextValues}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography component="h6">Theme Select</Typography>
            </Grid>
            <Grid item xs={12}>
                <ThemeSelect onSelect={setSelectedTheme} selectedTheme={selectedTheme} />
            </Grid>
            <Grid item xs={12}>
                <LogoSelect onSelect={setSelectedLogo} selectedLogo={selectedLogo} />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {renderProducts()}
                </Grid>
            </Grid>
        </Grid>
    );
}
