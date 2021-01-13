import * as React from "react";
import {Pagination, Title, useListContext, ListBase} from "react-admin";

import ListActions from "../commonComponents/ListActions";
import GridList from "./GridList";

const LogoListView = () => {
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

const LogoList = (props) => {
    return (
        <ListBase perPage={20} sort={{field: "name", order: "ASC"}} {...props}>
            <LogoListView />
        </ListBase>
    );
};
export default LogoList;
