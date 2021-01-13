import * as React from "react";
import {useListContext} from "react-admin";
import FontProvider from "../commonComponents/FontProvider";
import {Grid, TextField} from "@material-ui/core";
import DeleteButtonWithConfirmation from "../commonComponents/DeleteButtonWithConfirmation";

const FontList = () => {
    const [texts, setTexts] = React.useState({});
    const context = useListContext();
    const {ids, data} = context;
    if (!data) {
        return <div>Loading...</div>;
    }
    const fontFamilies: Array<{fontFamily: string; src: string}> = ids.map((id) => ({
        src: `url(${data[id] && data[id].url}) format("woff2")`,
        fontFamily: data[id] && data[id].name
    }));
    return (
        <FontProvider fontFamilies={fontFamilies}>
            <Grid container>
                {ids.map((id) => {
                    const font = data[id];
                    if (!font || !font.name) return <div key={id} />;
                    return (
                        <Grid key={id} item xs={12}>
                            <div>
                                <span style={{fontFamily: font.name, fontSize: "4rem"}}>
                                    {font.name}
                                </span>
                            </div>
                            <div>
                                <TextField
                                    placeholder="type some text for test"
                                    value={texts[id]}
                                    onChange={(e) => setTexts({...texts, [id]: e.target.value})}
                                />
                            </div>
                            <div>
                                <span style={{fontFamily: font.name, fontSize: "2rem"}}>
                                    {texts[id]}
                                </span>
                            </div>
                            <div>
                                <DeleteButtonWithConfirmation
                                    resource="Font"
                                    basePath="/Font"
                                    redirect="list"
                                    record={font}
                                />
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
        </FontProvider>
    );
};
export default FontList;
