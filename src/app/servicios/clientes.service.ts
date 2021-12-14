import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {delay}  from 'rxjs/operators';
import { Cliente } from '../modelos/Cliente';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = 'https://apibancosj.salinacruz.tecnm.mx/public/api/clientes';
  constructor(private http: HttpClient) { }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  header = new HttpHeaders()
 // .set('Accept', 'application/json')
  .set('Content-Type', 'application/json');
  //.set('Access-Control-Allow-Origin', '*');
  getClientes(){
    return this.http.get(this.url).pipe(
      delay(500));
  }
  showCliente(id: number){
    return this.http.get<any[]>(`${this.url}/show/${id}`,{headers:this.header});
  }
  postCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/create`,cliente,{headers:this.header});
  }
  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/update/${cliente.id}`,cliente,{headers:this.header});
  }
  deleteCliente(id: number){
    return this.http.delete<any[]>(`${this.url}/delete/${id}`,{headers:this.header});
  }
  clienteCuentas(id: number){
    return this.http.get<any[]>(`${this.url}/cuentas/${id}`,{headers:this.header});
  }
}
