/**
 *
 */
export default interface ApiResponse<T> {
  isOk: boolean;
  data?: T;
  message: string;
}
