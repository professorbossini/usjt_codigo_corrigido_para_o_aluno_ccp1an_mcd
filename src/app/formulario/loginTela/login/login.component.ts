import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  senha: string;
  form: FormGroup;

  ngOnInit(){
    this.form = new FormGroup({
      login: new FormControl (null, {
        validators: [Validators.required]
      }),
      senha: new FormControl(null,{
        validators: [Validators.required]
      })
    })}
constructor(public userService: UserService, route: ActivatedRoute){}

  onFazerLogin(){
    this.userService.verificarUser(
      this.form.value.login,
      this.form.value.senha
   );

}


}
