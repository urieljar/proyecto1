/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/modelos/Cliente';
import { ClientesService } from '../../../servicios/clientes.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {
  id: any;
  titulo= '';
  cliente: Cliente = new Cliente();

  constructor(private route: ActivatedRoute,
    private clientesService: ClientesService,
    private alert: AlertController,
    private r: Router){ }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id == -1) {
      this.titulo = 'Nuevo Cliente';
    } else {
      this.titulo = 'Editar Cliente';
      this.clientesService.showCliente(this.id).subscribe(
        res => {
        this.cliente = res['data'];
        console.log('cliente', this.cliente);
      });
    }
  }
  async alerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert =await this.alert.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['Ok']
    });
    await alert.present();
  }
  guardar(){
    let peticion: Observable<any>;
    if (this.cliente.id) {
      peticion = this.clientesService.updateCliente(this.cliente);
    } else {
      peticion = this.clientesService.postCliente(this.cliente);
    }
    peticion.subscribe(
      res => {
      if (this.cliente.id) {
        this.alerta('Modificacion', this.cliente.nombre, 'Modificación exitosa!');
      } else {
        this.alerta('Alta a Usuario', this.cliente.nombre, 'Alta exitosa!');
      }
      this.r.navigate(['/clientes']);
    });
  }
}
