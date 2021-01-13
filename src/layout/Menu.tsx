import * as React from "react";
import {FC, useState} from "react";
import {useSelector} from "react-redux";
import SettingsIcon from "@material-ui/icons/Settings";
import {useMediaQuery, Theme} from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import {useTranslate, DashboardMenuItem, MenuItemLink} from "react-admin";

import business from "../business";
import category from "../category";
import product from "../product";
import logo from "../logo";
import theme from "../theme";
import font from "../font";
import uploadedImage from "../uploadedImage";

import SubMenu from "./SubMenu";
import {AppState} from "../types";

type MenuName = "menuCatalog" | "menuSimulator" | "menuAssets";

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const catalogItems = [
    {name: "Business", icon: business.icon},
    {name: "Category", icon: category.icon},
    {name: "Product", icon: product.icon},
    {name: "Logo", icon: logo.icon},
    {name: "Theme", icon: theme.icon}
];
const assetsItems = [
    {name: "Font", icon: font.icon},
    {name: "UploadedImage", icon: uploadedImage.icon}
];

const Menu: FC<Props> = ({onMenuClick, dense, logout}) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuAssets: true,
        menuSimulator: true
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((_theme: Theme) => _theme.breakpoints.down("xs"));
    const open = useSelector((_state: AppState) => _state.admin.ui.sidebarOpen);
    useSelector((_state: AppState) => _state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState((_state) => ({..._state, [menu]: !_state[menu]}));
    };

    return (
        <div>
            {" "}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle("menuCatalog")}
                isOpen={state.menuCatalog}
                sidebarIsOpen={open}
                name="pos.menu.catalog"
                icon={<category.icon />}
                dense={dense}
            >
                {catalogItems.map((menuItem) => (
                    <MenuItemLink
                        key={menuItem.name}
                        to={`/${menuItem.name}`}
                        primaryText={menuItem.name}
                        onClick={onMenuClick}
                        leftIcon={<menuItem.icon />}
                        sidebarIsOpen={open}
                        dense={dense}
                    />
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle("menuAssets")}
                isOpen={state.menuAssets}
                sidebarIsOpen={open}
                name="Assets"
                icon={<WallpaperIcon />}
                dense={dense}
            >
                {assetsItems.map((menuItem) => (
                    <MenuItemLink
                        key={menuItem.name}
                        to={`/${menuItem.name}`}
                        primaryText={menuItem.name}
                        onClick={onMenuClick}
                        leftIcon={<menuItem.icon />}
                        sidebarIsOpen={open}
                        dense={dense}
                    />
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle("menuSimulator")}
                isOpen={state.menuSimulator}
                sidebarIsOpen={open}
                name="Simulator"
                icon={<TelegramIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/simulator"
                    primaryText="Simulator"
                    onClick={onMenuClick}
                    leftIcon={<TelegramIcon />}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate("pos.configuration")}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </div>
    );
};

export default Menu;
