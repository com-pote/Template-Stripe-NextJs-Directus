type fimg = {
  id: string;
};

export interface ICartItem {
  id: number | string;
  name: string;
  price: number;
  description?: string;
  fimg?: fimg;
  category?: string;
  quantity: number;
}
