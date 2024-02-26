import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HemComponent } from './hem/hem.component';
import { CountriesComponent } from './countries/countries.component';
import { CountrydetailsComponent } from './countrydetails/countrydetails.component';

const routes: Routes = [
  { path: '', component: HemComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/:id', component: CountrydetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
