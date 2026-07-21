export const COLORS = {
  green: 'oklch(24% 0.045 152)',
  gold: 'oklch(74% 0.14 85)',
  goldDeep: 'oklch(60% 0.13 70)',
  sky: 'oklch(78% 0.08 220)',
  skyDeep: 'oklch(48% 0.09 220)',
} as const;

export type MenuCategory = 'small' | 'big' | 'latenight';
export type DietaryTag = 'GF' | 'V' | 'VN' | 'SP';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  tags: DietaryTag[];
  desc: string;
  cocktail: string;
  cocktailNote: string;
  beer: string;
  beerNote: string;
}

export const MENU: MenuItem[] = [
  {
    id: 'waffle', name: 'Waffle Sunshine', price: 9, category: 'small', tags: ['V'],
    desc: 'Toasted waffle bites topped with protein yogurt, crunchy granola, super seeds, and seasonal fruit, drizzled with maple syrup.',
    cocktail: 'Golden Hour Mimosa', cocktailNote: 'Sparkling citrus mirrors the fruit and maple.',
    beer: 'Fruited Sour', beerNote: 'Tart berry notes match the seasonal fruit.',
  },
  {
    id: 'cheesebuns', name: 'Cheese Buns', price: 9, category: 'small', tags: ['GF', 'V'],
    desc: "Crispy golden bites of baked cheese goodness made with yucca flour, mozzarella, and parmesan — a gluten-free delight traditional to Minas Gerais, Brazil's largest dairy producer. Served fresh out of the oven.",
    cocktail: 'Caipirinha Fizz', cocktailNote: 'Bright cachaça and lime cut through the rich cheese.',
    beer: 'Belgian Wheat', beerNote: 'Soft citrus notes echo the tang of the cheese.',
  },
  {
    id: 'sliders', name: "Lil' Smash Cheese Buns Sliders", price: 9, category: 'small', tags: [],
    desc: 'A 250th Anniversary classic with a Brazilian spin — mini smash patties on cheese bun rolls instead of brioche. American meets Minas Gerais in one bite.',
    cocktail: 'Bourbon Ginger Smash', cocktailNote: 'Ginger snap plays off the buttery cheese bun.',
    beer: 'Pilsner', beerNote: 'Clean and crisp, keeps the sliders light.',
  },
  {
    id: 'bisque', name: 'Roasted Tomato Bisque', price: 9, category: 'latenight', tags: ['V', 'GF'],
    desc: 'Rich roasted tomato bisque with fresh basil, garlic, and a touch of cream, delivering a smooth, aromatic, and comforting flavor.',
    cocktail: 'Classic Bloody Mary', cocktailNote: 'Tomato meets tomato — savory and bright.',
    beer: 'Cream Ale', beerNote: "Light and smooth, lets the bisque's cream shine.",
  },
  {
    id: 'churrasco', name: 'Churrasco', price: 9, category: 'small', tags: ['GF', 'SP'],
    desc: 'Grilled skewer drizzled with chimichurri sauce, served with a potato veggie mix salad and a cheese bun for good luck.',
    cocktail: 'Chimichurri Mule', cocktailNote: 'Jalapeño and lime mirror the herby chimichurri.',
    beer: 'Vienna Lager', beerNote: 'Toasty and smooth alongside grilled skewer.',
  },
  {
    id: 'fejuca', name: 'Fejuca', price: 9, category: 'latenight', tags: ['GF', 'SP'],
    desc: 'Hearty pork chili with slow-cooked black beans, topped with chopped collard greens, diced orange, farofa, and teardrop peppers.',
    cocktail: 'Passionfruit Capirinha', cocktailNote: "Brazil's iconic cocktail with a vibrant tropical twist.",
    beer: 'Amber Bock', beerNote: "Caramel depth balances the peppers' kick.",
  },
  {
    id: 'meatballs', name: 'Meatlovers Meatballs', price: 9, category: 'latenight', tags: [],
    desc: 'Rich, flavor-packed meatlovers meatballs — beef, sausage, and pork — in a savory tomato sauce, topped with Parmesan cheese.',
    cocktail: 'Spiced Rosemary Negroni', cocktailNote: 'Bitter herbal notes cut through the rich sauce.',
    beer: 'Brown Ale', beerNote: 'Nutty malt sweetness matches the savory meat blend.',
  },
  {
    id: 'smasher', name: 'Smasher The Burger', price: 13, category: 'big', tags: [],
    desc: 'Angus beef patty, smashed and layered with boom boom sauce and lettuce, topped with American cheese, grilled onions, and pickles on a toasted brioche bun. Go double, or add a fried egg or bacon for the meat lovers.',
    cocktail: 'Smoked Old Fashioned', cocktailNote: 'Char and caramel stand up to the smashed patty.',
    beer: 'American Amber Lager', beerNote: 'Malty backbone matches the grilled onions.',
  },
  {
    id: 'chikwich', name: "Chik 'N' Wich", price: 13, category: 'big', tags: [],
    desc: 'Grilled chicken over shredded lettuce, tomato, and onions, topped with mozzarella and ranch sauce on a toasted Portuguese sub.',
    cocktail: 'Ranch House Paloma', cocktailNote: 'Grapefruit tang balances the creamy ranch.',
    beer: 'Session IPA', beerNote: 'Light hop bitterness cuts the mozzarella.',
  },
  {
    id: 'meatballmelt', name: 'Meatball Melt Sandwich', price: 13, category: 'big', tags: [],
    desc: 'Meatlovers meatballs and melted cheese piled on a toasted Portuguese roll.',
    cocktail: 'Smoked Cherry Manhattan', cocktailNote: 'Dark fruit and smoke match the rich meatballs.',
    beer: 'Munich Dunkel', beerNote: 'Malty and smooth, built for a hearty melt.',
  },
  {
    id: 'grilledcheese', name: 'Grilled Cheese', price: 13, category: 'big', tags: ['V'],
    desc: 'A triple-cheese blend — mozzarella, parmesan, provolone — melted to perfection on toasted Italian panini bread.',
    cocktail: 'Rosemary Gin Fizz', cocktailNote: 'Herbal gin lifts the rich, cheesy panini.',
    beer: 'Saison', beerNote: 'Peppery, dry finish balances the melted cheese.',
  },
  {
    id: 'sourdoughpizza', name: 'Sourdough Pizza', price: 13, category: 'big', tags: ['V'],
    desc: "House-fermented sourdough crust, fired crisp — flavors rotate with what's fresh, ask what's on today. Toppings extra.",
    cocktail: 'Garden Basil Spritz', cocktailNote: 'Herbal and bubbly, plays with the char of the crust.',
    beer: 'Italian Pilsner', beerNote: 'Crisp and clean, lets the rotating toppings shine.',
  },
];

