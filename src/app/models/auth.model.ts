export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}
