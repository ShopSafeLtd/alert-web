export interface HeaderToFixed {
  barcode: string;
  brand: string;
  colour: string | undefined;
  description: string;
  division: string;
  goodsTypeId: string;
  itemSize: string | undefined;
  name: string;
  schemeId: string;
  sku: string;
  variant: string | undefined;
}

export interface Record {
  [key: string]: string;
}

export interface IFormData {
  barcode: string;
  brand: string;
  colour?: string;
  description: string;
  itemNumber: string;
  itemSize?: string;
  stockItem: string;
  variant?: string;
}
