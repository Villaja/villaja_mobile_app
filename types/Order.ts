export interface Order {
    _id: string;
    cart: CartItem[];
    // ... other properties
    paymentInfo: {
      type: string;
      // ... other payment properties
    };
    shippingAddress: {
      address1: string;
      address2: string;
      zipCode: string;
      country: string;
      city: string;
      // ... other shipping address properties
    };
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      phoneNumber: number;
      role: string;
      isEmailVerified: boolean;
      createdAt: string;
      addresses: string[];
      // ... other user properties
    };
    totalPrice: number;
    status: string;
    paidAt: string;
    createdAt: string;
    // ... other properties
  }
  
  export interface CartItem {
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
    memorySize: string;
    // ... other properties
    images: Array<{ public_id: string; url: string; _id: string }>;
    shopId: string;
    shop: {
      avatar: {
        public_id: string;
        url: string;
      };
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
      // ... other shop properties
    };
    sold_out: number;
    createdAt: string;
    reviews: any[]; // You can specify the correct type for reviews
    qty: number;
    color?: string; 
    // ... other properties
  }
  
