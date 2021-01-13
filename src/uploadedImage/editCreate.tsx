import React from "react";
import {Edit, Create, SimpleForm, TextInput, required} from "react-admin";
import CustomImageField from "../commonComponents/CustomImageField";
import CustomFormToolbar from "../commonComponents/CustomFormToolbar";
import CustomEditTitle from "../commonComponents/CustomEditTitle";

const UploadedImageForm = (props) => {
    return (
        <SimpleForm toolbar={<CustomFormToolbar />} {...props}>
            <TextInput source="name" validate={[required()]} />
            <CustomImageField
                source="UploadedImageFile"
                validate={[required()]}
                imageFieldName="url"
                label="Image File"
            />
        </SimpleForm>
    );
};

export const UploadedImageEdit = (props) => (
    <Edit title={<CustomEditTitle resource="Uploaded Image" />} {...props}>
        <UploadedImageForm />
    </Edit>
);

export const UploadedImageCreate = (props) => (
    <Create {...props}>
        <UploadedImageForm />
    </Create>
);
