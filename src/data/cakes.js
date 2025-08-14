export const cakes = [
  {
    id: 1,
    name: "Торт 'Прага'",
    description: "Классический шоколадный торт с насыщенным вкусом",
    price: "от 2500 ₽",
    weight: "1.5 кг",
    ingredients: [
      "Шоколадный бисквит",
      "Шоколадный крем",
      "Шоколадная глазурь",
      "Какао-порошок",
      "Сливочное масло",
      "Яйца",
      "Сахар",
      "Мука"
    ],
    allergens: ["Глютен", "Яйца", "Молоко"],
    category: "шоколадные",
    image: "/images/praga.jpg",
    popularity: 5,
    sweetness: 4,
    suitableFor: ["Дни рождения", "Корпоративы", "Романтические ужины"]
  },
  {
    id: 2,
    name: "Торт 'Наполеон'",
    description: "Традиционный слоеный торт с заварным кремом",
    price: "от 2200 ₽",
    weight: "1.2 кг",
    ingredients: [
      "Слоеное тесто",
      "Заварной крем",
      "Сливочное масло",
      "Мука",
      "Сахар",
      "Молоко",
      "Ваниль"
    ],
    allergens: ["Глютен", "Молоко", "Яйца"],
    category: "классические",
    image: "/images/napoleon.jpg",
    popularity: 5,
    sweetness: 3,
    suitableFor: ["Свадьбы", "Юбилеи", "Семейные праздники"]
  },
  {
    id: 3,
    name: "Торт 'Медовик'",
    description: "Нежный медовый торт с медовыми коржами",
    price: "от 2000 ₽",
    weight: "1.3 кг",
    ingredients: [
      "Медовые коржи",
      "Сметанный крем",
      "Мед",
      "Сметана",
      "Мука",
      "Яйца",
      "Сахар",
      "Сода"
    ],
    allergens: ["Глютен", "Яйца", "Молоко"],
    category: "медовые",
    image: "/images/medovik.jpg",
    popularity: 4,
    sweetness: 4,
    suitableFor: ["Дни рождения", "Семейные праздники", "Чаепития"]
  },
  {
    id: 4,
    name: "Торт 'Красный бархат'",
    description: "Яркий красный торт с крем-чизом",
    price: "от 2800 ₽",
    weight: "1.4 кг",
    ingredients: [
      "Красный бисквит",
      "Крем-чиз",
      "Красный пищевой краситель",
      "Какао-порошок",
      "Сливочное масло",
      "Яйца",
      "Сахар",
      "Мука",
      "Ваниль"
    ],
    allergens: ["Глютен", "Яйца", "Молоко"],
    category: "американские",
    image: "/images/red-velvet.jpg",
    popularity: 4,
    sweetness: 4,
    suitableFor: ["Дни рождения", "Свидания", "Корпоративы"]
  },
  {
    id: 5,
    name: "Торт 'Тирамису'",
    description: "Итальянский десерт с кофе и маскарпоне",
    price: "от 3200 ₽",
    weight: "1.1 кг",
    ingredients: [
      "Печенье савоярди",
      "Маскарпоне",
      "Кофе эспрессо",
      "Яйца",
      "Сахар",
      "Какао-порошок",
      "Кофейный ликер"
    ],
    allergens: ["Глютен", "Яйца", "Молоко"],
    category: "итальянские",
    image: "/images/tiramisu.jpg",
    popularity: 5,
    sweetness: 3,
    suitableFor: ["Романтические ужины", "Кофейные встречи", "Дни рождения"]
  },
  {
    id: 6,
    name: "Торт 'Чизкейк'",
    description: "Классический американский чизкейк",
    price: "от 2600 ₽",
    weight: "1.2 кг",
    ingredients: [
      "Песочная основа",
      "Творожный крем",
      "Сливочный сыр",
      "Яйца",
      "Сахар",
      "Ваниль",
      "Сливочное масло"
    ],
    allergens: ["Глютен", "Яйца", "Молоко"],
    category: "американские",
    image: "/images/cheesecake.jpg",
    popularity: 4,
    sweetness: 3,
    suitableFor: ["Дни рождения", "Свидания", "Семейные праздники"]
  },
  {
    id: 7,
    name: "Торт 'Птичье молоко'",
    description: "Воздушный торт с суфле и шоколадной глазурью",
    price: "от 2400 ₽",
    weight: "1.0 кг",
    ingredients: [
      "Бисквит",
      "Суфле",
      "Шоколадная глазурь",
      "Яичные белки",
      "Сахар",
      "Желатин",
      "Шоколад"
    ],
    allergens: ["Глютен", "Яйца"],
    category: "советские",
    image: "/images/bird-milk.jpg",
    popularity: 4,
    sweetness: 4,
    suitableFor: ["Дни рождения", "Юбилеи", "Семейные праздники"]
  },
  {
    id: 8,
    name: "Торт 'Сметанник'",
    description: "Нежный торт со сметанным кремом",
    price: "от 1800 ₽",
    weight: "1.3 кг",
    ingredients: [
      "Бисквитные коржи",
      "Сметанный крем",
      "Сметана",
      "Сахар",
      "Мука",
      "Яйца",
      "Ваниль"
    ],
    allergens: ["Глютен", "Яйца", "Молоко"],
    category: "классические",
    image: "/images/smetannik.jpg",
    popularity: 3,
    sweetness: 3,
    suitableFor: ["Семейные праздники", "Чаепития", "Дни рождения"]
  }
];

export const categories = [
  { id: "all", name: "Все торты", icon: "🍰" },
  { id: "chocolate", name: "Шоколадные", icon: "🍫" },
  { id: "classic", name: "Классические", icon: "🎂" },
  { id: "honey", name: "Медовые", icon: "🍯" },
  { id: "american", name: "Американские", icon: "🇺🇸" },
  { id: "italian", name: "Итальянские", icon: "🇮🇹" },
  { id: "soviet", name: "Советские", icon: "⭐" }
];

export const occasions = [
  { id: "birthday", name: "День рождения", icon: "🎉" },
  { id: "wedding", name: "Свадьба", icon: "💒" },
  { id: "anniversary", name: "Юбилей", icon: "🎊" },
  { id: "romantic", name: "Романтический ужин", icon: "💕" },
  { id: "corporate", name: "Корпоратив", icon: "👔" },
  { id: "family", name: "Семейный праздник", icon: "👨‍👩‍👧‍👦" },
  { id: "tea", name: "Чаепитие", icon: "☕" }
];

export const preferences = [
  { id: "sweetness", name: "Сладость", options: ["Не очень сладкий", "Умеренно сладкий", "Очень сладкий"] },
  { id: "size", name: "Размер", options: ["Маленький (до 1 кг)", "Средний (1-1.5 кг)", "Большой (от 1.5 кг)"] },
  { id: "budget", name: "Бюджет", options: ["До 2000 ₽", "2000-3000 ₽", "От 3000 ₽"] },
  { id: "allergies", name: "Аллергии", options: ["Нет", "Глютен", "Лактоза", "Яйца"] }
];
