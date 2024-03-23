import { Component, OnInit } from '@angular/core';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  public hotels: IHotel[] = [];

  public showBadge: boolean = true;
  public filteredHotels: IHotel[];
  public receivedRating: string;

  private _hotelFilterVille = 'mot';
  private _hotelFilterQuartier = '';
  private _hotelFilterType = '';
  private _categorie = '';

  public errorMsg: string;

  public hotel: IHotel;
  public pageTitle: string
  //public choixCategorie: string;

  

  // racourci typescript
  constructor(private hotelListService: HotelListService){}

  ngOnInit() {
    // code for lifecycle hook
    this.hotelListService.getHotels().subscribe({
      next: hotels => {
        this.hotels = hotels;
        this.filteredHotels = this.hotels;
      },
      error: err => this.errorMsg = err
    });

   
    
  }

  // public categorieChoice(categorieChoix: string):void{

  //   this.choixCategorie = categorieChoix;
  //   if(this.hotel.categorie == 'meubles'){

  //   }
  // }

  public toggleIsNewBadge(): void {
    this.showBadge = !this.showBadge;
  }

  public receiveRatingClick(message: string): void {
    this.receivedRating = message;
    console.log(message);
  }


  public get hotelFilterVille(): string{
    return this._hotelFilterVille;
   }
   public get hotelFilterQuartier(): string{
    return this._hotelFilterQuartier;
   }
   public get hotelFilterType(): string{
    return this._hotelFilterType;
   }
  //  public get categorie(): string{
  //   return this._categorie;
  //  }

  
  
  public set hotelFilterVille(filter: string){
    this._hotelFilterVille = filter;
    this.filteredHotels = this.hotelFilterVille ? this.filterHotelsVille(this.hotelFilterVille, this.hotelFilterQuartier, this.hotelFilterType) : this.hotels;

    if (this._hotelFilterVille) {
      this.updatePageTitle(this._hotelFilterVille);
    }else{
      this.pageTitle = '';
    }
  }
  public set hotelFilterQuartier(filter: string){
    this._hotelFilterQuartier = filter;
    this.filteredHotels = this.hotelFilterQuartier ? this.filterHotelsVille(this.hotelFilterVille, this.hotelFilterQuartier, this.hotelFilterType) : this.hotels;
  }
  public set hotelFilterType(filter: string){
    this._hotelFilterType = filter;
    this.filteredHotels = this.hotelFilterType ? this.filterHotelsVille(this.hotelFilterVille, this.hotelFilterQuartier, this.hotelFilterType) : this.hotels;
  }
  // public set hotelFilterCategorie(filter: string){
  //   this._categorie = filter;
  //   this.filteredHotels = this.hotelFilterCategorie ? this.filterHotelsVille(this.hotelFilterVille, this.hotelFilterQuartier, this.hotelFilterType) : this.hotels;

  // }
  
  
  updatePageTitle(cityName: string): void {
    this.pageTitle = `Logements à ${cityName}`;
  }

  
  private filterHotelsVille(criteriaVille: string, criteriaQuartier: string, criteriaType:string): IHotel[]{

    criteriaVille = criteriaVille.toLocaleLowerCase();
    criteriaQuartier = criteriaQuartier.toLocaleLowerCase();
    criteriaType = criteriaType.toLocaleLowerCase();
   // criteriaCategorie = criteriaCategorie.toLocaleLowerCase();

  
    let res = this.hotels.filter(
      (hotel: IHotel) => hotel.cityName.toLocaleLowerCase().indexOf(criteriaVille) !== -1
      ).filter(
        (hotel: IHotel) => hotel.quartier.toLocaleLowerCase().indexOf(criteriaQuartier) !== -1
      ).filter(
        (hotel: IHotel) => hotel.type.toLocaleLowerCase().indexOf(criteriaType) !== -1
        // ).filter(
        //   (hotel: IHotel) => hotel.categorie.toLocaleLowerCase().indexOf(criteriaCategorie) !== -1
           );
    return res;
    
  }

  // private filterHotelsQuartier(criteriaQuartier: string): IHotel[]{

  //   criteriaQuartier = criteriaQuartier.toLocaleLowerCase();
  
  //   const res = this.hotels.filter(
  //     (hotel: IHotel) => hotel.quartier.toLocaleLowerCase().indexOf(criteriaQuartier) !== -1
  //     );

  //   return res;
  // }
  // private filterHotelsType(criteriaType: string): IHotel[]{

  //   criteriaType = criteriaType.toLocaleLowerCase();
  
  //   const res = this.hotels.filter(
  //     (hotel: IHotel) => hotel.type.toLocaleLowerCase().indexOf(criteriaType) !== -1
  //     );

  //   return res;
  // }

}
