import { nullable, objectType, stringArg, queryField } from 'nexus';
import { CartChannel } from '../../common';

const DEVICE_GALLERY_ANCHOR_CATEGORY = 'hardware';

export const Color = objectType({
  name: 'Color',
  definition(t) {
    t.string('name');
    t.string('value');
    t.string('primaryColor');
  },
});

export const DeviceGalleryProduct = objectType({
  name: 'DeviceGalleryProduct',
  definition(t) {
    t.nullable.string('groupId');
    t.string('offerId');
    t.string('name');
    t.nullable.string('description');
    t.nullable.float('basePrice');
    t.nullable.float('basePriceExcludingTax');
    t.nullable.float('effectivePrice');
    t.nullable.float('effectivePriceExcludingTax');
    t.nullable.string('priceType');
    t.nullable.float('startPricePoint');
    t.nullable.string('brand');
    t.nullable.list.field('colors', {
      type: Color,
    });
    t.nullable.boolean('isFeatured');
    t.nullable.string('launchDate');
    t.nullable.string('imageUrl');
    t.nullable.string('tag');
    t.nullable.string('discountText');
    t.nullable.string('planId');
    t.nullable.string('ifpId');
  },
});

export const Subcategory = objectType({
  name: 'Subcategory',
  definition(t) {
    t.string('categoryId');
    t.string('name');
    t.nullable.boolean('visibility');
    t.nullable.string('defaultSelected');
    t.nullable.int('sortOrder');
  },
});

export const DeviceGalleryFilterOption = objectType({
  name: 'DeviceGalleryFilterOption',
  definition(t) {
    t.int('count');
    t.string('label');
    t.string('optionId');
  },
});

export const DeviceGalleryFilter = objectType({
  name: 'DeviceGalleryFilter',
  description: 'Product filter related information',
  definition(t) {
    t.string('filterId');
    t.string('name');
    t.list.field('options', { type: DeviceGalleryFilterOption });
  },
});

export const DeviceGalleryResponse = objectType({
  name: 'GalleryProductResponse',
  definition(t) {
    t.list.field('filters', {
      type: DeviceGalleryFilter,
    });
    t.list.field('products', {
      type: DeviceGalleryProduct,
    });
    t.list.field('subcategories', {
      type: Subcategory,
    });
    t.string('subcategoryId');
  },
});

export const DeviceGalleryQuery = queryField('deviceGallery', {
  type: DeviceGalleryResponse,
  args: {
    subcategoryId: nullable(stringArg()),
    channel: CartChannel,
  },
  description: 'Gets the list of products for the product gallery page',
  async resolve(
    _,
    { subcategoryId: argSubcategoryId, channel },
    { dataSources: { productDetailsAPI, productFiltersAPI } },
  ) {
    const subcategories = await productDetailsAPI.getSubcategories(
      DEVICE_GALLERY_ANCHOR_CATEGORY,
      channel,
    );

    // @TODO make this use subcategory.isDefault property once available from DESL
    const FALLBACK_SUBCATEGORY_ID = subcategories[0].categoryId;

    const subcategoryId = argSubcategoryId ?? FALLBACK_SUBCATEGORY_ID;

    const products = await productDetailsAPI.getDeviceGalleryProducts(
      subcategoryId,
      channel,
    );

    const filters = await productFiltersAPI.getProductFilters(
      subcategoryId,
      channel,
    );

    return {
      filters,
      products,
      subcategoryId,
      subcategories,
    };
  },
});
