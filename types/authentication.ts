export interface RegisterData {
    name:{value:string , isValid:boolean},
    email:{value:string , isValid:boolean}
    password:{value:string , isValid:boolean}
}

export type LoginData = Partial<RegisterData>;

export type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  ;