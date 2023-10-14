/**
 * Modelo de usuarios
 */
export class User {
  constructor(
    public login: string,
    public id:number,
    public avatar_url:string,
    public repos_url:string,
    public score:number,
    public type:string,
    public site_admin:boolean,
    public followers:number,
  ){};

}
