import PaletteIcon from "@material-ui/icons/Palette";
import ThemeList from "./list";
import {editTheme, createTheme} from "./editCreate";

export default {
    list: ThemeList,
    create: createTheme,
    edit: editTheme,
    icon: PaletteIcon
};
