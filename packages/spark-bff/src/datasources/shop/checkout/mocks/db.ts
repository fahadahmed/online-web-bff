import Loki from 'lokijs';
import { definitions } from 'generated/typings/checkoutSectionV2';

type SaveCheckoutDataStep =
  definitions['SubmitCheckoutSectionRequest']['steps'][0];

export interface FormData {
  [x: string]: string | number | boolean;
}

const db = new Loki('checkout');
const checkout = db.addCollection('checkout');

interface CheckoutData {
  cartId: string;
  sections: definitions['SectionData'][];
}

function getCheckoutData(cartId: string) {
  const result = checkout.findOne({ cartId });
  return result;
}

function buildCheckoutSection(
  sectionId: string,
  steps: SaveCheckoutDataStep[],
): definitions['SectionData'][] {
  return [
    {
      sectionId,
      steps,
    },
  ];
}

interface AddSectionParameter {
  cartId: string;
  sectionId: string;
  steps: SaveCheckoutDataStep[];
}

function addSection({ cartId, sectionId, steps }: AddSectionParameter) {
  const checkoutSection = buildCheckoutSection(sectionId, steps);
  const cart: CheckoutData = checkout.findOne({ cartId });

  if (cart) {
    const sectionIndex = cart.sections.findIndex(
      (section) => section.sectionId === sectionId,
    );

    const doesSectionExist = sectionIndex !== -1;

    // update section in cartId
    if (doesSectionExist) {
      const { stepId, offerContainerId } = checkoutSection[0].steps[0];

      const stepIndex = cart.sections[sectionIndex].steps.findIndex(
        (step) =>
          step.stepId === stepId && step.offerContainerId === offerContainerId,
      );

      return checkout.updateWhere(
        (data: CheckoutData) => data.cartId === cartId,
        (prevData: CheckoutData) => {
          const newData = prevData;

          // update step if exist
          if (stepIndex !== -1) {
            /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
            newData.sections[sectionIndex].steps[stepIndex] =
              checkoutSection[0].steps[0];
            // push new step if not exist
          } else {
            newData.sections[sectionIndex].steps.push(
              checkoutSection[0].steps[0],
            );
          }

          return {
            ...newData,
          };
        },
      );
    }

    // add section to cartId
    return checkout.updateWhere(
      (data: CheckoutData) => data.cartId === cartId,
      (prevData: CheckoutData) => {
        const newData = prevData;

        newData.sections.push(...checkoutSection);
        return {
          ...newData,
        };
      },
    );
  }

  // initial cart insert
  return checkout.insert({
    cartId,
    sections: checkoutSection,
  });
}

function clearDB() {
  checkout.clear();
}

export default {
  addSection,
  getCheckoutData,
  clearDB,
};
