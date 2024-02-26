import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Country {
  name: {
    common: string;
    official: string;
  };
  translations: {
    swe: {
      common: string;
    };
  };
  coatOfArms: { png: string };
  flags: {
    svg: string;
    png: string;
  };
  capital: string[];
  languages: { [key: string]: string };
  currencies: { [code: string]: { name: string; symbol: string } };
  population: number;
  area: number;
  region: string;
  subregion: string;
  car: { side: string };
  maps: { googleMaps: string; openStreetMaps: string };
  unsplashImages?: string[];
}
@Component({
  selector: 'app-countrydetails',
  templateUrl: './countrydetails.component.html',
  styleUrl: './countrydetails.component.css'
})
export class CountrydetailsComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  countries: Country[] = [];
  selectedCountry: Country | null = null;
  async addImagesAndCards(searchQuery: string) {
    const response = await this.http.get(
      `https://api.unsplash.com/search/photos?query=${searchQuery}`,
      {
        headers: {
          Authorization: 'Client-ID YXkvGz4I8Jzxgr9QCjb3uCZC7y4_wyYabGwGEtXUJJg',
        },
      }
    ).toPromise();
    const images = (response as any).results;
    let unsplashImages = images.slice(0, 5).map((image: any) => image.urls.regular);
     if (this.selectedCountry) {
     this.selectedCountry.unsplashImages = unsplashImages;
     }

  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const countryId = params.get('id');
      console.log(countryId);
      if (countryId) {
        this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${countryId}?fullText=true`).subscribe(data => {
          this.countries = data
          this.selectedCountry = this.countries.find(country => country.name.common === countryId) || null
          this.addImagesAndCards(countryId);
          //  console.log(this.selectedCountry);
        })
      }
    });
  }
}
