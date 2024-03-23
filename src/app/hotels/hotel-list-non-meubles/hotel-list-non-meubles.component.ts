import { Component, OnInit } from '@angular/core';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-list-non-meubles',
  templateUrl: './hotel-list-non-meubles.component.html',
  styleUrls: ['./hotel-list-non-meubles.component.css']
})
export class HotelListNonMeublesComponent implements OnInit {


    public hotels: IHotel[] = [];
  
    public showBadge: boolean = true;
    public filteredHotels: IHotel[];
    public receivedRating: string;
  
    private _hotelFilterVille = 'mot';
    private _hotelFilterQuartier = '';
    private _hotelFilterType = '';
    private _hotelFilterCategorie = '';
  
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
          this.filteredHotels = this.filterByCategorie();  // Filtre initial par catégorie
        },
        error: err => this.errorMsg = err
      });
  
     
      
    }
  
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
     public get hotelFilterCategorie(): string{
      return this._hotelFilterCategorie;
     }
    
  
    // public set hotelFilterVille(filter: string){
    //   this._hotelFilterVille = filter;
    //   this.filteredHotels = this.hotelFilterVille ? this.filterHotelsVille(this.hotelFilterVille, this.hotelFilterQuartier, this.hotelFilterType, this.hotelFilterCategorie) : this.hotels;
  
    //   if (this._hotelFilterVille) {
    //     this.updatePageTitle(this._hotelFilterVille);
    //   }else{
    //     this.pageTitle = '';
    //   }
    // }

    public set hotelFilterVille(filter: string) {
      this._hotelFilterVille = filter;
      this.filteredHotels = this.filterHotels(); // Réappliquer les filtres

        if (this._hotelFilterVille) {
        this.updatePageTitle(this._hotelFilterVille);
        }else{
          this.pageTitle = '';
        }
    }
    public set hotelFilterQuartier(filter: string) {
      this._hotelFilterQuartier = filter;
      this.filteredHotels = this.filterHotels(); // Réappliquer les filtres
    }
    public set hotelFilterType(filter: string) {
      this._hotelFilterType = filter;
      this.filteredHotels = this.filterHotels(); // Réappliquer les filtres
    }
    // public set hotelFilterQuartier(filter: string){
    //   this._hotelFilterQuartier = filter;
    //   this.filteredHotels = this.hotelFilterQuartier ? this.filterHotelsVille(this.hotelFilterVille, this.hotelFilterQuartier, this.hotelFilterType, this.hotelFilterCategorie) : this.hotels;
    // }
    // public set hotelFilterType(filter: string){
    //   this._hotelFilterType = filter;
    //   this.filteredHotels = this.hotelFilterType ? this.filterHotelsVille(this.hotelFilterVille, this.hotelFilterQuartier, this.hotelFilterType, this.hotelFilterCategorie) : this.hotels;
    // }
    // public set hotelFilterCategorie(filter: string){
    //   this._hotelFilterCategorie = filter;
    //   this.filteredHotels = this.hotelFilterCategorie ? this.filterCategorie(this.hotelFilterCategorie) : this.hotels;
    // }
    
    
    updatePageTitle(cityName: string): void {
      this.pageTitle = `à ${cityName}`;
    }

    private filterHotels(): IHotel[]{
      
      let filteredHotels = this.filterByCategorie(); // Filtre initial par catégorie

      // Appliquer les filtres supplémentaires si les valeurs sont définies
      if (this._hotelFilterVille) {
        filteredHotels = filteredHotels.filter((hotel: IHotel) =>
          hotel.cityName.toLocaleLowerCase().includes(this._hotelFilterVille.toLocaleLowerCase())
        );
      }
      if (this._hotelFilterQuartier) {
        filteredHotels = filteredHotels.filter((hotel: IHotel) =>
          hotel.quartier.toLocaleLowerCase().includes(this._hotelFilterQuartier.toLocaleLowerCase())
        );
      }
      if (this._hotelFilterType) {
        filteredHotels = filteredHotels.filter((hotel: IHotel) =>
          hotel.type.toLocaleLowerCase().includes(this._hotelFilterType.toLocaleLowerCase())
        );
      }

  // Appliquer d'autres filtres de la même manière pour quartier et type

      return filteredHotels;
    }
  
    public filterByCategorie(): IHotel[]{

      return this.hotels.filter((hotel: IHotel) => hotel.categorie === 'non meublés');
    }
    
    // private filterHotelsVille(criteriaVille: string, criteriaQuartier: string, criteriaType:string): IHotel[]{
  
    //   criteriaVille = criteriaVille.toLocaleLowerCase();
    //   criteriaQuartier = criteriaQuartier.toLocaleLowerCase();
    //   criteriaType = criteriaType.toLocaleLowerCase();
    //  // criteriaCategorie = criteriaCategorie.toLocaleLowerCase();
  
    
    //   let res = this.hotels.filter(
    //     (hotel: IHotel) => hotel.cityName.toLocaleLowerCase().indexOf(criteriaVille) !== -1
    //     ).filter(
    //       (hotel: IHotel) => hotel.quartier.toLocaleLowerCase().indexOf(criteriaQuartier) !== -1
    //     ).filter(
    //       (hotel: IHotel) => hotel.type.toLocaleLowerCase().indexOf(criteriaType) !== -1
        
    //          );
    //   return res;
      
    // }
  
}
    
