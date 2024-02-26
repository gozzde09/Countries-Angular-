import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uppgift';
  countries:any =[]
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<any>('https://restcountries.com/v3.1/region/europe').subscribe(data => {
      // console.log(data);
      this.countries=data;
    })
  }
}
