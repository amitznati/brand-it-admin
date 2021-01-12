import React, {Fragment} from 'react';
import {ImageField, ImageInput} from "react-admin";
import {propertyByString} from "../utils";


export const CustomImage = (props) => {
    const {imageSrc} = props;
    if (imageSrc) {
        return <img src={imageSrc} alt="product" style={{maxHeight: 300, maxWidth: '100%'}} />
    }
    return null;
};

const CustomImageField = (props) => {
    const {record, source, imageFieldName, onImageChange, ...rest} = props;
    const [imageSrc, setImageSrc] = React.useState<string | ArrayBuffer | null>(null);
    const onImageChanged = (files) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', function () {
            const fileContent = reader.result;
            setImageSrc(fileContent);
            onImageChange && onImageChange(fileContent);
        });
        reader.readAsDataURL(files[0]);
    };

    return (
        <Fragment>
            <ImageInput options={{onDropAccepted: onImageChanged}} source={source} accept="image/*" {...rest}>
                <ImageField source="files" title="title"/>
            </ImageInput>
            {!imageSrc && <CustomImage imageSrc={propertyByString(record, imageFieldName)} />}
        </Fragment>
    );
};

export default CustomImageField;
