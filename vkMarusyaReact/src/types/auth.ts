export interface AuthInfo {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

export interface SuccessfulResult {
  result: boolean;
}

export interface ErrorResponse {
  error: string;
}
