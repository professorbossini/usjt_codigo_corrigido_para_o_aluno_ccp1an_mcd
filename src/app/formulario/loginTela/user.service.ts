import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../loginTela/user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { bcryptjs } from 'bcryptjs';


@Injectable({ providedIn: "root"})
export class UserService {
  private user : User[] = [];
  private listaUserAtualizada = new Subject<User[]>();

constructor(private httpClient: HttpClient, private router: Router){

}
  getUser(): void{
    this.httpClient.get<{mensagem: string, users: any}>('http://localhost:3030/auth/authenticate')
    .pipe(map((dados) => {
      return dados.users.map(user =>{
        return{
          id: user._id,
          email: user.email,
          login: user.login
        }
      })
    }))
    .subscribe((dados)=>{
      this.user = dados.users;
      this.listaUserAtualizada.next([...this.user]);
    })
  }

  adicionarUser(email: string, login: String, senha: string){
    const user: User ={
      id: null,
      email: email,
      login: login,
      senha: senha
    };
    this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3030/auth/register', user)
  .subscribe((dados) =>{
    console.log(dados.mensagem);
    user.id = dados.id,
    this.user.push(user);
    this.listaUserAtualizada.next([...this.user]);
    this.router.navigate(["/"]);
  });
    }

  verificarUser(login: string, senha: string){
      this.httpClient.get<{ id: String, login: String, senha: String}>
      (`http://localhost:3030/auth/register`);
      this.router.navigate(['/principal'])
    }



  // getListaUserAtualizadaObservable(){
  //   return this.listaUserAtualizada.asObservable();
  // }



}
