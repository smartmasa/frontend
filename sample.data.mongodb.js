use('smartmasa');

// Clear existing data
db.categories.remove({});
db.meals.remove({});

// Insert categories
db.categories.insertMany([
  {
    _id: ObjectId('677569987e65c4a0753de944'),
    name: {
      en: "Appetizers",
      ru: "Закуски",
      az: "Aperativlər",
      tr: "Aperatifler"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de945'),
    name: {
      en: "Main Courses",
      ru: "Основные блюда",
      az: "Əsas yeməklər",
      tr: "Ana yemekler"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de946'),
    name: {
      en: "Desserts",
      ru: "Десерты",
      az: "Desertlər",
      tr: "Tatlılar"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de947'),
    name: {
      en: "Soups",
      ru: "Супы",
      az: "Şorbalar",
      tr: "Çorbalar"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de948'),
    name: {
      en: "Salads",
      ru: "Салаты",
      az: "Salatlar",
      tr: "Salatalar"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de949'),
    name: {
      en: "Seafood",
      ru: "Морепродукты",
      az: "Dəniz məhsulları",
      tr: "Deniz ürünleri"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de950'),
    name: {
      en: "Grilled Specialties",
      ru: "Блюда на гриле",
      az: "Qril yeməkləri",
      tr: "Izgara özellikler"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de951'),
    name: {
      en: "Beverages",
      ru: "Напитки",
      az: "İçkilər",
      tr: "İçecekler"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de952'),
    name: {
      en: "Kids Menu",
      ru: "Детское меню",
      az: "Uşaq menyusu",
      tr: "Çocuk menüsü"
    }
  },
  {
    _id: ObjectId('677569987e65c4a0753de953'),
    name: {
      en: "Local Specialties",
      ru: "Местные блюда",
      az: "Yerli yeməklər",
      tr: "Yerel özellikler"
    }
  }
]);

// Insert meals
db.meals.insertMany([
  // Appetizers
  {
    name: {
      en: "Spring Rolls",
      ru: "Спринг роллы",
      az: "Bahar rulonları",
      tr: "Bahar ruloları"
    },
    description: {
      en: "Crispy vegetable rolls with sweet chili sauce",
      ru: "Хрустящие овощные роллы с соусом чили",
      az: "Xırtıldayan tərəvəz rulonları şirin çili sousu ilə",
      tr: "Çıtır sebze ruloları tatlı chili sos ile"
    },
    price: 6.99,
    imageUrl: "/static/mock/images/spring-rolls.jpg",
    cookingTime: "15",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de944')
  },
  {
    name: {
      en: "Hummus Plate",
      ru: "Хумус",
      az: "Humus",
      tr: "Humus tabağı"
    },
    description: {
      en: "Creamy chickpea dip with pita bread",
      ru: "Нежный нут с питой",
      az: "Kremli noxud sousu pita çörəyi ilə",
      tr: "Kremalı nohut ezmesi pide ekmeği ile"
    },
    price: 8.99,
    imageUrl: "/static/mock/images/hummus-plate.jpeg",
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
      tr: "Bruschetta"
    },
    description: {
      en: "Toasted bread topped with tomatoes, garlic, and basil",
      ru: "Поджаренный хлеб с помидорами, чесноком и базиликом",
      az: "Pomidor, sarımsaq və reyhanla hazırlanmış qızardılmış çörək",
      tr: "Domates, sarımsak ve fesleğenli kızarmış ekmek"
    },
    price: 7.99,
    imageUrl: "/static/mock/images/bruschetta.jpg",
    cookingTime: "12",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de944')
  },
  {
    name: {
      en: "Calamari Rings",
      ru: "Кольца кальмара",
      az: "Kalmar halqaları",
      tr: "Kalamar halkaları"
    },
    description: {
      en: "Crispy fried squid rings with tartar sauce",
      ru: "Хрустящие жареные кольца кальмара с соусом тартар",
      az: "Tartar sousu ilə xırtıldayan qızardılmış kalmar halqaları",
      tr: "Tartar soslu çıtır kalamar halkaları"
    },
    price: 9.99,
    imageUrl: "/static/mock/images/calamari-rings.webp",
    cookingTime: "15",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de944')
  },

  // Main Courses
  {
    name: {
      en: "Beef Stroganoff",
      ru: "Бефстроганов",
      az: "Mal əti Stroqanov",
      tr: "Dana Stroganoff"
    },
    description: {
      en: "Tender beef strips in mushroom sauce",
      ru: "Нежные полоски говядины в грибном соусе",
      az: "Göbələk sousunda yumşaq mal əti zolaqları",
      tr: "Mantar soslu yumuşak dana dilimleri"
    },
    price: 18.99,
    imageUrl: "/static/mock/images/beef-stroganoff.jpg",
    cookingTime: "25",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de945')
  },
  {
    name: {
      en: "Vegetable Curry",
      ru: "Овощное карри",
      az: "Tərəvəz kari",
      tr: "Sebze körisi"
    },
    description: {
      en: "Mixed vegetables in aromatic curry sauce",
      ru: "Овощное ассорти в ароматном соусе карри",
      az: "Ətirli kari sousunda qarışıq tərəvəzlər",
      tr: "Aromatik köri soslu karışık sebzeler"
    },
    price: 14.99,
    imageUrl: "/static/mock/images/vegetable-curry.jpg",
    cookingTime: "20",
    isFavorite: false,
    isSpicy: true,
    category_id: ObjectId('677569987e65c4a0753de945')
  },
  {
    name: {
      en: "Grilled Salmon",
      ru: "Лосось на гриле",
      az: "Qrildə bişmiş qızıl balıq",
      tr: "Izgara somon"
    },
    description: {
      en: "Fresh salmon fillet with lemon herb sauce",
      ru: "Свежее филе лосося с лимонно-травяным соусом",
      az: "Limon-ot sousu ilə təzə qızıl balıq filesi",
      tr: "Limon ot soslu taze somon fileto"
    },
    price: 24.99,
    imageUrl: "/static/mock/images/grilled-salmon.jpg",
    cookingTime: "25",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de945')
  },
  {
    name: {
      en: "Chicken Alfredo",
      ru: "Курица Альфредо",
      az: "Toyuq Alfredo",
      tr: "Tavuk Alfredo"
    },
    description: {
      en: "Creamy pasta with grilled chicken and parmesan",
      ru: "Паста в сливочном соусе с курицей и пармезаном",
      az: "Qrildə bişmiş toyuq və parmezan pendiri ilə kremli makaron",
      tr: "Izgara tavuk ve parmesan peynirli kremalı makarna"
    },
    price: 16.99,
    imageUrl: "/static/mock/images/chicken-alfredo.jpg",
    cookingTime: "20",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de945')
  },

  // Soups
  {
    name: {
      en: "Mushroom Cream Soup",
      ru: "Грибной крем-суп",
      az: "Göbələk krem şorbası",
      tr: "Mantar çorbası"
    },
    description: {
      en: "Creamy mushroom soup with herbs",
      ru: "Нежный грибной суп с травами",
      az: "Otlarla kremli göbələk şorbası",
      tr: "Kremalı mantar çorbası otlarla"
    },
    price: 7.99,
    imageUrl: "/static/mock/images/mushroom-cream-soup.jpg",
    cookingTime: "15",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de947')
  },
  {
    name: {
      en: "Lentil Soup",
      ru: "Чечевичный суп",
      az: "Mərcimək şorbası",
      tr: "Mercimek çorbası"
    },
    description: {
      en: "Traditional lentil soup with spices",
      ru: "Традиционный суп из чечевицы со специями",
      az: "Ədviyyatlı ənənəvi mərcimək şorbası",
      tr: "Geleneksel baharatlı mercimek çorbası"
    },
    price: 6.99,
    imageUrl: "/static/mock/images/lentil-soup.jpg",
    cookingTime: "20",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de947')
  },
  {
    name: {
      en: "Tom Yum",
      ru: "Том Ям",
      az: "Tom Yum",
      tr: "Tom Yum"
    },
    description: {
      en: "Spicy and sour Thai soup with shrimp",
      ru: "Острый и кислый тайский суп с креветками",
      az: "Krevetli acılı və turş Tayland şorbası",
      tr: "Karidesli acı ve ekşi Thai çorbası"
    },
    price: 9.99,
    imageUrl: "/static/mock/images/tom-yum.jpg",
    cookingTime: "20",
    isFavorite: false,
    isSpicy: true,
    category_id: ObjectId('677569987e65c4a0753de947')
  },
  {
    name: {
      en: "Borscht",
      ru: "Борщ",
      az: "Borş",
      tr: "Borsch"
    },
    description: {
      en: "Traditional beetroot soup with beef",
      ru: "Традиционный свекольный суп с говядиной",
      az: "Mal əti ilə ənənəvi çuğundur şorbası",
      tr: "Geleneksel etli pancar çorbası"
    },
    price: 8.99,
    imageUrl: "/static/mock/images/borscht.jpg",
    cookingTime: "35",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de947')
  },

  // Salads
  {
    name: {
      en: "Greek Salad",
      ru: "Греческий салат",
      az: "Yunan salatı",
      tr: "Yunan salatası"
    },
    description: {
      en: "Fresh vegetables with feta cheese and olives",
      ru: "Свежие овощи с сыром фета и оливками",
      az: "Təzə tərəvəzlər feta pendiri və zeytunla",
      tr: "Taze sebzeler beyaz peynir ve zeytin ile"
    },
    price: 9.99,
    imageUrl: "/static/mock/images/greek-salad.jpg",
    cookingTime: "10",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de948')
  },
  {
    name: {
      en: "Caesar Salad",
      ru: "Салат Цезарь",
      az: "Sezar salatı",
      tr: "Sezar salatası"
    },
    description: {
      en: "Romaine lettuce with chicken, croutons, and Caesar dressing",
      ru: "Салат ромэн с курицей, гренками и соусом Цезарь",
      az: "Toyuq, suxari və Sezar sousu ilə Roma kahısı",
      tr: "Tavuk, kruton ve Sezar soslu marul"
    },
    price: 12.99,
    imageUrl: "/static/mock/images/caesar-salad.jpg",
    cookingTime: "15",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de948')
  },
  {
    name: {
      en: "Quinoa Bowl",
      ru: "Боул с киноа",
      az: "Kinoa kasası",
      tr: "Kinoa kasesi"
    },
    description: {
      en: "Healthy quinoa with roasted vegetables and avocado",
      ru: "Полезная киноа с запеченными овощами и авокадо",
      az: "Qızardılmış tərəvəzlər və avokado ilə sağlam kinoa",
      tr: "Fırınlanmış sebze ve avokadolu sağlıklı kinoa"
    },
    price: 13.99,
    imageUrl: "/static/mock/images/quino-bowls.jpg",
    cookingTime: "20",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de948')
  },

  // Seafood
  {
    name: {
      en: "Shrimp Scampi",
      ru: "Креветки Скампи",
      az: "Krevet Skampi",
      tr: "Karides Scampi"
    },
    description: {
      en: "Garlic butter shrimp with white wine sauce",
      ru: "Креветки в чесночном масле с соусом из белого вина",
      az: "Ağ çaxır souslu sarımsaqlı kərə yağında krevet",
      tr: "Beyaz şarap soslu sarımsaklı tereyağlı karides"
    },
    price: 21.99,
    imageUrl: "/static/mock/images/shrimp-scampi.jpg",
    cookingTime: "20",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de949')
  },
  {
    name: {
      en: "Grilled Octopus",
      ru: "Осьминог на гриле",
      az: "Qrildə bişmiş ahtapot",
      tr: "Izgara ahtapot"
    },
    description: {
      en: "Tender grilled octopus with olive oil and herbs",
      ru: "Нежный осьминог на гриле с оливковым маслом и травами",
      az: "Zeytun yağı və otlarla hazırlanmış yumşaq qrildə bişmiş ahtapot",
      tr: "Zeytinyağı ve otlarla yumuşak ızgara ahtapot"
    },
    price: 26.99,
    imageUrl: "/static/mock/images/grilled-octopus.webp",
    cookingTime: "25",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de949')
  },
  {
    name: {
      en: "Seafood Paella",
      ru: "Паэлья с морепродуктами",
      az: "Dəniz məhsulları ilə paelya",
      tr: "Deniz ürünlü paella"
    },
    description: {
      en: "Spanish rice dish with mixed seafood and saffron",
      ru: "Испанское рисовое блюдо с морепродуктами и шафраном",
      az: "Qarışıq dəniz məhsulları və zəfəranla İspan düyü yeməyi",
      tr: "Karışık deniz ürünleri ve safranla İspanyol pilav yemeği"
    },
    price: 28.99,
    imageUrl: "/static/mock/images/seafood-paella.webp",
    cookingTime: "35",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de949')
  },

  // Grilled Specialties
  {
    name: {
      en: "Mixed Grill Platter",
      ru: "Мясное ассорти на гриле",
      az: "Qarışıq qril assortisi",
      tr: "Karışık ızgara tabağı"
    },
    description: {
      en: "Selection of grilled meats with vegetables",
      ru: "Ассорти из мяса на гриле с овощами",
      az: "Tərəvəzlərlə qrildə bişmiş ət çeşidləri",
      tr: "Sebzelerle ızgara et çeşitleri"
    },
    price: 29.99,
    imageUrl: "/static/mock/images/mixed-grill.jpg",
    cookingTime: "30",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de950')
  },
  {
    name: {
      en: "T-Bone Steak",
      ru: "Стейк Ти-боун",
      az: "T-sümüklü steyk",
      tr: "T-Bone steak"
    },
    description: {
      en: "Premium T-bone steak with garlic butter",
      ru: "Премиальный стейк Ти-боун с чесночным маслом",
      az: "Sarımsaqlı kərə yağı ilə premium T-sümüklü steyk",
      tr: "Sarımsaklı tereyağlı premium T-Bone biftek"
    },
    price: 34.99,
    imageUrl: "/static/mock/images/t-bone-steak.jpeg",
    cookingTime: "25",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de950')
  },
  {
    name: {
      en: "Lamb Chops",
      ru: "Бараньи котлеты",
      az: "Quzu kotletləri",
      tr: "Kuzu pirzola"
    },
    description: {
      en: "Grilled lamb chops with mint sauce",
      ru: "Бараньи котлеты на гриле с мятным соусом",
      az: "Nanə sousu ilə qrildə bişmiş quzu kotletləri",
      tr: "Nane soslu ızgara kuzu pirzola"
    },
    price: 29.99,
    imageUrl: "/static/mock/images/lamb-chops.jpg",
    cookingTime: "20",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de950')
  },

  // Beverages
  {
    name: {
      en: "Fresh Lemonade",
      ru: "Свежий лимонад",
      az: "Təzə limonad",
      tr: "Taze limonata"
    },
    description: {
      en: "Homemade lemonade with mint",
      ru: "Домашний лимонад с мятой",
      az: "Nanəli ev limonadı",
      tr: "Naneli ev yapımı limonata"
    },
    price: 4.99,
    imageUrl: "/static/mock/images/lemonade.jpg",
    cookingTime: "5",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de951')
  },
  {
    name: {
      en: "Mango Lassi",
      ru: "Манго Ласси",
      az: "Manqo Lassi",
      tr: "Mango Lassi"
    },
    description: {
      en: "Indian yogurt drink with mango",
      ru: "Индийский йогуртовый напиток с манго",
      az: "Manqolu Hind yoğurt içkisi",
      tr: "Mangolu Hint yoğurt içeceği"
    },
    price: 5.99,
    imageUrl: "/static/mock/images/mango-lassi.jpeg",
    cookingTime: "5",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de951')
  },
  {
    name: {
      en: "Fresh Orange Juice",
      ru: "Свежевыжатый апельсиновый сок",
      az: "Təzə portağal şirəsi",
      tr: "Taze portakal suyu"
    },
    description: {
      en: "Freshly squeezed orange juice",
      ru: "Свежевыжатый сок из апельсинов",
      az: "Təzə sıxılmış portağal şirəsi",
      tr: "Taze sıkılmış portakal suyu"
    },
    price: 4.99,
    imageUrl: "/static/mock/images/orange-juice.jpg",
    cookingTime: "5",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de951')
  },

  // Kids Menu
  {
    name: {
      en: "Mini Burger",
      ru: "Мини-бургер",
      az: "Mini burger",
      tr: "Mini burger"
    },
    description: {
      en: "Small beef burger with fries",
      ru: "Маленький бургер с картофелем фри",
      az: "Kartof qızartması ilə kiçik burger",
      tr: "Patates kızartması ile küçük burger"
    },
    price: 8.99,
    imageUrl: "/static/mock/images/mini-burger.jpg",
    cookingTime: "15",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de952')
  },
  {
    name: {
      en: "Chicken Nuggets",
      ru: "Куриные наггетсы",
      az: "Toyuq naggetləri",
      tr: "Tavuk nugget"
    },
    description: {
      en: "Crispy chicken nuggets with french fries",
      ru: "Хрустящие куриные наггетсы с картофелем фри",
      az: "Kartof qızartması ilə xırtıldayan toyuq naggetləri",
      tr: "Patates kızartması ile çıtır tavuk nugget"
    },
    price: 7.99,
    imageUrl: "/static/mock/images/chicken-nuggets.jpg",
    cookingTime: "15",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de952')
  },
  {
    name: {
      en: "Mac and Cheese",
      ru: "Макароны с сыром",
      az: "Pendirli makaron",
      tr: "Peynirli makarna"
    },
    description: {
      en: "Creamy macaroni and cheese",
      ru: "Макароны в сливочно-сырном соусе",
      az: "Kremli pendirli makaron",
      tr: "Kremalı peynirli makarna"
    },
    price: 6.99,
    imageUrl: "/static/mock/images/mac-and-cheese.jpeg",
    cookingTime: "15",
    isFavorite: false,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de952')
  },

  // Local Specialties
  {
    name: {
      en: "Plov",
      ru: "Плов",
      az: "Plov",
      tr: "Pilav"
    },
    description: {
      en: "Traditional rice dish with lamb and vegetables",
      ru: "Традиционное блюдо из риса с бараниной и овощами",
      az: "Ənənəvi düyü yeməyi quzu əti və tərəvəzlərlə",
      tr: "Geleneksel kuzu etli ve sebzeli pilav"
    },
    price: 16.99,
    imageUrl: "/static/mock/images/plov.jpeg",
    cookingTime: "40",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de953')
  },
  {
    name: {
      en: "Dolma",
      ru: "Долма",
      az: "Dolma",
      tr: "Dolma"
    },
    description: {
      en: "Stuffed grape leaves with rice and meat",
      ru: "Виноградные листья с начинкой из риса и мяса",
      az: "Düyü və ət ilə doldurulmuş üzüm yarpağı",
      tr: "Pirinç ve et dolgulu asma yaprağı"
    },
    price: 12.99,
    imageUrl: "/static/mock/images/dolma.webp",
    cookingTime: "30",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de953')
  },
  {
    name: {
      en: "Kebab",
      ru: "Кебаб",
      az: "Kabab",
      tr: "Kebap"
    },
    description: {
      en: "Traditional grilled meat skewers",
      ru: "Традиционные мясные шашлыки",
      az: "Ənənəvi qrildə bişmiş ət şişləri",
      tr: "Geleneksel ızgara et şişleri"
    },
    price: 18.99,
    imageUrl: "/static/mock/images/kebab.jpg",
    cookingTime: "25",
    isFavorite: true,
    isSpicy: false,
    category_id: ObjectId('677569987e65c4a0753de953')
  }
]); 