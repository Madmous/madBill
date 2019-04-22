export type Item = {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export type FormValues = {
  from: string;
  billTo: string;
  shipTo: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: Item[];
  total: number;
};
