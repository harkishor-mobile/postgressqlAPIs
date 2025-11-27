import StatusCode from './statusCode';

interface ResponseOptions<T = unknown> {
  data?: T | null; // ← allow null
  message?: string;
  statusCode?: number;
}

export const successResponse = <T = unknown>({
  data = null,
  message = 'Request successful',
  statusCode = StatusCode.OK,
}: ResponseOptions<T | null>) => {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
};

export const errorResponse = ({
  message = 'Something went wrong',
  statusCode = StatusCode.INTERNAL_SERVER_ERROR,
  data = null,
}: ResponseOptions<unknown | null>) => {
  return {
    success: false,
    statusCode,
    message,
    data,
  };
};
