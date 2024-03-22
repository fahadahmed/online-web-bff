import { definitions } from 'generated/typings/connectionTroubleshooterService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

export const transformCTAList = (
  ctaList: definitions['AvailableCTA'][],
): NexusGenRootTypes['BroadbandTroubleshooterAvailableCTA'][] => {
  return ctaList.map(({ ctaLabel, ctaType, webCTALink }) => {
    return {
      label: ctaLabel,
      type: ctaType,
      webCTA: webCTALink,
    };
  });
};

export const transformGalleryList = (
  gallery: definitions['Gallery'][],
): NexusGenRootTypes['BroadbandTroubleshooterGallery'][] => {
  return gallery?.map(({ image }) => {
    return { url: image };
  });
};

export const transformTroubleShootingSteps = (
  troubleshootingSteps: definitions['TroubleshootingStep'][],
): NexusGenRootTypes['BroadbandTroubleshooterStep'][] => {
  return troubleshootingSteps.map(
    ({ body, gallery, availableCTAs, ...restOfTroubleshootingSteps }) => {
      return {
        bodyList: body,
        imageList: transformGalleryList(gallery),
        ctaList: transformCTAList(availableCTAs),
        ...restOfTroubleshootingSteps,
      };
    },
  );
};

export const transformTroubleshooterResponse = (
  troubleshooterResponse?: definitions['TroubleshooterResultsResponse'],
): NexusGenRootTypes['BroadbandTroubleshooterResultsResponse'] => {
  if (!troubleshooterResponse) {
    return null;
  }
  const {
    lineDetails: { modemManufacturer, modemImage, modemSerialNumber },
    diagnosticSummaryCode,
    initialStepId,
    stepsForModemModel,
    troubleshootingSteps,
  } = troubleshooterResponse;
  return {
    modemManufacturer,
    modemImage,
    modemSerialNumber,
    stepForModemModel: stepsForModemModel,
    diagnosticSummaryCode,
    initialStep: initialStepId,
    helpSteps: transformTroubleShootingSteps(troubleshootingSteps),
  };
};
