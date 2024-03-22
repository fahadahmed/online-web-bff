import { AddAccessFeedback, FeedbackByResponseCode } from '../typings';

export const PREPAID_SUCCESS_FEEDBACK: AddAccessFeedback = {
  title: 'Your Prepaid mobile has been added.',
  message: '',
};

export const POSTPAID_SUCCESS_FEEDBACK: AddAccessFeedback = {
  title: 'Your Pay Monthly mobile has been added.',
  message: 'Now you can view the usage for this product.',
};

export const FEEDBACK_BY_ACCOUNT_ACCESS_RESPONSE_CODE: FeedbackByResponseCode =
  {
    2009: {
      title: 'Your account has been added.',
      message:
        'As the owner you can view usage, add or change products and pay bills.',
    },
    2011: {
      title: 'Your account has been added.',
      message:
        'As the owner you can view usage, add or change products and pay bills.',
    },
    2018: {
      title: 'An email has been sent for approval.',
      message: '',
    },
    3014: {
      message:
        'Your password needs to be changed. Please message us in the Help section of the app so we can change it for you.',
    },
    4028: {
      message:
        'This business name doesn’t match our records. Please try an alternative wording.',
    },
    4034: {
      message: 'Your password is incorrect. Please try again.',
    },
    4035: {
      message:
        'The name provided does not match our records. Please try again.',
    },
    4045: {
      message:
        'Sorry, you don’t have the authority to add this account to your profile.',
    },
    4063: {
      message: 'This line number doesn’t belong this account.',
    },
    4068: {
      message:
        'You’ve reached the maximum number of requests to add access. Please try again later or contact us.',
    },
    4069: {
      message: 'You already have access to this account.',
    },
  };

export const FEEDBACK_BY_LINE_ACCESS_RESPONSE_CODE: FeedbackByResponseCode = {
  3004: {
    message: 'The security code has been sent via SMS.',
  },
  4067: {
    message:
      'Your security code has expired. Please start again to get a new code.',
  },
  4068: {
    message:
      'You’ve reached the maximum number of requests to add access. Please try again later or contact us.',
  },
  4069: {
    message: 'You already have access to this mobile or broadband line.',
  },
  4070: {
    message: 'Your security code is incorrect. Please try again.',
  },
  4147: {
    message:
      'Sorry, you don’t have the authority to add this mobile or broadband line to your profile.',
  },
};
