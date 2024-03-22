export interface AddAccessFeedback {
  message: string;
  title?: string;
}

export type FeedbackByResponseCode = {
  [key: number]: AddAccessFeedback;
};
