export interface AuthSession {
  expires?: string;
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
}
