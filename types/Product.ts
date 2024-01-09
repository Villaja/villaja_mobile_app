export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    tags: string;
    originalPrice: number;
    discountPrice: number;
    stock: number;
    condition: string;
    aboutProduct: string;
    brand: string;
    model: string;
    displaySize: string;
    color: string;
    os: string;
    memorySize: string;
    internalMemory: string;
    cellularTechnology: string;
    connectivityTechnology: string;
    simCard: string;
    dimensions: string;
    serialNumber: string;
    weight: string;
    inTheBox: string;
    minDelivery: string;
    maxDelivery: string;
    colorList: Color[];
    images: ImageData[];
    ratings: number;
    shopId: string;
    shop: Shop;
    sold_out: number;
    createdAt: string;
    reviews: Review[];
    __v: number;
  }
  
  interface Color {
    color: string;
    stock: number;
    images: ImageData[];
    index: string;
    _id: string;
  }
  
  interface ImageData {
    public_id: string;
    url: string;
    _id: string;
  }
  
  interface Shop {
    avatar: Avatar;
    _id: string;
    name: string;
    email: string;
    address: string;
    phoneNumber: number;
    role: string;
    isEmailVerified: boolean;
    zipCode: number;
    availableBalance: number;
    createdAt: string;
    transactions: any[]; 
    __v: number;
    description: string;
  }
  
  interface Avatar {
    public_id: string;
    url: string;
  }
  
  interface Review {
    user: User;
    rating: number;
    comment: string;
    productId: string;
    createdAt: string;
    _id: string;
  }
  
  interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: number;
    role: string;
    isEmailVerified: boolean;
    createdAt: string;
    addresses: any[]; 
    __v: number;
  }
  