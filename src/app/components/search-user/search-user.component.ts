import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  providers: [UserService]
})

export class SearchUserComponent implements OnInit {
  public title: string = "Search User";
  public user: User;
  public usuarioData: Array<User>;
  public error: string = "";

  public searchUserForm = this.fb.group({
    'nameUser': ['', [Validators.required, Validators.minLength(4)]]
  }, {
    validators: this.stringNoPermitida()
  });

  constructor(
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.title = "Search User";
    this.user = new User('', 1, '', '', 0, '', false, 0);
    this.usuarioData = []
  }

  ngOnInit(): void {
    console.log("search user component component initialized");
  }

  onSubmit() {
    if (this.searchUserForm.invalid) {

      if (this.searchUserForm.value.nameUser == "") {
        this.error = "El campo nombre de usuario es requerido";
      }

      if (this.searchUserForm.value.nameUser.length < 4) {
        this.error = "No se pueden ingresar menos de 4 caracteres";
      }
      return;
    }

    if (this.searchUserForm.valid && this.error == "") {
      this._router.navigate(['list-user', this.searchUserForm.value.nameUser]);
    }
  }

  /**
   * Funcion para validar cadenas invalidas
   * @author <Jhonny Cortes>
   */
  stringNoPermitida() {
    return (formGroup: FormGroup) => {
      if (formGroup.get('nameUser')?.value === "doublevpartners") {
        this.error = "No se puede ingresar la palabra 'doublevpartners'";
      } else {
        this.error = "";
      }
    }
  }
}
