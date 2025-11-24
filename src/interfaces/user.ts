export interface User {
    id: string,
    email: string,
    password: string
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}