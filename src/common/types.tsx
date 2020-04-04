export interface Items {
  count: number;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  value: number;
  description: string;
  user: {
    name: string;
    email: string;
    whatsapp: string;
  };
}
