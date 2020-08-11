import { InputType, Field, ID, Int, Float, ObjectType } from "type-graphql";
import { TPagedParams, TProductFilter, TAttributeInstance, TProduct, TAttributeInstanceValue, TAttributeProductVariant } from '@cromwell/core';
import { UpdateProduct } from '../inputs/UpdateProduct';

@ObjectType("AttributeInstanceInput")
@InputType("AttributeInstanceType")
export class AttributeInstance implements TAttributeInstance {
    @Field(type => String, { nullable: false })
    key: string;

    @Field(type => [AttributeInstanceValue], { nullable: false })
    values: AttributeInstanceValue[];
}

@ObjectType("AttributeInstanceValueInput")
@InputType("AttributeInstanceValueType")
export class AttributeInstanceValue implements TAttributeInstanceValue {
    @Field(type => String, { nullable: false })
    value: string;

    @Field(type => AttributeProductVariant, { nullable: true })
    productVariant?: AttributeProductVariant;
}

@ObjectType("AttributeProductVariantInput")
@InputType("AttributeProductVariantType")
export class AttributeProductVariant implements TAttributeProductVariant {
    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => Number, { nullable: true })
    price?: number;

    @Field(() => Number, { nullable: true })
    oldPrice?: number;

    @Field(() => String, { nullable: true })
    mainImage?: string;

    @Field(() => [String], { nullable: true })
    images?: string[];

    @Field(() => String, { nullable: true })
    description?: string;
}