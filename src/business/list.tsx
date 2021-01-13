import * as React from "react";
import {List, Datagrid, TextField, EditButton} from "react-admin";
import ListActions from "../commonComponents/ListActions";
import LinkToRelatedReference from "../commonComponents/LinkToRelatedReference";
import category from "../category";
const BusinessList = (props) => (
    <List {...props} actions={<ListActions />}>
        <Datagrid>
            <TextField source="name" />
            <LinkToRelatedReference
                pathname="/Category"
                filterFunc={(record) => ({business: record.id})}
                icon={category.icon}
                label="Categories"
            />
            <EditButton />
        </Datagrid>
    </List>
);
export default BusinessList;
