export interface LoginDto {
  email: string;
  password: string;
  rememberDevice: boolean;
}

export interface LoginResponse {
  accessToken: string;
  mfaRequired: boolean;
  deviceId?: string;
}