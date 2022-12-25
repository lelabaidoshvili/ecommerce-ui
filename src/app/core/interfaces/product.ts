
import {Category} from "./category";
export interface Product {
  id: any;
  name: string;
  description: string;
  image: string;
  price: any;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  deletedAt:Date;

}
