import { apiV1BaseRoute } from '@cromwell/core';
import { Module } from '@nestjs/common';
import { TypeGraphQLModule } from 'typegraphql-nestjs';

import { collectPlugins } from '../helpers/collectPlugins';
import { GenericPluginResolver, GenericThemeResolver } from '../helpers/genericEntities';
import { setEnv } from '../helpers/setEnv';
import { AttributeResolver } from '../resolvers/AttributeResolver';
import { AuthorResolver } from '../resolvers/AuthorResolver';
import { PostResolver } from '../resolvers/PostResolver';
import { ProductCategoryResolver } from '../resolvers/ProductCategoryResolver';
import { ProductResolver } from '../resolvers/ProductResolver';
import { ProductReviewResolver } from '../resolvers/ProductReviewResolver';

const envMode = setEnv();

@Module({
    providers: [
        AttributeResolver,
        AuthorResolver,
        PostResolver,
        ProductCategoryResolver,
        ProductResolver,
        ProductReviewResolver,
        GenericPluginResolver,
        GenericThemeResolver,
        ...(collectPlugins().resolvers),
    ],
    imports: [
        TypeGraphQLModule.forRoot({
            cors: true,
            debug: envMode === 'dev',
            playground: envMode === 'dev',
            validate: false,
            dateScalarMode: "isoDate",
            path: `/${apiV1BaseRoute}/graphql`,
        })
    ]
})
export class GraphqlModule { }