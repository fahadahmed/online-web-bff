import { definitions } from 'generated/typings/contentService';
import { NexusGenRootTypes, NexusGenObjects } from 'generated/nexusTypes';

const transformContent = (
  contents: definitions['Content'][],
): NexusGenRootTypes['ContentDetails'][] => {
  return contents.map(({ assetType, format, type, text, value: linkName }) => {
    return {
      assetType,
      format,
      type,
      text,
      linkName,
    };
  });
};

export const transformContentAssets = (
  contentAssetResponse: definitions['AssetsV2Response'],
): NexusGenRootTypes['ContentAsset'][] => {
  const { assets } = contentAssetResponse;
  const contentAssets = assets.map(({ contents }) => ({
    content: transformContent(contents),
  }));
  return contentAssets;
};

export const transformContentJourneyList = (
  contentJourney: definitions['JourneyDetailResponse'],
): NexusGenRootTypes['ContentJourneyDetails'][] => {
  const { fields } = contentJourney;

  return fields.map((field) => ({
    key: field.fieldKey,
    type: field.fieldType,
    url: field.fieldUrl,
    value: field.fieldValue,
  }));
};

export const transformContentMenu = (
  contentMenuResponse: definitions['FooterMenuResponse'],
) => {
  const { id, tags, description, title, menus } = contentMenuResponse;

  return {
    description,
    id,
    menus,
    tags,
    title,
  };
};

const getMenusByType = (
  menus: definitions['FooterMenu']['menus'],
  menuType: definitions['MenuFields']['menuType'],
) => {
  return menus?.find((menu) => menu?.menuType === menuType)?.menuSections || [];
};

const getItemsByType = (
  items: definitions['MenuSections'],
  itemType: definitions['MenuItemType']['itemType'],
) => {
  return items?.menuItems?.filter((item) => item?.itemType === itemType) || [];
};

const assembleMenuItem = (
  id: definitions['FooterMenu']['id'],
  heading: definitions['MenuItemType'],
  hyperLinks: definitions['MenuSections']['menuItems'],
  sectionIndex: number,
) => {
  const assembledItem = {
    id: `${id}-primary-section-${sectionIndex}`,
    heading: heading?.itemValue || '',
    url: heading?.itemUrl || '',
    items: hyperLinks.map((item, itemIndex) => ({
      id: `${id}-primary-section-${sectionIndex}-item-${itemIndex}`,
      label: item?.itemValue || '',
      url: item?.itemUrl || '',
    })),
  };
  return assembledItem;
};

const transformSecondarySection = (
  id: definitions['FooterMenu']['id'],
  section: definitions['MenuSections'],
  sectionIndex: number,
) => {
  const transformedContent = section.menuItems.map((item, itemIndex) => {
    const isImage = item?.itemType === 'IMAGE';
    const linkItem = {
      id: `${id}-secondary-section-${sectionIndex}-item-${itemIndex}`,
      label: item?.itemValue || '',
      iconName: isImage ? item.itemValue : undefined,
      url: item?.itemUrl || '',
    };
    return linkItem;
  });
  return transformedContent;
};

export const transformFooterContent = (
  contentMenuResponse: definitions['FooterMenuResponse'],
): NexusGenObjects['FooterContentResponse'] => {
  const { id, menus } = contentMenuResponse;
  let footerLinkMenu: NexusGenObjects['FooterContentResponse']['footerLinkMenu'] =
    [];
  let footerSocialMediaLinks: NexusGenObjects['FooterContentResponse']['footerSocialMediaLinks'] =
    [];
  let footerLegalLinks: NexusGenObjects['FooterContentResponse']['footerLegalLinks'] =
    [];

  const primaryMenu = getMenusByType(menus, 'PRIMARY');
  const secondaryMenu = getMenusByType(menus, 'SECONDARY');

  if (primaryMenu) {
    footerLinkMenu = primaryMenu.map((section, sectionIndex) => {
      const heading = getItemsByType(section, 'HEADING')[0];
      const hyperLinks = getItemsByType(section, 'HYPERLINK');
      const assembledItem = assembleMenuItem(
        id,
        heading,
        hyperLinks,
        sectionIndex,
      );
      return assembledItem;
    });
  }

  if (secondaryMenu) {
    [footerSocialMediaLinks, footerLegalLinks] = secondaryMenu.map(
      (section, sectionIndex) =>
        transformSecondarySection(id, section, sectionIndex),
    );
  }

  return {
    footerLinkMenu,
    footerSocialMediaLinks,
    footerLegalLinks,
  };
};

const getMenuCategories = (menu: definitions['MenuSections']['menuItems']) => {
  return menu.map((item) => ({
    label: item.itemValue,
    iconName: item.itemImageUrl,
    url: item.itemUrl,
  }));
};

export const transformHeaderContent = (
  contentMenuPersonalResponse: definitions['FooterMenuResponse'],
  contentMenuBusinessResponse: definitions['FooterMenuResponse'],
): NexusGenObjects['HeaderContent'] => {
  const personalPrimaryMenu = getMenusByType(
    contentMenuPersonalResponse.menus,
    'PRIMARY',
  );
  const personalSecondaryMenu = getMenusByType(
    contentMenuPersonalResponse.menus,
    'SECONDARY',
  );
  const businessPrimaryMenu = getMenusByType(
    contentMenuBusinessResponse.menus,
    'PRIMARY',
  );
  const businessSecondaryMenu = getMenusByType(
    contentMenuBusinessResponse.menus,
    'SECONDARY',
  );

  const personalCategories = getMenuCategories(
    personalSecondaryMenu[0].menuItems,
  );
  const personalCategoriesDesktop = getMenuCategories(
    personalPrimaryMenu[0].menuItems,
  );
  const businessCategories = getMenuCategories(
    businessSecondaryMenu[0].menuItems,
  );
  const businessCategoriesDesktop = getMenuCategories(
    businessPrimaryMenu[0].menuItems,
  );

  return {
    personalCategories,
    personalCategoriesDesktop,
    businessCategories,
    businessCategoriesDesktop,
  };
};
