export interface Category {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  title: string;
  author: string;
  description: string;
  price_amount: number;
  price_currency_symbol: string;
  stock_count: number;
  image_emoji: string;
  created_at: string;
}

export const SEED_CATEGORIES: Category[] = [
  { id: "11111111-1111-1111-1111-111111111101", slug: "fiction-of-regret", name: "Fiction of Regret", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111102", slug: "non-fiction-allegedly", name: "Non-Fiction (Allegedly)", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111103", slug: "self-help-makes-it-worse", name: "Self-Help (Makes It Worse)", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111104", slug: "childrens-books-unsettling", name: "Children's Books (Unsettling)", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111105", slug: "cookbooks-unaffordable", name: "Cookbooks for Ingredients You Cannot Afford", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111106", slug: "cursed-stationery", name: "Cursed Stationery", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111107", slug: "miscellaneous-air", name: "Miscellaneous Air", created_at: new Date().toISOString() }
];

export const SEED_PRODUCTS: Product[] = [
  // Fiction of Regret
  {
    id: "22222222-2222-2222-2222-222222222201",
    category_id: "11111111-1111-1111-1111-111111111101",
    title: "A Book About Nothing (Blank)",
    author: "Anonymous Nihilist",
    description: "350 pages of crisp, guilt-inducing cream bond paper with zero ink applied.",
    price_amount: 49999.99,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "📖",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222202",
    category_id: "11111111-1111-1111-1111-111111111101",
    title: "The Email You Sent at 2:14 AM",
    author: "Mortimer Shivering",
    description: "A thriller about hitting reply-all to the entire executive leadership committee.",
    price_amount: 0.01,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "📧",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222203",
    category_id: "11111111-1111-1111-1111-111111111101",
    title: "Someone Else Was Right on the Internet",
    author: "C. D. Argumentative",
    description: "A tragic tragedy where a stranger refuses your citations and sleeps peacefully.",
    price_amount: 139999.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "⌨️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222204",
    category_id: "11111111-1111-1111-1111-111111111101",
    title: "Should Have Bought Bitcoin in 2010",
    author: "Hindsight McPain",
    description: "Every chapter is just the current market price printed in bold 72pt font.",
    price_amount: 888888.88,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "📉",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222205",
    category_id: "11111111-1111-1111-1111-111111111101",
    title: "The Cutlery That Walked Away",
    author: "Inspector Drawer",
    description: "Whodunit where your favorite fork vanishes into the fourth dimension.",
    price_amount: 12.50,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🍴",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222206",
    category_id: "11111111-1111-1111-1111-111111111101",
    title: "Yesterday’s Unsent Apology",
    author: "W. H. Cowardice",
    description: "Poetry written in draft folders that you deleted right before dawn.",
    price_amount: 420.69,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🥀",
    created_at: new Date().toISOString()
  },

  // Non-Fiction (Allegedly)
  {
    id: "22222222-2222-2222-2222-222222222207",
    category_id: "11111111-1111-1111-1111-111111111102",
    title: "The Entire Dictionary Minus The Letter E",
    author: "G. Perec Tribute Band",
    description: "A rigorous lexigraphic endeavor omitting humanity's most ubiquitous glyph.",
    price_amount: 9999999.99,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🔤",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222208",
    category_id: "11111111-1111-1111-1111-111111111102",
    title: "One Left Sock: A Memoir",
    author: "Sole Survivor",
    description: "The harrowing tale of being separated from righty in the tumble dryer spin cycle.",
    price_amount: 89.90,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🧦",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222209",
    category_id: "11111111-1111-1111-1111-111111111102",
    title: "10,000 Reasons Why Pigeons Stare At You",
    author: "Dr. Avian Paranoia",
    description: "Peer-reviewed evidence that urban birds are silently assessing your posture.",
    price_amount: 27500.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🐦",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222210",
    category_id: "11111111-1111-1111-1111-111111111102",
    title: "A Complete History of Beige Walls",
    author: "Archibald Boring",
    description: "Nine volumes charting the subtle despair of institutional eggshell paint.",
    price_amount: 500.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🧱",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222211",
    category_id: "11111111-1111-1111-1111-111111111102",
    title: "How to Pretend You Understood the Meeting",
    author: "Vice President Synergy",
    description: "Definitive corporate handbook on nodding sagely and saying 'let's take that offline'.",
    price_amount: 75000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "👔",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222212",
    category_id: "11111111-1111-1111-1111-111111111102",
    title: "Encyclopedia of Awkward Silences",
    author: "The Lurker",
    description: "Catalog of every gap in conversation recorded between 1994 and yesterday.",
    price_amount: 1000.01,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🤐",
    created_at: new Date().toISOString()
  },

  // Self-Help (Makes It Worse)
  {
    id: "22222222-2222-2222-2222-222222222213",
    category_id: "11111111-1111-1111-1111-111111111103",
    title: "Overthinking: An Advanced Masterclass",
    author: "Prof. Mind Spiral",
    description: "Learn how to extract 14 distinct insult vectors from a thumbs-up emoji.",
    price_amount: 3499.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🧠",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222214",
    category_id: "11111111-1111-1111-1111-111111111103",
    title: "How to Lose Friends and Bother People",
    author: "D. Carnage",
    description: "Actionable techniques to ensure no one invites you to weekend brunch ever again.",
    price_amount: 99.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🗣️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222215",
    category_id: "11111111-1111-1111-1111-111111111103",
    title: "Procrastination for Overachievers",
    author: "Due Tomorrow, Do Tomorrow",
    description: "Why complete tasks today when panic provides superior cardiovascular stimulation?",
    price_amount: 0.05,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "⏳",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222216",
    category_id: "11111111-1111-1111-1111-111111111103",
    title: "The Subtle Art of Making Every Room Cold",
    author: "Thermostat Tyrant",
    description: "Dominate your family members through uncompromising baseline micro-climates.",
    price_amount: 64200.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "❄️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222217",
    category_id: "11111111-1111-1111-1111-111111111103",
    title: "Manifesting Catastrophes Through Sheer Will",
    author: "Doom Prophet",
    description: "If you worry about it 24/7, maybe the universe will just give in to appease you.",
    price_amount: 77777.77,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🌪️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222218",
    category_id: "11111111-1111-1111-1111-111111111103",
    title: "Sitting Uncomfortably With Your Choices",
    author: "Guru Squirm",
    description: "Posture guidelines for reliving high school blunders while lying in bed.",
    price_amount: 19999.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🪑",
    created_at: new Date().toISOString()
  },

  // Children's Books (Unsettling)
  {
    id: "22222222-2222-2222-2222-222222222219",
    category_id: "11111111-1111-1111-1111-111111111104",
    title: "Goodnight Room, Goodnight Dread",
    author: "Margaret Wise Spook",
    description: "Illustrated bedtime poem whispering about all the shadows that didn't leave at dawn.",
    price_amount: 1450.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🛏️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222220",
    category_id: "11111111-1111-1111-1111-111111111104",
    title: "The Little Teapot Who Screamed",
    author: "Nursery Nightmare",
    description: "Short and stout, until the water boiled away and it discovered existential awareness.",
    price_amount: 3200.50,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🫖",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222221",
    category_id: "11111111-1111-1111-1111-111111111104",
    title: "Where The Wild Things File Taxes",
    author: "Maurice S. Audit",
    description: "Max gets sent to bed without dinner and spends 40 years reconciling receipts.",
    price_amount: 89999.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "👹",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    category_id: "11111111-1111-1111-1111-111111111104",
    title: "Harold and the Invisible Purple Abyss",
    author: "Crayon of Terror",
    description: "He drew a door in the air, walked through it, and never saw a polygon again.",
    price_amount: 4999.99,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🖍️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222223",
    category_id: "11111111-1111-1111-1111-111111111104",
    title: "The Very Hungry Caterpillar Who Ate Concrete",
    author: "Eric C. Crunch",
    description: "A charming board book ending abruptly on page four with severe structural indigestion.",
    price_amount: 750.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🐛",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222224",
    category_id: "11111111-1111-1111-1111-111111111104",
    title: "Curious George and the Terms of Service",
    author: "H. A. Rey-morse",
    description: "George signs away his biometric telemetry and intellectual property rights.",
    price_amount: 12000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🐒",
    created_at: new Date().toISOString()
  },

  // Cookbooks for Ingredients You Cannot Afford
  {
    id: "22222222-2222-2222-2222-222222222225",
    category_id: "11111111-1111-1111-1111-111111111105",
    title: "Artisanal Rainwater Braised in Regret",
    author: "Chef Pierre Pretentious",
    description: "Ingredients: 4 drops of virgin precipitation gathered over Lake Como, a single glance.",
    price_amount: 499999.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🌧️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222226",
    category_id: "11111111-1111-1111-1111-111111111105",
    title: "White Truffles Fed Only to Racehorses",
    author: "Lord Saffron",
    description: "Pre-heat oven to 450° and throw away your annual rent in 14 aromatic minutes.",
    price_amount: 8750000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🍄",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222227",
    category_id: "11111111-1111-1111-1111-111111111105",
    title: "The Luxury of Boiling Saltwater",
    author: "Sea Merchant",
    description: "A Michelin-star guide to reducing water until nothing remains except white dust.",
    price_amount: 18000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🧂",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222228",
    category_id: "11111111-1111-1111-1111-111111111105",
    title: "Edible 24k Gold Foil for Broke Students",
    author: "Alchemist Ramen",
    description: "How to plate instant noodles so you look majestic while suffering malnutrition.",
    price_amount: 99999.99,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🍜",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222229",
    category_id: "11111111-1111-1111-1111-111111111105",
    title: "Toast: The Unattainable Sourdough Dream",
    author: "Baker Snob",
    description: "Requires a starter culture fermented in 1842 and three generations of patience.",
    price_amount: 25000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🍞",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222230",
    category_id: "11111111-1111-1111-1111-111111111105",
    title: "Endangered Sturgeon Tears on Toast",
    author: "Gourmet Malice",
    description: "Extremely salty, morally reprehensible, and visually indistinguishable from water.",
    price_amount: 14200000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🐟",
    created_at: new Date().toISOString()
  },

  // Cursed Stationery
  {
    id: "22222222-2222-2222-2222-222222222231",
    category_id: "11111111-1111-1111-1111-111111111106",
    title: "The Pen That Only Writes When Tested",
    author: "BiC Poltergeist",
    description: "Flawless line on scratch paper, absolute vacuum when signing your legal deed.",
    price_amount: 49.99,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🖊️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222232",
    category_id: "11111111-1111-1111-1111-111111111106",
    title: "Sticky Notes That Refuse All Adhesion",
    author: "Post-It Betrayal",
    description: "Falls gracefully to the floor the exact second you turn your back to fetch coffee.",
    price_amount: 120.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🗒️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222233",
    category_id: "11111111-1111-1111-1111-111111111106",
    title: "The Stapler That Chews and Never Binds",
    author: "Swingline Demon",
    description: "Transforms pristine office documents into mangled confetti with a terrifying metallic crunch.",
    price_amount: 850.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "📎",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222234",
    category_id: "11111111-1111-1111-1111-111111111106",
    title: "Correction Tape That Smears Everything",
    author: "Tipp-Ex Malevolence",
    description: "Coats your minor spelling mistakes in an opaque ribbon of grease and shame.",
    price_amount: 65.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🩹",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222235",
    category_id: "11111111-1111-1111-1111-111111111106",
    title: "Notebook With Pages Made of Wet Tissue",
    author: "Papyrus Frailty",
    description: "Dissolves upon contact with human perspiration or mild humidity.",
    price_amount: 299.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "📓",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222236",
    category_id: "11111111-1111-1111-1111-111111111106",
    title: "Scissors That Only Cut Leftward and Jagged",
    author: "Shear Spite",
    description: "Engineered to turn clean rectangular wrapping paper into an angry staircase.",
    price_amount: 380.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "✂️",
    created_at: new Date().toISOString()
  },

  // Miscellaneous Air
  {
    id: "22222222-2222-2222-2222-222222222237",
    category_id: "11111111-1111-1111-1111-111111111107",
    title: "Used Air — 2nd Edition",
    author: "Atmospheric Syndicate",
    description: "Gently inhaled in Zürich, expelled into a sterile borosilicate ampoule.",
    price_amount: 150000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "💨",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222238",
    category_id: "11111111-1111-1111-1111-111111111107",
    title: "Pre-Storm Humidity Sealed in a Jar",
    author: "Barometric Collector",
    description: "Smells like static electricity, wet grass, and the panic of laundry left outside.",
    price_amount: 8800.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🏺",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222239",
    category_id: "11111111-1111-1111-1111-111111111107",
    title: "The Scent of an Unopened Book You Will Never Read",
    author: "Bibliophile Guilt",
    description: "A synthetic aroma compound distilled from pure aspirational delusion.",
    price_amount: 45000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🕯️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222240",
    category_id: "11111111-1111-1111-1111-111111111107",
    title: "Zero Gravity Nitrogen (Vintage 1999)",
    author: "Orbit Vault",
    description: "Captured outside Mir space station during a quiet Tuesday afternoon.",
    price_amount: 99999999.99,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🛰️",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222241",
    category_id: "11111111-1111-1111-1111-111111111107",
    title: "Pure Breath of a Sleeping Librarian",
    author: "Silentium Noctis",
    description: "Guaranteed to possess a noise level strictly below 12 decibels.",
    price_amount: 320000.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "🤫",
    created_at: new Date().toISOString()
  },
  {
    id: "22222222-2222-2222-2222-222222222242",
    category_id: "11111111-1111-1111-1111-111111111107",
    title: "A Literal Vacuum in a Bubble Envelope",
    author: "Absolute Zero Corp",
    description: "Contains precisely nothing, certified at 0.00000001 Pascals.",
    price_amount: 1999999.00,
    price_currency_symbol: "₹",
    stock_count: 0,
    image_emoji: "📦",
    created_at: new Date().toISOString()
  }
];
