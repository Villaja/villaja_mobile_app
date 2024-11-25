export interface Order {
    _id: string;
    cart: CartItem[];
    shippingAddress: {
        address: string;
        city: string;
        country: string;
    };
    user: {
        _id: string;
        firstname: string;
        lastname: string;
        email: string;
        phoneNumber: string;
        role: string;
        isEmailVerified: boolean;
        pushNotificationToken?: string;
        createdAt: string;
        addresses: string[];
        __v: number;
    };
    totalPrice: number;
    status: string;
    paymentInfo: {
        id: string;
        status: string;
        type: string;
    };
    paidAt: Date;
    createdAt: Date;
    deliveredAt?: Date;
    __v: number;
}
  
  export interface CartItem {
    _id: string;
    name: string;
    description: string;
    category: string;
    tags: string;
    originalPrice: number;
    discountPrice: number | null;
    stock: number;
    condition: string;
    brand: string;
    model: string;
    displaySize: string;
    color: string;
    os: string;
    memorySize: string;
    internalMemory: string;
    cellularTechnology: string;
    connectivityTechnology: string;
    serialNumber: string;
    weight: string;
    inTheBox: string;
    colorList: Array<{
        color: string;
        stock: number;
        images: Array<{
            public_id: string;
            url: string;
            _id: string;
        }>;
        _id: string;
    }>;
    images: Array<{
        public_id: string;
        url: string;
        _id: string;
    }>;
    ratings: number;
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
    reviews: any[];
    isSavedForLater?: boolean;
    approvalStatus: string;
  }
  
