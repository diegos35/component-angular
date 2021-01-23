import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TerceroService {
  private API_ENDPOINT = "http://localhost:8000/api/";

  constructor(private http: HttpClient) {}

  /*
  * Metodo guardar datos de la categoría
  * @param data  - contiene toda la trama datos para ser enviada
  */
  guardar(data:any, id:any): Observable<any> { 
    const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      });

    if (id === null || id === undefined){
      return this.http.post(this.API_ENDPOINT + 'tercero/',  JSON.stringify(data), { headers: headers });
    }else{
      return this.http.put(this.API_ENDPOINT +  'tercero/'+ id, JSON.stringify(data) , { headers: headers });
    } 
  }


  /*
  * Metodo delete para eliminar categoria
  * @param id  - contiene el id de la categoría
  */   
  delete(id): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    return this.http.delete(this.API_ENDPOINT + 'categoria/' + id, { headers: headers });
  }

  /*
  * Metodo obtener datos de la categoría3
  * @param id  - contiene el id de la categoría
  */
  obtener(id:any) {
      id =(id=== null || id === undefined) ? '0' : id;
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      return this.http.get(this.API_ENDPOINT + 'categoria/' + id, {headers: headers});
  }
}
