import {
    CreateButton,
    ExportButton,
    sanitizeListRestProps,
    TopToolbar,
    useListContext
} from "react-admin";
import {cloneElement} from "react";
import * as React from "react";

const ListActions = (props) => {
    const {className, exporter, filters, maxResults, ...rest} = props;
    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        basePath,
        showFilter,
        total
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters &&
                cloneElement(filters, {
                    resource,
                    showFilter,
                    displayedFilters,
                    filterValues,
                    context: "button"
                })}
            <CreateButton basePath={basePath} />
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
        </TopToolbar>
    );
};

export default ListActions;
