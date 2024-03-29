import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { RemoveCommaPipe } from '../shared/pipes/remove-comma.pipe';

import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelData } from './shared/api/hotel.data';
import { HotelListMeublesComponent } from './hotel-list-meubles/hotel-list-meubles.component';
import { HotelListNonMeublesComponent } from './hotel-list-non-meubles/hotel-list-non-meubles.component';
import { MapiolconceptComponent } from './mapiolconcept/mapiolconcept.component';
import { RegistrationComponent } from './registration/registration.component';
import { UtilisateurData } from './shared/api/utilisateur.data';


@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailsComponent,
    RemoveCommaPipe,
    HotelEditComponent,
    HotelListMeublesComponent,
    HotelListNonMeublesComponent,
    MapiolconceptComponent,
    RegistrationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HotelRoutingModule,
    InMemoryWebApiModule.forFeature(HotelData),
    InMemoryWebApiModule.forFeature(UtilisateurData)
  ]
})
export class HotelModule { }
