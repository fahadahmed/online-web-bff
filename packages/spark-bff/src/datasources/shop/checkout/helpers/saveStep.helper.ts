import { NexusGenInputs } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/checkoutSectionV2';

export function buildSaveStepRequestBody({
  bundleId,
  rootFields,
  options,
  itemId,
  stepId,
}: NexusGenInputs['SaveCheckoutStepInput']): definitions['SubmitCheckoutSectionRequest'] {
  return {
    steps: [
      {
        cartItemId: itemId,
        fields: rootFields,
        offerContainerId: bundleId,
        options,
        sequence: '0',
        stepId,
      },
    ],
  };
}
