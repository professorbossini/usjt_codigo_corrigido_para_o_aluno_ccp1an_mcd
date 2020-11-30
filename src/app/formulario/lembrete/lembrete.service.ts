import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lembrete } from './lembrete.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class LembreteService {
  private lembretes: Lembrete [] = [];
  private listaLembretesAtualizado = new Subject<Lembrete[]>();


  constructor(private httpClient: HttpClient, private router: Router){};


getLembretes(): void {
    this.httpClient.get <{mensagem: string, lembrete:any}>(
      'http://localhost:3030/api/principal'
    )
    .pipe(map((dados) => {
      return dados.lembrete.map(lembrete => {
        return {
          id:lembrete._id,
          dataHoje: lembrete.dataHoje,
          dataPrev: lembrete.dataPrev,
          nome: lembrete.nome,
          conteudoLembrete: lembrete.conteudoLembrete,
          imagemURL: lembrete.imagemURL,
        }
      });
    }))
    .subscribe((lembretes) =>{
      this.lembretes = lembretes,
      this.listaLembretesAtualizado.next([...this.lembretes]);
    });
  }

  adicionarLembrete(dataHoje: string, dataPrev: string, nome:string, conteudoLembrete: string, imagem: File){
    //   const lem: Lembrete = {
    //   id: null,
    //   dataHoje: dataHoje,
    //   dataPrev: dataPrev,
    //   nome: nome,
    //   conteudoLembrete: conteudoLembrete
    // };
    const dadosLem = new FormData();
      dadosLem.append("dataHoje", dataHoje);
      dadosLem.append('dataPrev', dataPrev);
      dadosLem.append('nome', nome);
      dadosLem.append('conteudoLembrete', conteudoLembrete);
      dadosLem.append('imagem', imagem);

    this.httpClient.post<{mensagem: string, lembrete: Lembrete}>('http://localhost:3030/api/principal',
      dadosLem).subscribe((dados) => {
      // lem.id = dados.id;
      const lembrete: Lembrete = {
        id: dados.lembrete.id,
        dataHoje: dataHoje,
        dataPrev: dataPrev,
        nome: nome,
        conteudoLembrete: conteudoLembrete,
        imagemURL: dados.lembrete.imagemURL
      };
      this.lembretes.push(lembrete);
      this.listaLembretesAtualizado.next([...this.lembretes]);
      this.router.navigate(['/principal']);
      })
    }

  removerLembrete (id: string): void{
    this.httpClient.delete(`http://localhost:3030/api/principal/${id}`)
    .subscribe(() => {
      this.lembretes = this.lembretes.filter((lem)=>{
        return lem.id !== id
      });
      this.listaLembretesAtualizado.next([...this.lembretes]);
      this.router.navigate(['/principal']);
    });
  }

  getListaLembretesAtualizadoObservable(){
    return this.listaLembretesAtualizado.asObservable();
  }

  getLembrete (idLembrete: string){
    //return {...this.lembretes.find((lem) => lem.id === idLembrete)};
    return this.httpClient.get<{ id: string, dataHoje: String, dataPrev: String, nome: string, conteudoLembrete: string}>
    (`http://localhost:3030/api/principal/${idLembrete}`);
  }

  atualizarLembrete(id:string, dataHoje: String, dataPrev: String, nome: string, conteudoLembrete: string, imagemURL: string){
    const lembrete: Lembrete = {id, dataHoje, dataPrev, nome, conteudoLembrete, imagemURL};
    this.httpClient.put(`http://localhost:3030/api/principal/${id}`, lembrete)
    .subscribe((res => {
      const copia = [...this.lembretes];
      const indice = copia.findIndex (lem => lem.id === lembrete.id);
      copia[indice] = lembrete;
      this.lembretes =  copia;
      this.listaLembretesAtualizado.next([...this.lembretes]);
      this.router.navigate(['/principal']);
    }));
  }




}
