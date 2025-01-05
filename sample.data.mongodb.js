use('smartmasa');

db.meals.remove({})
db.meals.insertMany([
  // Main Courses
  {
    name: {
      en: "Grilled Chicken",
      ru: "Жареная курица",
      az: "Qızardılmış toyuq",
      tr: "Izgara tavuk"
    },
    description: {
      en: "Tender grilled chicken with herbs.",
      ru: "Нежная жареная курица с травами.",
      az: "Otlarla bişirilmiş toyuq əti.",
      tr: "Otlar ile marine edilmiş ızgara tavuk."
    },
    price: 12.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "25",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de945')
  },
  {
    name: {
      en: "Beef Steak",
      ru: "Бифштекс",
      az: "Bifşteks",
      tr: "Biftek"
    },
    description: {
      en: "Premium cut beef steak.",
      ru: "Премиальный стейк из говядины.",
      az: "Premium kəsim mal əti.",
      tr: "Premium kesim dana biftek."
    },
    price: 24.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "30",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de945')
  },
  {
    name: {
      en: "Grilled Salmon",
      ru: "Лосось на гриле",
      az: "Qızardılmış qızıl balıq",
      tr: "Izgara somon"
    },
    description: {
      en: "Fresh salmon fillet with lemon sauce.",
      ru: "Свежее филе лосося с лимонным соусом.",
      az: "Təzə qızıl balıq filesi limon sousu ilə.",
      tr: "Taze somon fileto limon sos ile."
    },
    price: 22.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "20",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de945')
  },
  {
    name: {
      en: "Pasta Carbonara",
      ru: "Паста Карбонара",
      az: "Karbonara pastası",
      tr: "Makarna Karbonara"
    },
    description: {
      en: "Classic Italian pasta with cream sauce.",
      ru: "Классическая итальянская паста в сливочном соусе.",
      az: "Klassik İtalyan pastası kremlı sousla.",
      tr: "Klasik İtalyan makarnası kremalı sos ile."
    },
    price: 14.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "20",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de945')
  },
  // Appetizers
  {
    name: {
      en: "Caesar Salad",
      ru: "Салат Цезарь",
      az: "Sezar salatı",
      tr: "Sezar salata"
    },
    description: {
      en: "Fresh romaine lettuce with Caesar dressing.",
      ru: "Свежий салат ромэн с соусом Цезарь.",
      az: "Təzə kahı Sezar sousu ilə.",
      tr: "Taze marul Caesar sos ile."
    },
    price: 8.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "10",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de944')
  },
  {
    name: {
      en: "Bruschetta",
      ru: "Брускетта",
      az: "Brusketta",
      tr: "Bruşetta"
    },
    description: {
      en: "Grilled bread with toppings.",
      ru: "Гриль хлеб с начинкой.",
      az: "Qril çörəyi ilə üstlük.",
      tr: "Izgara ekmek üzerine malzeme."
    },
    price: 5.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "15",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de944')
  },
  {
    name: {
      en: "Chicken Wings",
      ru: "Куриные крылышки",
      az: "Toyuq qanadları",
      tr: "Tavuk kanatları"
    },
    description: {
      en: "Spicy buffalo wings with blue cheese sauce.",
      ru: "Острые крылышки баффало с соусом блю чиз.",
      az: "Acılı buffalo qanadları göy pendir sousu ilə.",
      tr: "Acı buffalo kanatları mavi peynir sos ile."
    },
    price: 10.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "20",
    isFavorite: true,
    isSpicy: true,
    category_id: ObjectId('677569987e65c4a0753de944')
  },
  {
    name: {
      en: "Mozzarella Sticks",
      ru: "Моцарелла палочки",
      az: "Motsarella çubuqları",
      tr: "Mozzarella çubukları"
    },
    description: {
      en: "Breaded mozzarella with marinara sauce.",
      ru: "Панированная моцарелла с соусом маринара.",
      az: "Çörək qırıntılı motsarella marinara sousu ilə.",
      tr: "Galeta unlu mozzarella marinara sos ile."
    },
    price: 7.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "15",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de944')
  },
  // Desserts
  {
    name: {
      en: "Tiramisu",
      ru: "Тирамису",
      az: "Tiramisu",
      tr: "Tiramisu"
    },
    description: {
      en: "Classic Italian dessert.",
      ru: "Классический итальянский десерт.",
      az: "Klassik İtalyan deserti.",
      tr: "Klasik İtalyan tatlısı."
    },
    price: 7.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "0",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de946')
  },
  {
    name: {
      en: "Chocolate Fondant",
      ru: "Шоколадный фондан",
      az: "Şokolad fondant",
      tr: "Çikolatalı fondant"
    },
    description: {
      en: "Warm chocolate cake with liquid center.",
      ru: "Теплый шоколадный кекс с жидкой начинкой.",
      az: "İsti şokolad tort maye mərkəzi ilə.",
      tr: "Sıcak çikolatalı kek akışkan merkezli."
    },
    price: 8.99,
    imageUrl: "/static/mock/images/grill.jpeg",
    cookingTime: "15",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de946')
  }
]); 