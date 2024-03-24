import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelDetailsGuard } from './shared/guards/hotel-details.guard';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelEditGuard } from './shared/guards/hotel-edit.guard';
import { HotelListMeublesComponent } from './hotel-list-meubles/hotel-list-meubles.component';
import { HotelListNonMeublesComponent } from './hotel-list-non-meubles/hotel-list-non-meubles.component';
import { MapiolconceptComponent } from './mapiolconcept/mapiolconcept.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'logements/:id',
        component: HotelDetailsComponent,
        canActivate: [HotelDetailsGuard]
      },
      {
        path: 'logements',
        component: HotelListComponent
      },
      {
        path: 'logements',
        component: HotelListComponent
      },
      {
        path: 'logements_meublés',
        component: HotelListMeublesComponent
      },
      {
        path: 'logements_non_meublés',
        component: HotelListNonMeublesComponent
      },
      {
        path: 'logements/:id/edit',
        component: HotelEditComponent,
        canDeactivate: [HotelEditGuard]
      },
      {
        path: 'le-concept-ma-piol',
        component: MapiolconceptComponent
      }
    ]),
  ],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
