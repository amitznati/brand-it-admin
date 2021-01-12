import React from 'react';

const CustomEditTitle = (props) => {
    return (<span>{props.resource}: {props.record.name} # {props.record.id}</span>);
};
export default CustomEditTitle;
