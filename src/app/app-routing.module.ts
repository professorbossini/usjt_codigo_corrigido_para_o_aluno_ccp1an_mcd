import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LembreteListaComponent } from './formulario/lembrete/lembrete-lista/lembrete-lista.component';
import { LembreteInserirComponent } from './formulario/lembrete/lembrete-inserir/lembrete-inserir.component';

import { LoginComponent } from './formulario/loginTela/login/login.component';
import { CadastroComponent} from './formulario/loginTela/cadastro/cadastro.component';




const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
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
