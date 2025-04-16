export interface IRegister {
  name: string;
  password: string;
  email: string;
  phone?: string;
}

export interface ILogin {
  password: string;
  email: string;
}
