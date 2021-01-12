import React from 'react';
import {
	Edit,
	Create,
	SimpleForm,
	TextInput,
	required
} from 'react-admin';
import 'template-editor/dist/index.css';
import EditTemplateField from "../commonComponents/EditTemplateField";
import CustomFormToolbar from "../commonComponents/CustomFormToolbar";
import CustomEditTitle from "../commonComponents/CustomEditTitle";

export const logoProduct = {
	name: 'Logo',
	image: '',
	size: {
		height: 10,
		width: 10
	},
	templateFrame: {
		height: 10,width: 10, x: 0, y: 0
	},
	dynamicTextOptions: ['Logo - Brand Name', 'Logo - Slogan']
};

const LogoForm = (props) => {
	return (
		<SimpleForm {...props} toolbar={<CustomFormToolbar />}>
			<TextInput source="name" validate={[required()]}/>
			<EditTemplateField product={logoProduct} source="template" />
		</SimpleForm>
	)
}

export const LogoEdit = (props) => (
	<Edit title={<CustomEditTitle resource='Logo' />} {...props}>
		<LogoForm />
	</Edit>
);

export const LogoCreate = (props) => (
	<Create {...props} >
		<LogoForm />
	</Create>
);
