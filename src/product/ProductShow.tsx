import React from "react";
import RefreshIcon from '@material-ui/icons/Refresh';
import {
    Show,
    SimpleShowLayout,
    TextField,
    useMutation,
    Button,
    SimpleForm,
    Toolbar,
    useNotify,
    useRefresh
} from 'react-admin';
import EditTemplateField from "../commonComponents/EditTemplateField";
import ProductTemplatesPreview from "./ProductTemplatesPreview";
import ThemeSelect from "../commonComponents/ThemeSelect";
import CustomEditTitle from "../commonComponents/CustomEditTitle";

const initialTemplate = JSON.stringify({ templateGradients: [], templateFilters: [], layouts: [] });

const SaveTemplateButton = (props) => {
    const {record, template: {template, id}, onAddTemplate} = props;
    const notify = useNotify();
    const [approve, { loading }] = useMutation({
        type: 'addTemplate',
        resource: 'Product',
        payload: { id: record.id, template, templateId: id}
    }, {
        onSuccess: () => {
            notify('Template Saved', 'info', {}, true);
            onAddTemplate()
        }
    });
    return (
        <Button
            label="Save"
            onClick={approve}
            disabled={loading || template === initialTemplate}
        />
    );
};

const PostCreateToolbar = ({template, resetTemplateInEdit, onAddTemplate, ...props}) => (
    <Toolbar {...props} >
        <SaveTemplateButton template={template} {...{onAddTemplate}} />
        <Button
            label="Cancel"
            onClick={resetTemplateInEdit}
            disabled={template.template === initialTemplate} />
    </Toolbar>
);
const EditTemplateForProduct = ({templateInEdit, setTemplateInEdit, resetTemplateInEdit, onAddTemplate, ...props}) => {
    return (
        <SimpleForm toolbar={<PostCreateToolbar template={templateInEdit} {...{resetTemplateInEdit, onAddTemplate}} />} {...props}>
            <EditTemplateField
                template={templateInEdit.template}
                recource="template"
                scale={0.4}
                onSave={(template) => setTemplateInEdit({...templateInEdit, template})} />
        </SimpleForm>
    );
}
export const ProductShow = ({hasShow, ...rest}) => {
    const refresh = useRefresh();
    const [selectedTheme, setSelectedTheme] = React.useState<{id: string} | null>(null);
    const [templateInEdit, setTemplateInEdit] = React.useState({
        template: initialTemplate,
    });
    const resetTemplateInEdit = () => {
        setTemplateInEdit({
            template: initialTemplate,
        });
    };
    const onAddTemplate = () => {
        resetTemplateInEdit();
        refresh();
    }
    return (
        <Show {...rest} title={<CustomEditTitle resource='Product' />}>
            <SimpleShowLayout>
                <TextField source="name"/>
                <EditTemplateForProduct {...{templateInEdit, setTemplateInEdit, resetTemplateInEdit, onAddTemplate }} />
                <ThemeSelect onSelect={setSelectedTheme} selectedTheme={selectedTheme} />
                <Button onClick={refresh} size="large" ><RefreshIcon /></Button>
                <ProductTemplatesPreview {...{selectedTheme, refresh}} onEditTemplate={setTemplateInEdit} />
            </SimpleShowLayout>
        </Show>
    );
}
