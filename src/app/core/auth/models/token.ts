export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  mfaRequired?: boolean;
  deviceId?: string;
}