export interface SipItem {
  id: string;
  name: string;
  price: number;
  desc: string;
}

export const SIPS: SipItem[] = [
  { id: 'bottledwater', name: 'Bottled Water', price: 2, desc: 'Still water, ice-cold and ready when you are.' },
  { id: 'seltzer', name: 'Sparkling Water', price: 2, desc: 'Chilled sparkling water, plain or lightly flavored.' },
  { id: 'soda', name: 'Canned Soda', price: 2, desc: 'Classic cola, lemon-lime, and root beer.' },
  { id: 'hopwtr', name: 'Hop WTR', price: 3, desc: 'Hop-infused sparkling water — all the flavor, none of the alcohol.' },
  { id: 'celsius', name: 'Celsius', price: 3, desc: 'Sparkling fitness drink, zero sugar, full flavor.' },
  { id: 'icedtea', name: 'Iced Tea', price: 3, desc: 'By Tiesta Tea — brewed and chilled, rotating seasonal flavors.' },
  { id: 'icedcoffee', name: 'Iced Coffee', price: 3, desc: 'By Mighty Oak — smooth cold brew, ready to go.' },
  { id: 'bottledjuice', name: 'Bottled Juice', price: 7, desc: 'Fresh variety of seasonal rotating flavors.' },
  { id: 'kombucha', name: 'Kombucha', price: 7, desc: 'Small-batch, fermented and fizzy — rotating seasonal flavors.' },
  { id: 'michelada', name: 'MichelaN/A', price: 8, desc: 'Non-alcoholic michelada — tomato, lime, and spice, all the kick, none of the beer.' },
];

export type PackageGroup = 'selfServe' | 'fullService';

