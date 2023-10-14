import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: 'show-user',
  templateUrl: './show-user.component.html',
  providers: [UserService]
})
export class ShowUserComponent implements OnInit {
  public title: string = "Show User";
  public paramLogin: string = '';
  public user: User;
  public show_user: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Show User";
    this.user = new User('', 1, '', '', 0, '', false, 0);
  }

  ngOnInit(): void {
    this.paramLogin = this._route.snapshot.params['login'];

  }

  ngAfterContentInit(): void {
    this.getUser();
  }

  /**
   * Funcion para obtener los datos de un usuario
   * @author <Jhonny Cortes>
   */
  getUser() {
    this._userService.getUser(this.paramLogin).subscribe(
      response => {
        this.user = response;
        this.user = new User(this.user.login, this.user.id,
          this.user.avatar_url, this.user.repos_url,
          this.user.score, this.user.type,
          this.user.site_admin, this.user.followers);
        this.show_user = true;
      }
    )
  }

}
