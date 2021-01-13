import * as React from "react";
import {Pagination, Title, useListContext, ListBase} from "react-admin";

import ListActions from "../commonComponents/ListActions";
import GridList from "./GridList";

const ThemeListView = () => {
    const {defaultTitle} = useListContext();
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <ListActions />

            <GridList />
            <Pagination rowsPerPageOptions={[2, 4, 10]} />
        </>
    );
};

const ThemeList = (props) => {
    return (
        <ListBase perPage={4} sort={{field: "name", order: "ASC"}} {...props}>
            <ThemeListView />
        </ListBase>
    );
};
export default ThemeList;
