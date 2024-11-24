export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  error: string;
  message: string;
}