export interface CateringPackage {
  id: string;
  name: string;
  group: PackageGroup;
  perPerson: number;
  summary: string;
  details: string[];
}

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'grazing', name: 'Grazing Tables', group: 'selfServe', perPerson: 18,
    summary: 'An effortless display spread guests can graze on all afternoon.',
    details: ['2 small bites of your choice', '1 non-alcoholic drink per guest', 'Display-style presentation, no service staff required', 'Best for backyard gatherings & office parties'],
  },
  {
    id: 'brunch', name: 'Rise & Shine Brunch', group: 'fullService', perPerson: 32,
    summary: 'A sunny morning spread built around our Waffle Sunshine and fresh brews.',
    details: ['Waffle Sunshine bar with toppings', 'Cheese Buns fresh out of the oven', 'Iced Tea & Iced Coffee service', 'Fresh fruit & juice display', 'Great for showers, reunions & Sunday send-offs'],
  },
  {
    id: 'latenight', name: 'Late Nite Bite', group: 'selfServe', perPerson: 22,
    summary: 'The perfect late-night snack—hearty, comforting favorites served late in the evening to satisfy cravings and end the night on a delicious note.',
    details: ['Full Late Nite Bites menu — meatballs, fejuca, bisque', 'Served warm through the end of your event', 'Popular add-on for weddings & late receptions', 'Non-alcoholic drink station included'],
  },
  {
    id: 'privatechef', name: 'Private Chef Dinner', group: 'fullService', perPerson: 65,
    summary: 'A fully hosted, off-site private dining experience.',
    details: ['Full off-site private chef experience', 'Custom plated menu curated with our chef', 'Travel & setup within 50 miles included', 'Dedicated server + bartender staffing'],
  },
  {
    id: 'petiscos', name: 'Petiscos & Beliscos', group: 'selfServe', perPerson: 25,
    summary: "Inspired by Brazil's iconic botecos, this menu features classic bar bites that are bold in flavor, easy to share, and impossible to stop eating.",
    details: ['Choice of 4 menu items across Small & Big Bites', 'House sides included', 'On-site chef presence', 'Great for showers, birthdays & milestone parties'],
  },
  {
    id: 'bbq', name: 'Churrasco Cookout', group: 'fullService', perPerson: 55,
    summary: 'Backyard cookout energy with a Brazilian grill at the center of it all.',
    details: ['Churrasco skewers grilled to order', 'Choice of 2 Big Bites off the grill', 'Potato veggie mix salad & sides', 'Chimichurri & house sauces', 'Ideal for reunions, block parties & team cookouts'],
  },
];

export interface BarTier {
  id: string;
  name: string;
  emoji?: string;
  base: number;
  perPerson: number;
  tagline?: string;
  desc?: string;
  includes?: string[];
  perfectFor?: string;
  /** dry.BAR counts adults+children; all other paid tiers count adults only */
  countsChildren?: boolean;
}

export const ALCOHOL_TIERS: BarTier[] = [
  { id: 'none', name: 'No Bar Service', base: 0, perPerson: 0 },
  {
    id: 'dry', name: 'dry.BAR', emoji: '🍹', base: 400, perPerson: 12, countsChildren: true,
    tagline: 'Zero proof. Full flavor.',
    desc: 'An elevated alcohol-free experience featuring handcrafted mocktails, premium N/A spirits, N/A beers, and refreshing specialty beverages.',
    includes: ['Handcrafted Mocktail Menu', 'Premium N/A Spirits & Beers', 'Fresh Juices & House-Made Syrups', 'Sparkling & Still Water Service', 'Professional Bartender(s)', 'Garnishes & Glassware'],
    perfectFor: 'Brunches • Baby Showers • Corporate Events • Family Celebrations',
  },
  {
    id: 'mix', name: 'mix.BAR', emoji: '🍸', base: 500, perPerson: 16,
    tagline: 'You supply the spirits. We bring the party.',
    desc: 'Professional bartenders, mixers, garnishes, and everything needed to transform your alcohol into a seamless bar experience.',
    includes: ['Professional Bartender(s)', 'Mixers & Garnishes', 'Ice & Glassware', 'Bar Setup & Breakdown', 'Client Supplies the Alcohol'],
    perfectFor: 'Weddings • Backyard Parties • Private Events',
  },
  {
    id: 'full', name: 'full.BAR', emoji: '🥂', base: 750, perPerson: 32,
    tagline: 'Everything you need. Nothing to worry about.',
    desc: 'Our all-inclusive bar service handles the shopping, setup, bartending, and cleanup so you can enjoy your event.',
    includes: ['Beer, Wine & Cider Selection', 'Full Liquor Selection', 'Professional Bartender(s)', 'Mixers, Garnishes & Ice', 'Glassware & Bar Styling', 'Alcohol Shopping, Setup & Cleanup'],
    perfectFor: 'Weddings • Galas • Corporate Events • Large Celebrations',
  },
  {
    id: 'speakeasy', name: 'speakeasy.BAR', emoji: '🥃', base: 1000, perPerson: 48,
    tagline: 'Craft cocktails. Hidden-gem vibes. Unforgettable experience.',
    desc: 'Designed for hosts who want more than an open bar, speakeasy.BAR delivers a boutique cocktail lounge atmosphere with handcrafted drinks, premium spirits, and an interactive guest experience.',
    includes: ['Curated Craft Cocktail Menu', 'Small-Batch Spirits', 'House-Made Syrups & Fresh Juices', 'Fresh Herbs, Citrus & Premium Garnishes', 'Seasonal & Signature Cocktails', 'Custom Printed Cocktail Menu'],
    perfectFor: 'Luxury Weddings • Cocktail Receptions • Rehearsal Dinners • VIP Events • Black Tie Galas',
  },
];

