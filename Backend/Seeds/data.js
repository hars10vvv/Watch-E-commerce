const data = [
  {
    name: "Classic Chronograph",
    brand: "Fossil",
    description: "A timeless chronograph watch featuring a genuine leather strap, a bold blue dial, and precise quartz movement. Perfect for formal and casual wear.",
    price: 125.99,
    category: "Men",
    features: [
      "Water Resistant up to 50m", 
      "Stopwatch functionality", 
      "Genuine Leather Band"
    ],
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6fa54b51?auto=format&fit=crop&w=800&q=80"
    ],
    countInStock: 15
  },
  {
    name: "Rose Gold Elegance",
    brand: "Michael Kors",
    description: "An elegant, slim-profile watch finished in stunning rose gold. The minimalist watch face makes it a versatile piece for everyday elegance.",
    price: 195.00,
    category: "Women",
    features: [
      "Stainless Steel Case", 
      "Scratch Resistant Mineral Crystal", 
      "Quartz Movement"
    ],
    images: [
      "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=800&q=80"
    ],
    countInStock: 8
  },
  {
    name: "Digital Sport Pro",
    brand: "Casio",
    description: "Built for endurance. This rugged digital watch is shock-resistant and features world time, multiple alarms, and a heavy-duty resin band.",
    price: 55.50,
    category: "Unisex",
    features: [
      "Shock Resistant", 
      "LED Backlight", 
      "Water Resistant up to 200m"
    ],
    images: [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80"
    ],
    countInStock: 30
  },
  {
    name: "Minimalist Series 3",
    brand: "Daniel Wellington",
    description: "A sleek, ultra-thin timepiece with a matte black dial and an interchangeable NATO strap. The epitome of modern, understated design.",
    price: 149.00,
    category: "Unisex",
    features: [
      "Interchangeable Straps", 
      "Ultra-thin 6mm Case", 
      "Rain Resistant"
    ],
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508656934052-a59021234988?auto=format&fit=crop&w=800&q=80"
    ],
    countInStock: 0 // Great for testing your frontend's "Out of Stock" UI!
  },
  {
    name: "Color Pop Digital",
    brand: "Timex",
    description: "A fun, durable watch designed specifically for smaller wrists. Features an easy-to-read digital display and a comfortable, washable fabric strap.",
    price: 25.00,
    category: "Kids",
    features: [
      "Easy-read Display", 
      "Washable Strap", 
      "Night-light"
    ],
    images: [
      "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=800&q=80"
    ],
    countInStock: 45
  }
];

module.exports = { data };