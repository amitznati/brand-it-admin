import * as React from "react";
import { Pagination, Title, useListContext, ListBase } from 'react-admin';
import ListActions from '../commonComponents/ListActions';
import {Grid} from "@material-ui/core";
import {UploadedImageCard} from 'template-editor';

const UploadedImagesListView = () => {
	const { defaultTitle, ids, data } = useListContext();
	if (!data) {
		return <div>Loading...</div>;
	}
	const tileData = ids.map((id) => data[id]);
	return (
		<>
			<Title defaultTitle={defaultTitle}/>
			<ListActions/>

			<Grid container>
				{tileData.map((tile) =>
					<Grid item xs={12} sm={6} md={3} key={tile.id}>
						<UploadedImageCard uploadedImage={tile} actionHref={`#/UploadedImage/${tile.id}`} />
					</Grid>
				)}
			</Grid>
			<Pagination rowsPerPageOptions={[10, 20, 40]}/>
		</>
	);
}

const ThemeList = props => {
	return (
		<ListBase
			perPage={20}
			sort={{ field: 'name', order: 'ASC' }}
			{...props}
		>
			<UploadedImagesListView />
		</ListBase>
	);
};
export default ThemeList;