export interface AddOn {
  id: string;
  label: string;
  price: number;
  detail: string;
}

export const ADD_ONS: AddOn[] = [
  { id: 'permit', label: 'Event Permit Assistance', price: 75, detail: 'We help identify and file any local permits needed to serve at your venue.' },
  { id: 'barSetup', label: 'Bar Setup & Breakdown', price: 150, detail: 'Full delivery, setup, and breakdown of your bar station so you never lift a finger.' },
  { id: 'avProjector', label: 'A/V Projector Rental', price: 100, detail: 'Projector and screen rental for toasts, slideshows, or games.' },
  { id: 'ice', label: 'Ice Delivery', price: 60, detail: 'Bagged ice delivered and kept stocked throughout your event.' },
  { id: 'waterStation', label: 'Water Station', price: 100, detail: 'Self-serve still & sparkling water station for guests throughout the event.' },
  { id: 'coffeeTea', label: 'Coffee & Tea Station', price: 175, detail: 'Self-serve hot coffee and tea station, cups and condiments included.' },
  { id: 'mimosaBar', label: 'Mimosa Bar', price: 250, detail: 'Sparkling wine with a build-your-own juice and garnish bar — great for brunch.' },
  { id: 'bloodyMaryBar', label: 'Bloody Mary Bar', price: 275, detail: 'House Bloody Mary mix with a full spread of savory garnishes and hot sauces.' },
  { id: 'martiniBar', label: 'Martini Bar', price: 300, detail: 'You call it, we make it! A build-to-order martini station for guests.' },
  { id: 'mixologyClass', label: 'Mixology Class', price: 450, detail: 'A guided, hands-on cocktail-making class led by one of our bartenders.' },
  { id: 'smokedExperience', label: 'Smoked Experience', price: 200, detail: 'Tableside smoked cocktail service — smoke domes, torch, and a bit of theater.' },
  { id: 'craftOfCocktail', label: 'The Craft of the Cocktail', price: 225, detail: 'Following classic recipes from the Industry Classic book — choice of 2 classics.' },
  { id: 'mobileBar', label: 'Mobile Bar (Trailer) Rental', price: 400, detail: 'Our full mobile bar trailer, delivered and staffed at your venue.' },
];

export interface Chef {
  id: string;
  name: string;
  specialty: string;
  dates: string;
  bio: string;
  /** 1-4 = nth Thursday of the month */
  nthThursday: 1 | 2 | 3 | 4;
  /** Short label used on calendar event tiles (may abbreviate the full specialty) */
  calendarLabel: string;
}

