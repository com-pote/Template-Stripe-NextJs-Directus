type fimg = {
  id: string;
};

export interface ICartItem {
  id: number | string;
  name: string;
  slug?: string;
  price: number;
  price_url: string;
  description?: string;
  fimg?: fimg;
  category?: string;
  quantity: number;
}
