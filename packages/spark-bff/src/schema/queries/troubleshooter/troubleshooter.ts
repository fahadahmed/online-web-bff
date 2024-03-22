import { enumType, nullable, objectType, queryField, stringArg } from 'nexus';

export const BroadbandTroubleshooterCTAType = enumType({
  name: 'BroadbandTroubleshooterCTAType',
  members: ['TROUBLESHOOTING_STEP', 'CHAT'],
  description:
    'The cta type will allow for mapping to be done on the presentation side to ensure the correct CTA can be presented',
});

export const BroadbandTroubleshooterAvailableCTA = objectType({
  name: 'BroadbandTroubleshooterAvailableCTA',
  description: 'Object having fields for availableCTA',
  definition(t) {
    t.string('label', {
      description: 'The label for the CTA.',
    });
    t.field('type', {
      type: BroadbandTroubleshooterCTAType,
      description:
        'The cta type will allow for mapping to be done on the presentation side to ensure the correct CTA can be presented',
    });
    t.nullable.string('webCTA', {
      description: 'The web link for the article CTA.',
    });
  },
});

export const BroadbandTroubleshooterGallery = objectType({
  name: 'BroadbandTroubleshooterGallery',
  description: 'Object having fields for Gallery',
  definition(t) {
    t.nullable.string('url', {
      description:
        'The URI to the image to render in the gallery. If a gallery item is present it is assumed that it will have an image attribute associated with it.',
    });
  },
});

export const BroadbandTroubleshooterComponentType = enumType({
  name: 'BroadbandTroubleshooterComponentType',
  description:
    'The type of component that should be rendered onscreen for this body content element.',
  members: [
    'CHECKLIST_ITEM',
    'TROUBLESHOOT_MODEM_DETAILS',
    'HEADING',
    'HIGHLIGHTED_NOTE',
  ],
});

export const BroadbandTroubleshooterBody = objectType({
  name: 'BroadbandTroubleshooterBody',
  description: 'Object having fields for body',
  definition(t) {
    t.nullable.string('copy', {
      description:
        'The mandatory text copy associated with the block of content. It is assumed that a block of content will contain at least one character of text for display or screen reader purposes.',
    });
    t.nullable.field('componentType', {
      type: BroadbandTroubleshooterComponentType,
    });
  },
});

export const BroadbandTroubleshooterStep = objectType({
  name: 'BroadbandTroubleshooterStep',
  description: 'Object having fields for troubleshooting step',
  definition(t) {
    t.string('stepId', {
      description:
        'The unique identifier for the connection troubleshooting step.',
    });
    t.nullable.string('title', {
      description: 'The title/headline of the connection troubleshooting step.',
    });
    t.nullable.list.field('bodyList', {
      type: BroadbandTroubleshooterBody,
      description:
        'A list of body content text that describes the troubleshooting actions for this step. If no body content is defined in the downstream source then an empty list is returned.',
    });
    t.nullable.list.field('imageList', {
      type: BroadbandTroubleshooterGallery,
      description:
        'A list of images associated with this troubleshooting step. If no images are associated with this step then an empty list is returned.',
    });
    t.nullable.string('ctaTitle', {
      description:
        'The title that a list of CTA options should be grouped under and semantically relate to.',
    });
    t.list.field('ctaList', {
      type: BroadbandTroubleshooterAvailableCTA,
      description:
        'A list of Call To Actions (CTA) representing the next steps the customer can take to resolve their connection issue. If no relevant CTAs are possible for this troubleshooting step then an empty availableCTAs list will be returned.',
    });
  },
});

export const BroadbandTroubleshooterResultsResponse = objectType({
  name: 'BroadbandTroubleshooterResultsResponse',
  description: 'Object having fields for troubleshooter results response',
  definition(t) {
    t.nullable.string('modemManufacturer', {
      description: 'The manufacturer of the modem if known.',
    });
    t.nullable.string('modemImage', {
      description:
        'A URI that is a reference to the AEM DAM image resource of this specific modem model.',
    });
    t.nullable.string('modemSerialNumber', {
      description: 'The gateway modem serial number if known.',
    });
    t.string('diagnosticSummaryCode', {
      description:
        'The recognised diagnostic summary code that the troubleshooting steps in the result are associated with.',
    });
    t.string('initialStep', {
      description:
        ' The first Step ID to take in the connection troubleshooting micro-journey.',
    });
    t.string('stepForModemModel', {
      description:
        'The modem model that these connection troubleshooting steps relate to.',
    });
    t.list.field('helpSteps', {
      type: BroadbandTroubleshooterStep,
      description:
        'A list of troubleshooting steps associated with this diagnostic summary code and modem model.',
    });
  },
});

export const BroadbandTroubleshooterArgs = {
  lineNumber: stringArg(),
  diagnosticCode: stringArg(),
  modemModel: nullable(stringArg()),
};

export const troubleshooterQueryField = queryField('troubleshooter', {
  type: BroadbandTroubleshooterResultsResponse,
  args: BroadbandTroubleshooterArgs,
  async resolve(_, params, { dataSources: { connectionTroubleshooterAPI } }) {
    const { lineNumber, diagnosticCode, modemModel } = params;

    return connectionTroubleshooterAPI.getTroubleshooterResponse(
      lineNumber,
      diagnosticCode,
      modemModel,
    );
  },
});
