import { enumType, objectType, queryField, stringArg } from 'nexus';
import { CartChannel } from '../../common';

export const BiometricProgressStepStatus = enumType({
  name: 'BiometricProgressStepStatus',
  members: ['INACTIVE', 'LOADING', 'DONE', 'ERROR'],
});

export const BiometricProgressStep = objectType({
  name: 'BiometricProgressStep',
  definition(t) {
    t.string('stepId');
    t.string('label');
    t.field('status', {
      type: BiometricProgressStepStatus,
    });
  },
});

export const BiometricProgressInfoBanner = enumType({
  name: 'BiometricProgressInfoBanner',
  members: ['SUCCESS', 'NO_MATCH', 'TIMED_OUT', 'MAX_LINKS'],
});

export const BiometricProgressResponse = objectType({
  name: 'BiometricProgressResponse',
  definition(t) {
    t.boolean('showResend');
    t.list.field('steps', {
      type: BiometricProgressStep,
    });
    t.nullable.field('infoBanner', {
      type: BiometricProgressInfoBanner,
    });
    t.boolean('isContinueEnabled');
  },
});

export const biometricProgressQuery = queryField('biometricProgress', {
  args: {
    cartId: stringArg(),
    channel: CartChannel,
  },
  type: BiometricProgressResponse,
  resolve() {
    // this is mocked data until the DESL swagger is ready to integrate with
    return {
      infoBanner: 'NO_MATCH',
      isContinueEnabled: false,
      showResend: true,
      steps: [
        {
          stepId: 'TEXT_SENT',
          label: 'Text sent',
          status: 'DONE',
        },
        {
          stepId: 'RESULTS',
          label: 'Results',
          status: 'ERROR',
        },
      ],
    };
  },
});
