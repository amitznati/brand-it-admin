import React from 'react';
import withWidth from '@material-ui/core/withWidth';
import { useListContext } from 'react-admin';
import {Grid} from "@material-ui/core";
import LogoCard from "./LogoCard";
import LoadingGridList from "../commonComponents/LoadingList";


const LoadedGridList = () => {
    const { ids, data } = useListContext();

    if (!ids || !data) return null;

    return (
        <Grid container>
            {ids.map((id) => {
                const icon = data[id];
                return (
                    <Grid item sm={6} md={3} key={id}>
                        <LogoCard icon={icon} />
                    </Grid>
                )
            })}
        </Grid>
    );
};


const GridList = ({ width }) => {
    const { loaded } = useListContext();
    return loaded ? (
        <LoadedGridList/>
    ) : (
        <LoadingGridList width={width} />
    );
};

export default withWidth()(GridList);
