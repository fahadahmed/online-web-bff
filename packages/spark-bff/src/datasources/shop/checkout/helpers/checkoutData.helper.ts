import { definitions } from 'generated/typings/checkoutSectionV2';
import { NexusGenFieldTypes, NexusGenRootTypes } from 'generated/nexusTypes';

function transformCheckoutDataStep(
  step: definitions['CaptureStepData'],
): NexusGenFieldTypes['CheckoutDataStep'] {
  const { offerContainerId, stepId } = step;

  const optionFieldEntries = step.options?.flatMap((option) => {
    const childField = (option.fields || []).map((field) => field);
    const { fields, ...parentField } = option;
    return [...childField, parentField];
  });

  const entries = [
    ...step.fields,
    ...optionFieldEntries,
  ] as NexusGenRootTypes['CheckoutDataFieldEntry'][];

  return {
    offerContainerId,
    stepId,
    stepPath: offerContainerId ? `${stepId}-${offerContainerId}` : stepId,
    entries,
  };
}

export const transformCheckoutData = (
  deslResponseBody: definitions['CheckoutDataResponse'],
): NexusGenFieldTypes['CheckoutDataResponse'] => {
  return {
    id: 'checkout-data-id',
    sections:
      deslResponseBody.sections?.map((deslSection) => ({
        sectionId: deslSection.sectionId,
        steps: deslSection.steps.map(transformCheckoutDataStep),
      })) || [],
  };
};
