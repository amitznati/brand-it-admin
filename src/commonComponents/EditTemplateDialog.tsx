import React from 'react';
import {TemplateEditorModal} from 'template-editor';
import 'template-editor/dist/index.css';
import {useGetList} from "react-admin";
import {defaultLogo, defaultTheme} from './defaults';

const dynamicImageOptions = [
    '@theme-image-bg',
    '@theme-image-frame',
    '@theme-image-sideL',
    '@theme-image-sideR',
    '@theme-image-sideB',
    '@theme-image-sideT'
];
const EditTemplateDialog = ({onClose, open, onSaveTemplate, product, template}) => {
    const { data, ids, loading } = useGetList(
        'Font',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    const { data: uploadedImagesData, ids: uploadedImagesIds, loading: uploadedImagesLoading } = useGetList(
        'UploadedImage',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    if (loading || uploadedImagesLoading) return <span>Loading...</span>;
    const uploadedFonts = ids.map((id) => data[id]);
    const uploadedImages = uploadedImagesIds.map((id) => uploadedImagesData[id]);
    return (
        <div>
            <TemplateEditorModal
                onSaveTemplate={onSaveTemplate}
                onClose={onClose}
                open={open}
                initialData={{
                    dynamicImageOptions,
                    product,
                    uploadedFonts,
                    uploadedImages,
                    template,
                    selectedTheme: defaultTheme,
                    selectedLogo: defaultLogo
                }}
            />
        </div>
    );
};

export default EditTemplateDialog;
