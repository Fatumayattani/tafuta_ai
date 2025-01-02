export interface AIModel {
  id: string;
  name: string;
  description: string;
  price: string;
  owner: string;
  ipfsHash: string;
  image: string;
  isForSale: boolean;
  isForRent: boolean;
  rentPrice: string;
  rentDuration: number;
}