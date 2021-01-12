import * as React from 'react';
import { useCallback } from 'react';
import {
	SaveButton,
	useCreate,
	useRedirect,
	useNotify,
} from 'react-admin';

const SaveLogoButton = props => {
	const {customValues, ...rest} = props;
	const [create] = useCreate('Logo');
	const redirectTo = useRedirect();
	const notify = useNotify();
	const { basePath } = props;
	const handleSave = useCallback(
		(values, redirect) => {
			create(
				{
					payload: { data: { ...values, ...customValues } },
				},
				{
					onSuccess: ({ data: newRecord }) => {
						notify('Logo Created', 'info', {
							smart_count: 1,
						});
						redirectTo(redirect, basePath, newRecord.id, newRecord);
					},
				}
			);
		},
		[create, notify, redirectTo, basePath]
	);
	// set onSave props instead of handleSubmitWithRedirect
	return <SaveButton {...rest} onSave={handleSave} />;
};

export default SaveLogoButton;
