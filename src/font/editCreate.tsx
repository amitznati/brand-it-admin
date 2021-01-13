import React from "react";
import {Edit, Create, SimpleForm, TextInput, required, FileField, FileInput} from "react-admin";
import CustomFormToolbar from "../commonComponents/CustomFormToolbar";
import CustomEditTitle from "../commonComponents/CustomEditTitle";

const FontForm = (props) => (
    <SimpleForm {...props} toolbar={<CustomFormToolbar />}>
        <TextInput source="name" validate={[required()]} />
        <FileInput source="fontFile" label="Font File (.woffs)" accept=".woff2">
            <FileField source="files" title="Font File" />
        </FileInput>
    </SimpleForm>
);

export const FontEdit = (props) => (
    <Edit title={<CustomEditTitle resource="Font" />} {...props}>
        <FontForm />
    </Edit>
);

export const FontCreate = (props) => (
    <Create {...props}>
        <FontForm />
    </Create>
);
