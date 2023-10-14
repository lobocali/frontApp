import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { Observable } from "rxjs";
import { forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  providers: [UserService]
})
export class ListUserComponent implements OnInit {
  public title: string;
  public user: User;
  public usuarioArray: Array<any> = [];
  public usuarioData: Array<any>;
  public status_user: any = '';
  public cantidadUser: any = 0;
  public hijoCargado = false;
  public param: string = '';
  public usuariosLabel: string[];
  public responseArray: any;
  public urlParameter: string = "";
  public usuarios: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ) {
    this.title = "List User";
    this.user = new User('', 1, '', '', 0, '', false, 0);
    this.usuarioData = [];
    this.usuariosLabel = [];
  }

  ngOnInit(): void {
    this.getUser();
  }

  cargarHijo() {
    this.hijoCargado = true;
  }

  get getUsuarioArray() {
    return `${this.usuarioArray}%`;
  }

  /**
   * Funcion para obtener los datos de los usuarios
   * Igualmente se consultan los seguidores de cada usuario
   * @author<Jhonny Cortes J>
   */
  getUser() {
    this._route.params.pipe(
      switchMap(params => {
        // Obtener el parámetro de la URL
        this.urlParameter = params['login'];

        // Usar el parámetro para llamar al primer servicio
        return this._userService.getUsers(this.urlParameter);
      }),
      switchMap((dataFromFirstService: any) => {
        let items = dataFromFirstService.items.slice(0, 10);

        // Iterar sobre los datos obtenidos del primer servicio
        // y hacer una solicitud al segundo servicio por cada uno
        const observables = items.map((item: any) => {
          return this._userService.getFollowers(item.followers_url);
        });

        // Combinar todas las solicitudes al segundo servicio usando forkJoin
        return forkJoin(observables).pipe(
          map((responses: any) => {

            // Crear instancias de la clase User con los datos combinados
            return items.map((user: any, index: number) => {
              return new User(
                user.login,
                user.id,
                user.avatar_url,
                user.repos_url,
                user.score,
                user.type,
                user.site_admin,
                responses[index].length
              );
            });
          })
        );
      })
    ).subscribe(
      (usuarios: any) => {
        // Guardar las instancias de usuarios
        this.usuarios = usuarios;
        this.cargarHijo();
      },
      (error) => {
        console.error('Error al obtener datos o realizar las solicitudes al segundo servicio:', error);
      }
    );
  }

  /**
   * Se redirecciona a la pagina show-user
   * @param user
   * @author <Jhonny Cortes>
   */
  redirectShowUser(user: User) {
    this._userService.setScoreUser(user.score);
    this._router.navigate(['/show-user', user.login]);
  }
}
