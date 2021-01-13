import * as React from "react";
import {Pagination, Title, useListContext, ListBase} from "react-admin";

import ListActions from "../commonComponents/ListActions";
import GridList from "./FontList";

const ThemeListView = () => {
    const {defaultTitle} = useListContext();
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <ListActions />

            <GridList />
            <Pagination rowsPerPageOptions={[10, 20, 40]} />
        </>
    );
};

const ThemeList = (props) => {
    return (
        <ListBase perPage={20} sort={{field: "name", order: "ASC"}} {...props}>
            <ThemeListView />
        </ListBase>
    );
};
export default ThemeList;
