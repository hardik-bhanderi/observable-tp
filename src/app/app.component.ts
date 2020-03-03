import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {of , from } from 'rxjs'
import {concatMap, map , concatAll , switchMap , mergeMap} from 'rxjs/operators'
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  arr = [ 1 ,2 , 3, 4]
  constructor(private http : HttpClient){
    this.getInfo().subscribe({
      next: res => {
        console.log(res)
      }
    })
  }

 getInfo(){

  return from(this.arr).pipe(
    concatMap(num => {
        console.log(num)
      return this.http.get("https://staging-rma.castlecraft.in/api/info").pipe(
        map(data => {
          console.log(data)
          return data
        }),
      )
    }),
    concatAll(),
    switchMap(()=>{
      console.log("hello")
      return of()
    })
  )
   

 }

}