export const CHEFS: Chef[] = [
  { id: 'marisol', name: 'Chef Marisol Duarte', specialty: 'Brazilian Steakhouse Nights', dates: 'EVERY 3rd Thursday', nthThursday: 3, bio: 'Third-generation churrasco pitmaster bringing family recipes from Minas Gerais to the truck window.', calendarLabel: 'Chef Marisol — Brazilian Steakhouse' },
  { id: 'owen', name: 'Chef Owen Castellano', specialty: 'Smoke & Barrel BBQ', dates: 'EVERY 1st Thursday', nthThursday: 1, bio: "Local pitmaster pairing slow-smoked plates with Speakeasy Motors' barrel-aged whiskey.", calendarLabel: 'Chef Owen — Smoke & Barrel BBQ' },
  { id: 'priya', name: 'Chef Priya Anand', specialty: 'Tandoor Truck Takeover', dates: 'EVERY 2nd Thursday', nthThursday: 2, bio: 'Reimagines street-cart classics with tandoor-fired flatbreads and house chutneys.', calendarLabel: 'Chef Priya — Tandoor Truck Takeover' },
  { id: 'gigi', name: 'Chef Gigi Alvarez', specialty: 'Mingle & Sweets Grazing Social', dates: 'EVERY 4th Thursday', nthThursday: 4, bio: 'Curates grazing tables and dessert spreads built for business networking, community mixers, and birthday-month celebrations.', calendarLabel: 'Chef Gigi — Mingle & Sweets Grazing Social' },
];

export interface BannerSlide {
  id: string;
  eyebrow: string;
  headline: string;
  sub: string;
  schedule: string;
}

export const BANNER_ITEMS: BannerSlide[] = [
  { id: 'chefowen', eyebrow: 'GUEST CHEF', headline: 'Smoke & Barrel BBQ', sub: "Chef Owen Castellano pairs slow-smoked plates with Speakeasy Motors' barrel-aged whiskey.", schedule: '1st Thursday of every month' },
  { id: 'chefpriya', eyebrow: 'GUEST CHEF', headline: 'Tandoor Takeover', sub: 'Chef Priya Anand reimagines street-cart classics with tandoor-fired flatbreads.', schedule: '2nd Thursday of every month' },
  { id: 'chefmarisol', eyebrow: 'GUEST CHEF', headline: 'Brazilian Steakhouse Nights', sub: 'Chef Marisol Duarte brings family churrasco recipes from Minas Gerais.', schedule: '3rd Thursday of every month' },
  { id: 'chefgigi', eyebrow: 'GUEST CHEF', headline: 'Mingle & Sweets Grazing Social', sub: 'Chef Gigi Alvarez curates grazing tables and desserts for networking & birthday-month celebrations.', schedule: '4th Thursday of every month' },
];

export type EventCategory = 'chef' | 'brunch' | 'yard' | 'sunset' | 'closed' | 'retail';

export interface RecurringEvent {
  title: string;
  desc: string;
  schedule: string;
  cta: string;
  /** 0=Sun ... 6=Sat */
  weekdays: number[];
  label: string;
  category: EventCategory;
}

export const RECURRING_EVENTS: RecurringEvent[] = [
  { title: 'Sunset Sips & Bites', desc: 'Garden cocktails, craft beer & platters over live music every Friday.', schedule: 'FRIDAYS 3P – SUNSET', cta: 'RSVP FOR HAPPY HOUR SPECIALS', weekdays: [5], label: 'Sunset Sips & Bites', category: 'sunset' },
  { title: 'Weekend Brunch', desc: 'Guest chef experience with rotating farm-to-table specials.', schedule: 'SAT/SUN 1P – 4P', cta: 'RSVP REQUIRED', weekdays: [0, 6], label: 'Weekend Brunch', category: 'brunch' },
  { title: 'The Yard League', desc: 'Sunday backyard games — family day, pet friendly.', schedule: 'SUNDAYS 11A – 2P', cta: 'REGISTRATION REQUIRED', weekdays: [0], label: 'The Yard League', category: 'yard' },
];

export const CATEGORY_COLORS: Record<EventCategory, { bg: string; border: string }> = {
  chef: { bg: 'var(--cat-chef-bg)', border: 'var(--cat-chef-border)' },
  brunch: { bg: 'var(--cat-brunch-bg)', border: 'var(--cat-brunch-border)' },
  yard: { bg: 'var(--cat-yard-bg)', border: 'var(--cat-yard-border)' },
  sunset: { bg: 'var(--cat-sunset-bg)', border: 'var(--cat-sunset-border)' },
  closed: { bg: 'var(--cat-closed-bg)', border: 'var(--cat-closed-border)' },
  retail: { bg: 'var(--cat-retail-bg)', border: 'var(--cat-retail-border)' },
};

