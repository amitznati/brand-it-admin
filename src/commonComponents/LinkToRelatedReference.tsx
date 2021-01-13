import * as React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {stringify} from "query-string";

const useStyles = makeStyles({
    icon: {paddingRight: "0.5em"},
    link: {
        display: "inline-flex",
        alignItems: "center"
    }
});

const LinkToRelatedReference = (props) => {
    const {record, pathname, filterFunc, icon: Icon, label} = props;
    const classes = useStyles();
    return record ? (
        <Button
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname,
                search: stringify({
                    filter: JSON.stringify(filterFunc(record))
                })
            }}
            className={classes.link}
        >
            <Icon className={classes.icon} />
            {label}
        </Button>
    ) : null;
};

export default LinkToRelatedReference;
