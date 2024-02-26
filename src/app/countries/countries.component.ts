import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Country {  // Interface för att definiera strukturen på de objekt som hämtas från API:et.
  name: {
    common: string;
  };
  translations: {
    swe: {
      common: string;
    };
  };
  flags: {
    png: string;
  };
  capital: string[];
  languages: { [key: string]: string };
}
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})

export class CountriesComponent implements OnInit {
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }
  countries: Country[] = []; //Array för att spara data
  selectedCountry: Country | null = null; // Variable för att spara vald land
  page: number = 1;
  lastPage: number = 1;
  searchWord: string = "";

  handleSearch(query: string) {
    console.log("Sök resultat:", query);
    this.searchWord = query;
    this.page = 1;
  }

  ngOnInit() {
    // this.http.get<Country[]>('https://restcountries.com/v3.1/region/europe').subscribe(data => {
    this.http.get<Country[]>('  https://restcountries.com/v3.1/all').subscribe(data => {
      this.countries = data;
      console.log(this.countries.length);

      this.processCountries();
    });
  }
  processCountries() {
    this.countries = this.countries.filter(country => country.capital !== undefined); //har inte capital, tar bort dem
    this.countries.sort((a, b) => a.translations.swe.common.localeCompare(b.translations.swe.common, 'sv'));
  }
  ngAfterContentChecked(): void { //Tar ändringar om sista sida
    this.lastPage = Math.ceil(this.countries.length / 12);
    this.cdr.detectChanges();
  }
  get filteredCountries() {
    const filtered = this.countries.filter(country =>
      country.translations.swe.common.toLowerCase().includes(this.searchWord.toLowerCase()));
    const itemsPerPage = 12;
    this.lastPage = Math.ceil(filtered.length / itemsPerPage);
    const start = (this.page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }
  // SIDA KONTROLL
  next() {
    this.page++;
  }

  previous() {
    this.page--;
  }

  first() { // Hoppa till första sidan
    this.page = 1;
  }

  last() { // Hoppa till sista sidan
    this.page = this.lastPage;
  }
  getPages(): number[] {
    return Array.from({ length: this.lastPage }, (_, index) => index + 1);
  }

  setPage(pageNum: number) {
    this.page = pageNum;
  }
}