/** month key: `${year}-${monthIndex0}` */
export const US_HOLIDAYS_BY_MONTH: Record<string, Record<number, string>> = {
  '2026-0': { 1: "New Year's Day", 19: 'MLK Day' },
  '2026-1': { 16: 'Presidents Day' },
  '2026-4': { 25: 'Memorial Day' },
  '2026-5': { 19: 'Juneteenth' },
  '2026-6': { 4: 'Independence Day' },
  '2026-8': { 7: 'Labor Day' },
  '2026-9': { 12: 'Columbus Day' },
  '2026-10': { 11: 'Veterans Day', 26: 'Thanksgiving' },
  '2026-11': { 25: 'Christmas Day' },
};

export interface CalendarOverrideEvent {
  label: string;
  type: 'chef' | 'recurring' | 'custom';
  category: EventCategory;
}

/** Manual one-off overrides for a given day within a month, keyed like US_HOLIDAYS_BY_MONTH.
 *  Currently empty — kept so the client can hand-schedule exceptions later. */
export const CALENDAR_EVENTS_BY_MONTH: Record<string, Record<number, CalendarOverrideEvent>> = {};

export const STAFF_RATES = { headChef: 55, support: 45 };
export const SELF_SERVE_HOURS = 2;
export const FULL_SERVICE_HOURS = 2 + 3 + 1;
export const DELIVERY_SETUP_FLAT = 75;
export const BASE_MILEAGE = 50;
export const MILEAGE_ALLOWANCE_MILES = 20;
export const TIP_RATE = 0.18;
export const BASE_STAFF_GUEST_THRESHOLD = 25;
export const SUPPORT_STAFF_PER_BLOCK = 1;
export const BASE_HEAD_CHEF_COUNT = 1;
export const BASE_SUPPORT_STAFF = 2;

export const RSVP_URL = 'https://www.eventbrite.com/o/60183746723';
export const VISIT_US_URL = 'https://share.google/RjhrxRhreqaAY210Q';
export const CONTACT_EMAIL = 'info@upcyclebrews.com';

/**
 * Google Apps Script Web App URL that emails the catering quote PDF to
 * CONTACT_EMAIL — see google-apps-script/README.md for deploy steps. Until
 * this is filled in, the quote button falls back to a plain mailto: link.
 */
export const QUOTE_ENDPOINT_URL =
  'https://script.google.com/macros/s/AKfycbz-YhaaMEjUSoU-j1jOGtwFn72oMuEyZcc_ug-Bupdsjd3z4dU8yQoRi2F0O6Ap8lZb/exec';
/** Optional shared secret — only used if you enabled the check in Code.gs. */
export const QUOTE_ENDPOINT_SECRET = '';

export const DIETARY_LABELS: Record<DietaryTag, string> = {
  GF: 'Gluten-Free',
  V: 'Vegetarian',
  VN: 'Vegan',
  SP: 'Spicy',
};

export interface BookingFeeResult {
  fee: number;
  note: string;
}

export function calcBookingFee(group: PackageGroup, totalGuests: number): BookingFeeResult {
  if (group === 'selfServe') {
    const fee = DELIVERY_SETUP_FLAT + SELF_SERVE_HOURS * STAFF_RATES.headChef + BASE_MILEAGE;
    const note = `Delivery + ${SELF_SERVE_HOURS}h on-site setup by a PRO Chef, self-serve (no breakdown/cleanup). Includes basic disposables (cups, plates, cutlery, napkins). Includes first ${MILEAGE_ALLOWANCE_MILES} miles — extra mileage billed separately.`;
    return { fee, note };
  }
  const extraBlocks = totalGuests > BASE_STAFF_GUEST_THRESHOLD
    ? Math.ceil((totalGuests - BASE_STAFF_GUEST_THRESHOLD) / BASE_STAFF_GUEST_THRESHOLD)
    : 0;
  const supportStaffCount = BASE_SUPPORT_STAFF + extraBlocks * SUPPORT_STAFF_PER_BLOCK;
  const laborCost = (STAFF_RATES.headChef + supportStaffCount * STAFF_RATES.support) * FULL_SERVICE_HOURS;
  const fee = laborCost + BASE_MILEAGE;
  const note = `Staffed with 1 Head Chef + ${supportStaffCount} Support/Serve Staff for ${FULL_SERVICE_HOURS}h (${SELF_SERVE_HOURS}h setup, 3h service, 1h breakdown). Includes basic disposables (cups, plates, cutlery, napkins). Includes first ${MILEAGE_ALLOWANCE_MILES} miles — extra mileage billed separately.`;
  return { fee, note };
}
