import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MapiolconceptComponent } from './hotels/mapiolconcept/mapiolconcept.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
      
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
