import sortBy from 'lodash/sortBy';
import trim from 'lodash/trim';
import { NexusGenFieldTypes, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/checkoutSectionV2';
import { transformFieldComponent } from './fieldComponent.helper';

interface CustomAttribute {
  key: string;
  value: string;
}

interface DESLCheckoutOption {
  customAttributes: CustomAttribute[];
  fields: DESLCheckoutFieldMock[];
  value: string;
  visibility?: {
    expression?: string;
  };
}

interface DESLCheckoutDataRefItem {
  id: string;
  text: string;
}

interface FieldRule {
  expression: string;
  message?: string;
}

interface DESLCheckoutFieldMock {
  dataRef?: DESLCheckoutDataRefItem[];
  label: string;
  key: string;
  name: string;
  options?: DESLCheckoutOption[];
  type: string;
  fieldRule?: {
    validations?: {
      regex?: FieldRule;
    };
    visibility?: FieldRule;
    required?: FieldRule;
  };
  customAttributes?: CustomAttribute[];
}

interface DESLCheckoutStepMock {
  stepId: string;
  name: string;
  fields: DESLCheckoutFieldMock[];
  offerContainerId: string;
  cartItemId: string;
  customAttributes: CustomAttribute[];
}

export interface DESLCheckoutSectionMock {
  name: string;
  sectionId: string;
  steps: DESLCheckoutStepMock[];
}

interface CustomAttributesDict {
  component?: string;
  componentViewId?: string;
  componentViewName?: string;
  contentKey?: string;
  customItems?: string;
  defaultValue?: string;
  filterDate?: string;
  iconName?: string;
  infoLayerContentKey?: string;
  label?: string;
  maximumRuleExpression?: string;
  maximumRuleMessage?: string;
  minimumRuleExpression?: string;
  minimumRuleMessage?: string;
  placeholder?: string;
  regionId?: string;
  shouldHideWhenSingleOption?: string;
  shouldMask?: string;
  showInSummary?: string;
  sublabel?: string;
  summaryLabel?: string;
  summaryTemplate?: string;
}

function buildCustomAttributesDict(
  customAttributes: CustomAttribute[],
): CustomAttributesDict {
  return customAttributes.reduce((customAttributesObject, { key, value }) => {
    return {
      ...customAttributesObject,
      [key]: value,
    };
  }, {});
}

function cleanCustomItems(customAttributeValue?: string) {
  if (!customAttributeValue) {
    return null;
  }

  return customAttributeValue.split(',').map(trim);
}

function determineOptionVisibility(option: DESLCheckoutOption) {
  if (!option.visibility) {
    // defaults to true when there's no visibility expression
    return true;
  }

  return option.visibility.expression === 'true';
}

function transformCheckoutFieldOption(option: DESLCheckoutOption) {
  const { iconName, label, sublabel } = buildCustomAttributesDict(
    option.customAttributes || [],
  );

  if (option.fields) {
    const optionVisibility = determineOptionVisibility(option);
    return {
      iconName: iconName ?? null,
      label: label ?? option.value,
      sublabel: sublabel ?? null,
      value: option?.value,
      visibility: optionVisibility,
    };
  }
  return {
    iconName: iconName ?? null,
    label: label ?? option.value,
    sublabel: sublabel ?? null,
    value: option?.value,
    visibility: true,
  };
}

function transformCheckoutFieldOptions(options?: DESLCheckoutOption[]) {
  if (options == null || options.length === 0) {
    return null;
  }

  return options.map(transformCheckoutFieldOption);
}

interface ExtractOptionsFieldsParameter {
  sourceField: DESLCheckoutFieldMock;
  parentKey?: string;
}

/**
 * Extracts the fields inside the options with respective visibility rules.
 *
 * @returns an array of the fields within to be placed at the top-level
 */
function extractOptionsFields({
  parentKey,
  sourceField,
}: ExtractOptionsFieldsParameter): NexusGenFieldTypes['CheckoutField'][] {
  if (sourceField.options == null || sourceField.options.length === 0) {
    return [];
  }

  return sourceField.options
    .map((sourceOption: DESLCheckoutOption) => {
      if (sourceOption.fields == null || sourceOption.fields.length === 0) {
        return [];
      }

      const parent = {
        key: parentKey,
        name: sourceField.name,
        value: sourceOption.value,
      };

      return sourceOption.fields
        .map((deslField) => transformCheckoutField({ deslField, parent })) // eslint-disable-line @typescript-eslint/no-use-before-define
        .flat();
    }, [])
    .flat();
}

interface BuildFieldKeyParameter {
  name: string;
  parent?: NexusGenFieldTypes['Parent'];
}

/**
 * This function generates unique keys for every field by using it's parent's name and value.
 * There may be two fields with the same name but not under the same parent option.
 *
 * When there is no parent, just the field's name will work as a key.
 */
function buildFieldKey({ name, parent }: BuildFieldKeyParameter): string {
  if (!parent) {
    return name;
  }

  return `${name}:${parent.name}=${parent.value}`;
}

const transformFieldRule = ({ expression, message }: FieldRule) => {
  if (!expression || !message) {
    return null;
  }
  return { expression, message };
};

interface TransformCheckoutFieldParameter {
  deslField: DESLCheckoutFieldMock;
  parent?: NexusGenFieldTypes['Parent'];
}

export function transformCheckoutField({
  deslField,
  parent,
}: TransformCheckoutFieldParameter): NexusGenFieldTypes['CheckoutField'][] {
  const { dataRef, label, name, options, type, fieldRule } = deslField;

  const optional = fieldRule?.required?.expression === 'false';

  const customAttributes = buildCustomAttributesDict(
    deslField.customAttributes || [],
  );

  const {
    componentViewId,
    componentViewName,
    contentKey,
    customItems,
    defaultValue,
    filterDate,
    infoLayerContentKey,
    minimumRuleExpression,
    minimumRuleMessage,
    maximumRuleExpression,
    maximumRuleMessage,
    placeholder,
    regionId,
    shouldHideWhenSingleOption,
    shouldMask,
    showInSummary,
    summaryLabel,
    summaryTemplate,
  } = customAttributes;

  const component = transformFieldComponent({
    customAttributeComponent: customAttributes.component,
    type,
  });

  const field: NexusGenFieldTypes['CheckoutField'] = {
    component,
    componentViewId: componentViewId ?? null,
    componentViewName: componentViewName ?? null,
    contentKey: contentKey ?? null,
    customItems: cleanCustomItems(customItems),
    dataRef,
    defaultValue: defaultValue ?? null,
    fieldType: component,
    filterDate,
    infoLayerContentKey: infoLayerContentKey ?? null,
    key: buildFieldKey({ name, parent }),
    label,
    minimumRule: transformFieldRule({
      expression: minimumRuleExpression,
      message: minimumRuleMessage,
    }),
    maximumRule: transformFieldRule({
      expression: maximumRuleExpression,
      message: maximumRuleMessage,
    }),
    name,
    options: transformCheckoutFieldOptions(options),
    parent,
    placeholder: placeholder ?? null,
    regionId: regionId ?? null,
    required: !optional,
    shouldHideWhenSingleOption: shouldHideWhenSingleOption === 'true',
    shouldMask: shouldMask === 'true',
    showInSummary: showInSummary === 'true',
    summaryLabel: summaryLabel ?? null,
    summaryTemplate: summaryTemplate ?? null,
    validationRule: fieldRule?.validations?.regex,
    visibilityExpression: fieldRule?.visibility?.expression ?? null,
  };

  const extractedFields = extractOptionsFields({
    parentKey: field.key,
    sourceField: deslField,
  });

  return [field, ...extractedFields];
}

export function transformCheckoutStep({
  cartItemId,
  customAttributes,
  fields: deslFields,
  name,
  offerContainerId,
  stepId,
}: DESLCheckoutStepMock): NexusGenFieldTypes['CheckoutStep'] {
  const fields = deslFields
    .map((deslField) => transformCheckoutField({ deslField }))
    .flat();

  const stepPath = offerContainerId ? `${stepId}-${offerContainerId}` : stepId;

  return {
    name,
    nameExpression:
      customAttributes?.find(
        (customAttribute) => customAttribute.key === 'nameExpression',
      )?.value || null,
    bundleId: offerContainerId,
    itemId: cartItemId,
    fields,
    stepId,
    stepPath,
  };
}

function transformCheckoutSection({
  name,
  sectionId,
  customAttributes,
  steps,
}: definitions['CheckoutSectionStructureResponse']): NexusGenRootTypes['CheckoutSection'] {
  const sortedSteps = sortBy(steps.map(transformCheckoutStep), ['bundleId']);
  return {
    name,
    sectionId,
    descriptionContentKey:
      customAttributes?.find(
        (customAttribute) => customAttribute.key === 'contentKey',
      )?.value || null,
    steps: sortedSteps,
  };
}

export function buildSuccessfulCheckoutSectionResponse(
  deslResponse: definitions['CheckoutSectionDetailResponse'],
): NexusGenRootTypes['CheckoutStructureQueryResponse'] {
  return {
    id: 'checkout-structure-id',
    sections: deslResponse.sections.map(transformCheckoutSection),
  };
}
