import React from "react";
import {Button} from "@material-ui/core";
import {TemplatePreviewForPreview} from "template-editor";
import EditTemplateDialog from "./EditTemplateDialog";
import {useInput} from "react-admin";

export default function EditTemplateField(props) {
    const {record, source, scale, template} = props;
    const product = props.product || record;
    const inputProps = useInput(props);
    const {
        input: {name, onChange}
    } = inputProps;
    React.useEffect(() => {
        if (template) {
            setTemplateString(template);
        }
    }, [template]);
    const initialTemplate =
        (record && record[source]) ||
        JSON.stringify({templateGradients: [], templateFilters: [], layouts: []});
    const [templateString, setTemplateString] = React.useState(initialTemplate);
    const [isEditTemplateOpen, setIsEditTemplateOpen] = React.useState(false);
    const onSaveTemplate = (__template) => {
        const str = JSON.stringify(__template);
        setTemplateString(str);
        setIsEditTemplateOpen(false);
        if (props.onSave) {
            props.onSave(str);
        } else if (onChange) {
            onChange(str);
        }
    };
    return (
        <div>
            <input
                style={{visibility: "hidden", width: 0}}
                type="text"
                id={name}
                readOnly
                name={name}
                value={templateString}
            />
            <Button variant="contained" color="primary" onClick={() => setIsEditTemplateOpen(true)}>
                Edit Template
            </Button>

            {isEditTemplateOpen && (
                <EditTemplateDialog
                    open={true}
                    product={product}
                    template={JSON.parse(templateString)}
                    onSaveTemplate={onSaveTemplate}
                    onClose={() => setIsEditTemplateOpen(false)}
                />
            )}
            <TemplatePreviewForPreview
                scale={scale}
                product={product}
                template={JSON.parse(templateString)}
            />
        </div>
    );
}
