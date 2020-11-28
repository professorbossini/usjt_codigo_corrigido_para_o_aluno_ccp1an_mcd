import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';

@Component({
  selector: 'app-lembrete-lista',
  templateUrl: './lembrete-lista.component.html',
  styleUrls: ['./lembrete-lista.component.css']
})
export class LembreteListaComponent implements OnInit, OnDestroy {

  lembretes: Lembrete[] = [];
  private lembreteSubscription: Subscription;
  public estaCarregando = false;

  constructor(public lembreteService: LembreteService){}

  ngOnDestroy(): void{
    this.lembreteSubscription.unsubscribe();
  }

  onDelete (id: string): void{
    this.lembreteService.removerLembrete(id);
    }

  ngOnInit(): void {
    this.lembreteService.getLembretes();
    this.lembreteSubscription = this.lembreteService
    .getListaLembretesAtualizadoObservable()
    .subscribe((lembretes: Lembrete[]) =>{
      this.estaCarregando = false;
      this.lembretes = lembretes;
    });
  }




}
