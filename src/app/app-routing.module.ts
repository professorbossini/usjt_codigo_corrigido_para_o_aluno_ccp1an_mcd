import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LembreteListaComponent } from './formulario/lembrete/lembrete-lista/lembrete-lista.component';
import { LembreteInserirComponent } from './formulario/lembrete/lembrete-inserir/lembrete-inserir.component';
import { CabecalhoComponent } from './formulario/cabecalho/cabecalho.component';
import { CabecalhoLoginComponent } from './formulario/loginTela/cabecalho-login/cabecalho-login.component';


import { LoginComponent } from './formulario/loginTela/login/login.component';
import { CadastroComponent} from './formulario/loginTela/cadastro/cadastro.component';




const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: CadastroComponent},
  {path: 'principal', component: LembreteListaComponent },
  {path: 'criar', component: LembreteInserirComponent},
  {path: 'editar/:idLembrete', component: LembreteInserirComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
  export class AppRoutingModule{
  }
