
export const sampleProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    brand: "TechSound",
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    brand: "StyleWear",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 89,
    category: "Fashion",
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    brand: "FitTech",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 256,
    category: "Electronics",
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    brand: "LuxBags",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 67,
    category: "Fashion",
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 5,
    name: "Gaming Mechanical Keyboard",
    brand: "GamePro",
    price: 149.99,
    originalPrice: 179.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 143,
    category: "Electronics",
    inStock: false,
    isNew: true,
    isFeatured: true
  },
  {
    id: 6,
    name: "Casual Sneakers",
    brand: "ComfortStep",
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 92,
    category: "Fashion",
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    brand: "HydroLife",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.1,
    reviews: 78,
    category: "Lifestyle",
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 8,
    name: "Wireless Phone Charger",
    brand: "ChargeFast",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    rating: 4.0,
    reviews: 54,
    category: "Electronics",
    inStock: true,
    isNew: false,
    isFeatured: false
  }
];

export const sampleDetailedProduct = {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
    brand: "TechSound Pro",
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
    ],
    rating: 4.6,
    totalReviews: 1247,
    category: "Electronics",
    subcategory: "Audio",
    inStock: true,
    stockCount: 23,
    sku: "TSP-WBH-001",
    description: "Experience premium audio quality with our flagship wireless headphones featuring advanced active noise cancellation technology. Perfect for music lovers, professionals, and travelers who demand the best in audio performance.",
    features: [
      "Active Noise Cancellation (ANC) technology",
      "40-hour battery life with ANC off",
      "Quick charge: 10 minutes = 3 hours playback",
      "Premium leather ear cushions",
      "Bluetooth 5.2 connectivity",
      "Built-in microphone for calls",
      "Foldable design for portability",
      "Compatible with voice assistants"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 Ohms",
      "Battery Life": "40 hours (ANC off), 30 hours (ANC on)",
      "Charging Time": "2 hours",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.2, 3.5mm jack",
      "Warranty": "2 years"
    },
    colors: [
      { name: "Midnight Black", value: "#000000", available: true },
      { name: "Silver Gray", value: "#C0C0C0", available: true },
      { name: "Rose Gold", value: "#E8B4B8", available: false }
    ],
    sizes: ["One Size"],
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        date: "2024-01-15",
        title: "Excellent sound quality!",
        comment: "These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is amazing.",
        verified: true,
        helpful: 23
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        date: "2024-01-10",
        title: "Great for travel",
        comment: "Perfect for long flights. Comfortable to wear for hours and the ANC really works well.",
        verified: true,
        helpful: 18
      },
      {
        id: 3,
        user: "Mike R.",
        rating: 5,
        date: "2024-01-08",
        title: "Worth every penny",
        comment: "Premium build quality and incredible sound. The quick charge feature is a lifesaver.",
        verified: false,
        helpful: 12
      }
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Wireless Earbuds Pro",
        brand: "TechSound",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
        rating: 4.4
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        brand: "TechSound",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
        rating: 4.2
      }
    ]
  };

export const heroSlides = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% Off",
    description: "Discover amazing deals on your favorite products",
    image: 'https://res.cloudinary.com/dr5ziuzrg/image/upload/v1751801691/2148559696_jhr8rw.jpg',
    buttonText: "Shop Now",
    buttonLink: "/sale"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh & Trendy",
    description: "Check out the latest products in our collection",
    image: 'https://res.cloudinary.com/dr5ziuzrg/image/upload/v1751800446/banner2_h4bmu2.jpg',
    buttonText: "Explore",
    buttonLink: "/new-arrivals"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh & Trendy",
    description: "Check out the latest products in our collection",
    image: 'https://res.cloudinary.com/dr5ziuzrg/image/upload/v1751801578/118763_epxhhq.jpg',
    buttonText: "Explore",
    buttonLink: "/new-arrivals"
  },

  
];
