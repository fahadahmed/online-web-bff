import camelCase from 'lodash/camelCase';
import { definitions } from 'generated/typings/productDetailServiceV2';
import { NexusGenRootTypes } from 'generated/nexusTypes';

function transformOptions(
  options: definitions['ProductFilterResponse']['filters'][0]['options'],
): NexusGenRootTypes['DeviceGalleryFilterOption'][] {
  return options
    .map(({ name, count }) => {
      return {
        optionId: camelCase(name),
        label: name,
        count,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

export const transformProductFilters = (
  productFiltersResponse: definitions['ProductFilterResponse'],
): NexusGenRootTypes['DeviceGalleryFilter'][] => {
  const { filters } = productFiltersResponse;

  /* TODO: Have asked if BM would convert 'colour' to 'color', BM needs to evaluate 
  the impacts. Will get this update once BM confirms the solution. */
  return filters.map((filter) => ({
    filterId: camelCase(filter.name)
      .replace('colour', 'color')
      .replace('Colour', 'Color'),
    name: filter.name,
    options: transformOptions(filter.options),
  }));
};
