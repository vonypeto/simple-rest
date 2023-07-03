export interface ProductResponse {
  product: any; // Update the type of the product object with your product schema
  cursor: string;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
}

export interface ListProductResponse {
  products: ProductResponse[];
  pageInfo: PageInfo;
}
