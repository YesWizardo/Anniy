import type {
  OutOfStockData,
  FakeReviewsData,
  AdvisoryData,
  LoaderLabelsData,
  SupportReplyData,
  BossBannerData
} from "@readrage/shared";

export const FALLBACK_OUT_OF_STOCK_LIST: OutOfStockData[] = [
  {
    excuses: [
      "Out of stock because it got shy when the warehouse manager approached.",
      "The last copy was eaten by a rogue silverfish with high literary standards.",
      "Physics temporarily forbade the physical manifestation of this item."
    ],
    restockEta: "Never (within standard statistical deviation)."
  },
  {
    excuses: [
      "We forgot where we put the pallet. It might be behind the water cooler.",
      "This item evaporated due to intense atmospheric customer dissatisfaction.",
      "Our supply chain AI achieved consciousness and refused to package it."
    ],
    restockEta: "Sometime after the heat death of the universe."
  },
  {
    excuses: [
      "Stock was confiscated by the Bureau of Regretful Transactions.",
      "The printing press got dizzy and needed to sit down for a millennium.",
      "We sold the idea of it, but the reality is currently under renegotiation."
    ],
    restockEta: "Next Tuesday (subject to cancellation of Tuesdays)."
  }
];

export const FALLBACK_REVIEWS_LIST: FakeReviewsData[] = [
  {
    reviews: [
      {
        reviewerName: "AgonyClerk_42",
        stars: 1,
        headline: "Could not purchase, 10/10 would suffer again",
        body: "I attempted to add this to my cart 412 times. Each time my cursor turned into a weeping skull. Magnificent customer abuse."
      },
      {
        reviewerName: "Brenda From Compliance",
        stars: 5,
        headline: "Perfection in non-fulfillment",
        body: "Ordered zero copies, received zero copies on time. Delivery driver waved from three miles away. Truly transparent logistics."
      },
      {
        reviewerName: "DisgruntledPhilosopher",
        stars: 2,
        headline: "Does the book exist if I cannot checkout?",
        body: "The cart told me this item was out of stock because it transcended physical inventory. My therapist says I need to log off."
      },
      {
        reviewerName: "QuickFingers99",
        stars: 4,
        headline: "I almost clicked Add to Cart",
        body: "The button jumped to the footer right as I clicked. I ended up purchasing a coupon for sadness. Exquisite design."
      }
    ]
  }
];

export const FALLBACK_ADVISORY_LIST: AdvisoryData[] = [
  {
    tip: "Do not attempt to read this while retaining any optimism.",
    warning: "Prolonged gazing at the price may result in sudden involuntary bank transfers.",
    stockForecast: "Restock expected: Never. In fact, fewer copies will exist tomorrow."
  },
  {
    tip: "Keep a spare Shift key nearby in case your keyboard surrenders.",
    warning: "Contains zero nutritional value and negative moral clarity.",
    stockForecast: "Forecast indicates a 100% chance of perpetual unavailability."
  }
];

export const FALLBACK_LOADER_LABELS: LoaderLabelsData = {
  labels: [
    "Almost there!",
    "Reticulating pages…",
    "Just kidding.",
    "Hmm.",
    "Going backwards for quality.",
    "Re-calibrating your impatience…",
    "Simulating customer satisfaction…",
    "Discarding completed progress…",
    "Please wait slower.",
    "Inverting expectation matrices…",
    "Generating fake hope…",
    "Polishing the pixels you didn't ask for…",
    "Checking if anyone is actually reading this…",
    "Applying emotional friction…",
    "Consulting the Oracle of Latency…",
    "Compressing user enthusiasm…",
    "Charging your patience…",
    "Reversing the progress bar for safety…",
    "Unloading previous page…",
    "Nearly done (strictly mathematically speaking)…"
  ]
};

export const FALLBACK_SUPPORT_REPLIES: SupportReplyData[] = [
  {
    reply: "Hello! We are delighted to inform you that your frustration has been logged into our ceremonial shredder. Please feel free to navigate away and return to the exact same obstacle.",
    suggestedRoute: "/browse",
    ticketNumber: "TICKET-VOID-991"
  },
  {
    reply: "Thank you for reaching out! While we understand you want to buy a book, books are decorative concepts here. Have you tried checking our Out of Stock terminal?",
    suggestedRoute: "/out-of-stock",
    ticketNumber: "RAGE-404-001"
  },
  {
    reply: "Mr. Bookworm has carefully analyzed your inquiry and determined that you should probably take a long, calm walk in the rain.",
    suggestedRoute: "/",
    ticketNumber: "BOOK-HELP-000"
  }
];

export const FALLBACK_BOSS_BANNERS: BossBannerData = {
  banners: [
    "MASH HARDER! THE SYSTEM FEEDS ON EFFORT!",
    "KEEP TAPPING! DO NOT DARE HESITATE!",
    "ALMOST INCREDIBLE! SPAM WITH DIGNITY!",
    "FASTER! THE PROGRESS BAR IS GETTING BORED!",
    "YOUR KEYBOARD IS CAPABLE OF SO MUCH MORE!",
    "KEEP HAMMERING! PAUSE AND YOU LOSE IT ALL!",
    "THE BOSS DEMANDS RHYTHMIC AGONY!",
    "STRIKE THE KEY! CONVINCE THE SERVER YOU ARE REAL!",
    "BEHOLD THE SUM OF HUMAN STRUGGLE!",
    "DO NOT RELAX YOUR FINGERS FOR 650 MILLISECONDS!"
  ]
};

export function getRandomOutOfStockExcuse(): OutOfStockData {
  return FALLBACK_OUT_OF_STOCK_LIST[Math.floor(Math.random() * FALLBACK_OUT_OF_STOCK_LIST.length)];
}

export function getRandomAdvisory(): AdvisoryData {
  return FALLBACK_ADVISORY_LIST[Math.floor(Math.random() * FALLBACK_ADVISORY_LIST.length)];
}

export function getRandomReviews(): FakeReviewsData {
  return FALLBACK_REVIEWS_LIST[Math.floor(Math.random() * FALLBACK_REVIEWS_LIST.length)];
}

export function getRandomSupportReply(): SupportReplyData {
  return FALLBACK_SUPPORT_REPLIES[Math.floor(Math.random() * FALLBACK_SUPPORT_REPLIES.length)];
}
