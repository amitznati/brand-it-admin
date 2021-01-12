import * as React from "react";
import {
	EditButton,
	List,
	Datagrid,
	TextField, Filter, SearchInput
} from 'react-admin';
import ListActions from '../commonComponents/ListActions';
import product from '../product';
import LinkToRelatedReference from "../commonComponents/LinkToRelatedReference";

export const CategoryFilter = props => (
	<Filter {...props}>
		<SearchInput source="name" alwaysOn />
	</Filter>
);
const CategoryList = (props) => (
	<List {...props} actions={<ListActions filters={<CategoryFilter />} />}>
		<Datagrid>
			<TextField source="name" />
			<TextField label="Business" source="business.name" />
			<LinkToRelatedReference
				pathname="/Product"
				filterFunc={(record) => ({categories: [record.id] })}
				icon={product.icon}
				label="Products"
			/>
			<EditButton />
		</Datagrid>
	</List>
);
export default CategoryList;
