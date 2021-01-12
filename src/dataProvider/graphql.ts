import buildApolloClient, {
    buildQuery as buildQueryFactory,
} from 'ra-data-graphql-simple';
import {InMemoryCache} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { LegacyDataProvider } from 'ra-core';
import gql from 'graphql-tag';
import {
    IntrospectionField,
    IntrospectionSchema,
    IntrospectionType,
} from 'graphql';

type IntrospectionResource = IntrospectionType & {
    [key: string]: IntrospectionField;
};

interface IntrospectionResults {
    types: IntrospectionType[];
    queries: IntrospectionField[];
    resources: IntrospectionResource[];
    schema: IntrospectionSchema;
}

const customBuildQuery = (
    introspectionResults: IntrospectionResults
): LegacyDataProvider => {
    const buildQuery = buildQueryFactory(introspectionResults);

    return (type, resource, params) => {
        console.log({type, resource, params});
        if (type === 'addTemplate') {
            return {
                query: gql`mutation addTemplate($id: ID!, $template: String!, $templateId: ID) {
                    addTemplate(id: $id, template: $template, templateId: $templateId) {
                        name
                    }
                }`,
                variables: { id: params.id, template: params.template, templateId: params.templateId }

            };
        } else if (type === 'getProductsWithTemplates') {
			return {
				query: gql`query getProductsWithTemplates($params: ProductsWithTemplatesInput) {
                    getProductsWithTemplates(params: $params) {
                        id
                        name
                        imageUrl
                        size {
                            height
                            width
                        }
                        templateFrame {
                            height
                            width
                            x
                            y
                        }
                        categories
                        templates {
                            id
                            template
                        }
                        dynamicTextOptions
                    }
                }`,
                variables: { params },
                parseResponse: ({ data }) => {
                    return {data: data.getProductsWithTemplates};
                },
			};
        } else if (type === 'deleteTemplate') {
            return {
				query: gql`mutation deleteTemplate($id: ID!, $productId: ID) {
                    deleteTemplate(id: $id, productId: $productId)
                }`,
                variables: params
            }
        }

        return buildQuery(type, resource, params);
    };
};

export default () => {
    return buildApolloClient({
        clientOptions: {
            cache: new InMemoryCache(),
            link: createUploadLink({uri: 'http://13.58.212.226:4000/graphql'})
        },
        buildQuery: customBuildQuery,
    }).then(
        (dataProvider: LegacyDataProvider) => (
            ...rest: Parameters<LegacyDataProvider>
        ) => {
            const [type, resource, params] = rest;
            return dataProvider(type, resource, params);
        }
    );
};
