import React from "react";
import {Box, useMediaQuery} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import {Filter, ListBase, Pagination, SearchInput, Title, useListContext} from "react-admin";

import GridList from "./GridList";
import Aside from "./Aside";
import ListActions from "../commonComponents/ListActions";

export const ProductFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const ProductList = (props) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <ListBase
            filters={isSmall ? <ProductFilter /> : null}
            perPage={20}
            sort={{field: "name", order: "ASC"}}
            {...props}
        >
            <ProductListView isSmall={isSmall} />
        </ListBase>
    );
};

const ProductListView = ({isSmall}) => {
    const {defaultTitle} = useListContext();
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <ListActions />
            {isSmall && (
                <Box m={1}>
                    <ProductFilter context="form" />
                </Box>
            )}
            <Box display="flex">
                <Aside />
                <Box width={isSmall ? "auto" : "calc(100% - 16em)"}>
                    <GridList />
                    <Pagination rowsPerPageOptions={[10, 20, 40]} />
                </Box>
            </Box>
        </>
    );
};
export default ProductList;
