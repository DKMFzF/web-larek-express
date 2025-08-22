type TOrderPayment = 'card' | 'online';
export type TOrder = {
  payment: TOrderPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
};
