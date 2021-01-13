import * as React from "react";
import {useQuery, Loading, Error, useNotify, useMutation} from "react-admin";
import {Grid, Button, CardActions, Card, CardContent, CardActionArea} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import {TemplatePreviewForPreview} from "template-editor";

const DeleteTemplateButton = (props) => {
    const {
        product,
        template: {id},
        refresh
    } = props;
    const notify = useNotify();
    const [approve] = useMutation(
        {
            type: "deleteTemplate",
            resource: "Product",
            payload: {id, productId: product.id}
        },
        {
            onSuccess: () => {
                notify("Template Deleted", "info", {}, true);
                refresh();
            }
        }
    );
    return (
        <Button onClick={approve} style={{color: "red"}} size="small">
            <DeleteForeverIcon />
        </Button>
    );
};

const TemplatesGrid = (props) => {
    const {product, selectedTheme, onEditTemplate, refresh} = props;
    const {templates} = product;
    if (!templates || !templates.length) {
        return <div />;
    }
    const onEdit = (template) => {
        onEditTemplate(template);
        window.scrollTo(0, 0);
    };
    return (
        <Grid container spacing={2}>
            {templates.map((template) => {
                return (
                    <Grid key={template.id} item xs={12} sm={6} md={3}>
                        <Card>
                            <CardActionArea onClick={() => onEdit(template)}>
                                <CardContent>
                                    <TemplatePreviewForPreview
                                        selectedTheme={selectedTheme}
                                        scale={0.4}
                                        product={product}
                                        template={JSON.parse(template.template)}
                                    />
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        onEdit(template);
                                    }}
                                >
                                    <EditIcon />
                                </Button>
                                <DeleteTemplateButton {...{product, template, refresh}} />
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

const ProductTemplatesPreview = (props) => {
    const {record, selectedTheme, onEditTemplate, refresh} = props;
    const [product, setProduct] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    useQuery(
        {
            type: "getProductsWithTemplates",
            resource: "Product",
            payload: {ids: [record.id]}
        },
        {
            onSuccess: ({data}) => {
                setProduct(data[0]);
                setLoading(false);
                setError(null);
            },
            onFailure: (err) => {
                setError(err);
                setLoading(false);
            }
        }
    );
    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    return <TemplatesGrid {...{product, selectedTheme, onEditTemplate, refresh}} />;
};

export default ProductTemplatesPreview;
