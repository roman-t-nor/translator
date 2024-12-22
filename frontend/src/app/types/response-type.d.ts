export type ResponseType = {
  result: 'success' | 'error';
  message: string;
  payload?: string;
};
