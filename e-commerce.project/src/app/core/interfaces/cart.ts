import {Product} from "./product";
import {User} from "./user";


export interface Cart {
  id: any;
  total: number;
  quantity: number;
  item: Product;
  user: User;


}
