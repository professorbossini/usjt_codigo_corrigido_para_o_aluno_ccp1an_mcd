import { Component,  OnInit,  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit{
  public email:string;
  public login:string;
  private idUser: string;
  public user: User;
  form: FormGroup;

  constructor(public userService: UserService, public route: ActivatedRoute ){}

  ngOnInit(){
  this.form = new FormGroup({
    email: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    login: new FormControl (null, {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    senha: new FormControl(null,{
      validators: [Validators.required,  Validators.minLength(3)]
    })
  })}

  onAdicionarUser(){
    if(this.form.invalid){
      return;
  }
    this.userService.adicionarUser(
    this.form.value.email,
    this.form.value.login,
    this.form.value.senha
  )

    this.form.reset();
  }
}


