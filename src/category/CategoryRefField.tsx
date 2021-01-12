import React from 'react';
import { Link } from 'react-router-dom';

const CategoryRefField = (props) => {
    const { record } = props;
    return record ? (
        <Link to={`Category/${record.id}`}>{record.name}</Link>
    ) : null;
}

CategoryRefField.defaultProps = {
    source: 'id',
    label: 'Name',
};

export default CategoryRefField;
