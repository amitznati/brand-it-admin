import { TranslationMessages } from 'ra-core';
import englishMessages from 'ra-language-english';

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    Categories: 'Categories',
    Assets: 'Assets',
    Simulator: 'Simulator',
    'Template Saved': 'Template Saved',
    'Template Deleted': 'Template Deleted',
    'Element Deleted': 'Element Deleted',
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        menu: {
            catalog: 'Catalog',
        },
    },
    resources: {
        business: {
            name: 'Business |||| Businesses',
            fields: {
                name: 'Name',
            },
            filters: {

            },
            fieldGroups: {

            },
            page: {
                delete: 'Delete Business',
            },
            errors: {
            },
        },
        category: {
            name: 'Category |||| Categories',
            fields: {
                name: 'Name',
                products: 'Products'
            },
            filters: {

            },
            fieldGroups: {

            },
            page: {
                delete: 'Delete category',
            },
            errors: {
            },
        },
        product: {
            name: 'Product |||| Products',
            filters: {

            },
            fieldGroups: {

            },
            page: {
                delete: 'Delete product',
            },
            errors: {
            },
        },
        Product: {
            fields: {
                name: 'Name',
                categories: 'Categories',
                image: 'Image',
                size: {
                    width: 'Width',
                    height: 'Height'
                }
            },
        }
    },
};

export default customEnglishMessages;
