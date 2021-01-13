import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {useGetList, Loading} from "react-admin";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);
interface BusinessType {
    name: string;
    id: string;
}
interface CategoryType {
    name: string;
    id: string;
    business: BusinessType;
}
export default function SelectCategory({onSelectCategory, selectedCategory}) {
    const classes = useStyles();
    const [selectedBusiness, setSelectedBusiness] = React.useState("");
    const [businesses, setBusinesses] = React.useState<Array<BusinessType>>([]);
    const [categories, setCategories] = React.useState<Array<CategoryType>>([]);

    const handleBusinessChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setSelectedBusiness(event.target.value as string);
    };
    const handleCategoryChange = (event: React.ChangeEvent<{value: unknown}>) => {
        onSelectCategory(event.target.value);
    };
    useGetList("Business", {page: 1, perPage: 100}, {field: "name", order: "ASC"}, undefined, {
        onSuccess: ({data}) => setBusinesses(data),
        onFailure: (error) => console.error(`Error: ${error.message}`)
    });
    useGetList("Category", {page: 1, perPage: 100}, {field: "name", order: "ASC"}, undefined, {
        onSuccess: ({data}) => {
            setCategories(data);
            if (selectedCategory) {
                setSelectedBusiness(data.find((c) => c.id === selectedCategory)?.business?.id);
            }
        },
        onFailure: (error) => console.error(`Error: ${error.message}`)
    });
    if (!businesses.length || !categories.length) {
        return <Loading />;
    }

    return (
        <div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="businesses-simple-select-outlined-label">
                        Business/Area
                    </InputLabel>
                    <Select
                        labelId="businesses-simple-select-outlined-label"
                        id="businesses-simple-select-outlined"
                        value={selectedBusiness}
                        onChange={handleBusinessChange}
                        label="Business"
                    >
                        {businesses.map((business) => {
                            return (
                                <MenuItem key={business.id} value={business.id}>
                                    {business.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="categories-simple-select-outlined-label">Category</InputLabel>
                    <Select
                        labelId="categories-simple-select-outlined-label"
                        id="categories-simple-select-outlined"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        {categories
                            .filter((cat) => cat.business.id === selectedBusiness)
                            .map((cat) => {
                                return (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
