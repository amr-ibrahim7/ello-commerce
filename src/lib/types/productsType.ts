 interface ProductImage {
  secure_url: string;
  public_id: string;
  _id: string;
  id: string;
}



 interface ProductReview {
  _id: string;
  comment: string;
  productId: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  } | null;
}

export interface productsType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  imageCover: {
    secure_url: string;
  };
  category: {
    _id: string;
    name: string;
  };
  brand: {
    _id: string;
    name: string;
  };
  createdBy: string;
  images: ProductImage[];
  customId: string;
  stock: number;
  sold: number;
  rateAvg: number;
  rateNum: number;
  createdAt: string;
  updatedAt: string;
  reviews: ProductReview[];
  id: string;
}



export interface ApiResponse {
  message: string
  totalProducts: number
  page: number
  products: productsType[]
}

export interface SingleProductResponse {
  message: string;
  success: boolean;
  product: productsType;
}
