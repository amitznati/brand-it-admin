import React from "react";
import {useListContext} from "react-admin";
import {Grid} from "@material-ui/core";
import ProductCard from "./ProductCard";

const LoadedGridList = () => {
    const {ids, data} = useListContext();

    if (!ids || !data) return null;

    return (
        <Grid container>
            {ids.map((id) => {
                const product = data[id];
                return (
                    <Grid item xs={12} sm={12} md={6} lg={3} key={id}>
                        <ProductCard product={product} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

const GridList = () => {
    const {loaded} = useListContext();
    return loaded ? <LoadedGridList /> : <div>Loading...</div>;
};

export default GridList;
