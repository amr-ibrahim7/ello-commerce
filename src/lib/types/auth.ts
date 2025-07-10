export interface AuthSession {
  expires?: string;
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
}
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
  };
}
