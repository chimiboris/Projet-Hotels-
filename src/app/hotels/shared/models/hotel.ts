export interface IHotel {
  id: number;
  hotelName: string;
  description: string;
  price: number;
  numberOne: number;
  numberTwo: number;
  imageUrl: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  cityName: string;
  quartier: string;
  type: string;
  categorie: string;
  numerowhatsappOne?: number;
  numerowhatsappTwo?: number;
  rating: number;
  tags?: string[];
  // getNewPrice(price: number): number;
}


