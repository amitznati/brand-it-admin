import React from "react";
import {Card, CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import LocalOfferIcon from "@material-ui/icons/LocalOfferOutlined";
import {FilterList, FilterListItem, FilterLiveSearch, useGetList} from "react-admin";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            width: "15em",
            marginRight: "1em",
            overflow: "initial"
        },
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
}));

const Aside = () => {
    const {data, ids} = useGetList(
        "Category",
        {page: 1, perPage: 100},
        {field: "name", order: "ASC"}
    );
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <FilterLiveSearch />
                <FilterList label="Categories" icon={<LocalOfferIcon />}>
                    {ids.map((id) => (
                        <FilterListItem
                            label={data[id].name}
                            key={data[id].id}
                            value={{category: data[id].id}}
                        />
                    ))}
                </FilterList>
            </CardContent>
        </Card>
    );
};

export default Aside;
