export interface Interfaces {


}


export interface SignupRequest{
  nome:string,
  cognome:string,
  password:string,
  email:string,
  età:number,
  continente:string,
  nazione:string,
  role:string
}
export interface LoginRequest{
  email:string,
  password:string
}
