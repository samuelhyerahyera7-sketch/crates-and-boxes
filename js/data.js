// Photo credits: local product photos in /images/, fallback to Unsplash
const PHOTOS = {
  // ── LOCAL product photos (save your real photos to crates-and-boxes/images/) ──
  clamshellLarge1: "images/clamshell-large-1.jpg",   // two boxes top view
  clamshellLarge2: "images/clamshell-large-2.jpg",   // front close-up large bow
  clamshellLarge3: "images/clamshell-large-3.jpg",   // 3/4 angle view
  clamshellLarge4: "images/clamshell-large-4.jpg",   // front close-up (alt)
  squareSmall1:    "images/square-small-1.jpg",       // square mini – front flat
  squareSmall2:    "images/square-small-2.jpg",       // square mini – open lid side
  squareSmall3:    "images/square-small-3.jpg",       // square mini – 3/4 angle closed
  squareSmall4:    "images/square-small-4.jpg",       // square mini – front flat wide
  squareSmall5:    "images/square-small-5.jpg",       // square mini – open lid floating
  squareMedium1:   "images/square-medium-1.jpg",      // square medium – open lid angle
  squareMedium2:   "images/square-medium-2.jpg",      // square medium – front closed
  squareMedium3:   "images/square-medium-3.jpg",      // square medium – 3/4 closed
  squareMedium4:   "images/square-medium-4.jpg",      // square medium – open lid floating
  squareMedium5:   "images/square-medium-5.jpg",      // square medium – front flat
  hatXLarge1:      "images/hat-xlarge-1.jpg",          // hat box – front closed (blue)
  hatXLarge2:      "images/hat-xlarge-2.jpg",          // hat box – open lid side
  hatXLarge3:      "images/hat-xlarge-3.jpg",          // hat box – 3/4 angle closed
  hatLarge2a:      "images/hat-large2-1.jpg",          // large hat box 2 – open lid white
  hatLarge2b:      "images/hat-large2-2.jpg",          // large hat box 2 – alt white
  hatLarge2c:      "images/hat-large2-3.jpg",          // large hat box 2 – closed white
  hatShallowLg1:   "images/hat-shallow-lg-1.jpg",     // shallow large hat box – front closed (coral)
  hatShallowLg2:   "images/hat-shallow-lg-2.jpg",     // shallow large hat box – 3/4 closed
  hatShallowLg3:   "images/hat-shallow-lg-3.jpg",     // shallow large hat box – open angle
  hatShallowSm1:   "images/hat-shallow-sm-1.jpg",     // shallow small hat box – open angle (yellow)
  hatShallowSm2:   "images/hat-shallow-sm-2.jpg",     // shallow small hat box – front closed
  hatShallowSm3:   "images/hat-shallow-sm-3.jpg",     // shallow small hat box – 3/4 closed
  hatShallowMed1:  "images/hat-shallow-med-1.jpg",    // shallow medium hat box – open angle
  hatShallowMed2:  "images/hat-shallow-med-2.jpg",    // shallow medium hat box – front closed
  hatShallowMed3:  "images/hat-shallow-med-3.jpg",    // shallow medium hat box – 3/4 closed
  rectMed1a:       "images/rect-medium1-1.jpg",        // rect 200x200x100 – 3/4 closed
  rectMed1b:       "images/rect-medium1-2.jpg",        // rect 200x200x100 – open lid angle
  rectMed1c:       "images/rect-medium1-3.jpg",        // rect 200x200x100 – flat open side
  rectMed1d:       "images/rect-medium1-4.jpg",        // rect 200x200x100 – 3/4 wide closed
  rectMed2a:       "images/rect-medium2-1.jpg",        // rect 300x200x100 – 3/4 closed (purple)
  rectMed2b:       "images/rect-medium2-2.jpg",        // rect 300x200x100 – alt 3/4 closed
  rectMed2c:       "images/rect-medium2-3.jpg",        // rect 300x200x100 – open lid flat
  rectMed2d:       "images/rect-medium2-4.jpg",        // rect 300x200x100 – front closed
  rectLarge1a:     "images/rect-large1-1.jpg",         // rect 330x250x100 – 3/4 closed (green)
  rectLarge1b:     "images/rect-large1-2.jpg",         // rect 330x250x100 – front flat
  rectLarge1c:     "images/rect-large1-3.jpg",         // rect 330x250x100 – open lid
  rectLarge1d:     "images/rect-large1-4.jpg",         // rect 330x250x100 – front closed flat
  rectLarge2a:     "images/rect-large2-1.jpg",         // rect 450x350x200 – open lid (blue)
  rectLarge2b:     "images/rect-large2-2.jpg",         // rect 450x350x200 – 3/4 closed
  rectLarge2c:     "images/rect-large2-3.jpg",         // rect 450x350x200 – front flat closed
  rectLarge2d:     "images/rect-large2-4.jpg",         // rect 450x350x200 – front side closed
  wineStd1:        "images/wine-standard-1.jpg",       // wine box – 3/4 closed
  wineStd2:        "images/wine-standard-2.jpg",       // wine box – open lid
  wineStd3:        "images/wine-standard-3.jpg",       // wine box – alt angle closed
  wineStd4:        "images/wine-standard-4.jpg",       // wine box – front flat closed
  wineMagnet1:     "images/wine-magnet-1.jpg",         // wine magnet box – open angle
  wineMagnet2:     "images/wine-magnet-2.jpg",         // wine magnet box – closed 3/4
  wineMagnet3:     "images/wine-magnet-3.jpg",         // wine magnet box – open front
  heartSmall1:     "images/heart-small-1.jpg",        // black heart box – top view
  heartSmall2:     "images/heart-small-2.jpg",        // black heart box – front
  heartSmall3:     "images/heart-small-3.jpg",        // black heart box – open
  heartSmall4:     "images/heart-small-4.jpg",        // black heart box – angle
  heartMedium1:    "images/heart-medium-1.jpg",       // red heart box – angle
  heartMedium2:    "images/heart-medium-2.jpg",       // red heart box – front
  heartMedium3:    "images/heart-medium-3.jpg",       // red heart box – open
  heartMedium4:    "images/heart-medium-4.jpg",       // red heart box – side
  heartLarge1:     "images/heart-large-1.jpg",        // purple large heart box – open angle
  heartLarge2:     "images/heart-large-2.jpg",        // purple large heart box – top lid flat
  heartLarge3:     "images/heart-large-3.jpg",        // purple large heart box – open top view
  heartLarge4:     "images/heart-large-4.jpg",        // purple large heart box – front closed low
  heartLarge5:     "images/heart-large-5.jpg",        // purple large heart box – 3/4 closed
  squareCube1:    "images/square-cube-1.jpg",      // 150x150x150 red cube – open lid front
  squareCube2:    "images/square-cube-2.jpg",      // 150x150x150 red cube – closed front
  squareCube3:    "images/square-cube-3.jpg",      // 150x150x150 red cube – 3/4 angle closed
  bookSmall1:     "images/book-small-1.jpg",       // small book box – front closed with bow
  bookSmall2:     "images/book-small-2.jpg",       // small book box – 3/4 angle closed
  bookSmall3:     "images/book-small-3.jpg",       // small book box – side view
  roundSmall1:    "images/round-small-1.jpg",      // 100mm round hat box – front closed
  roundSmall2:    "images/round-small-2.jpg",      // 100mm round hat box – 3/4 angle closed
  roundSmall3:    "images/round-small-3.jpg",      // 100mm round hat box – open lid
  bookLarge1:     "images/book-large-1.jpg",       // large book box – 3/4 angle closed
  bookLarge2:     "images/book-large-2.jpg",       // large book box – front closed with bow

  // ── Unsplash fallbacks (used until real photos are added) ──
  hatBox:        "https://images.unsplash.com/photo-1556269975-7cc2cbc82480?w=600&q=80",
  hatBoxFloral:  "https://images.unsplash.com/photo-1609684788669-3d2f2cfc2948?w=600&q=80",
  hatBoxRound:   "https://images.unsplash.com/photo-1660885900184-fe13ca69392c?w=600&q=80",
  giftRibbon:    "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&q=80",
  giftBox:       "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
  giftBoxStack:  "https://images.unsplash.com/photo-1592903297149-37fb25202dfa?w=600&q=80",
  blackGoldBox:  "https://images.unsplash.com/photo-1674620213535-9b2a2553ef40?w=600&q=80",
  elegantBox:    "https://images.unsplash.com/photo-1575176647987-4c1a2e598950?w=600&q=80",
  luxuryBlack:   "https://images.unsplash.com/photo-1760804876166-aae5861ec7c1?w=600&q=80",
  heartBox:      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
  wineBox:       "https://images.unsplash.com/photo-1619810490925-e27ba7623459?w=600&q=80",
  wineCrate:     "https://images.unsplash.com/photo-1551705145-c47d6f08cb0b?w=600&q=80",
};

const PRODUCTS = [
  // HAT BOXES
  { id: 32, name: "Round Hat Box (S)",               category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#EA580C", price: 30,  featured: false, image: PHOTOS.roundSmall1, images: [PHOTOS.roundSmall1, PHOTOS.roundSmall2, PHOTOS.roundSmall3], dimensions: "100mm dia × 100mm (h)", description: "Compact round hat box with a fitted lid — ideal for small bouquets, candles, and single-item luxury gifts." },
  { id: 1,  name: "Mini Hat Box (XS)",                category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 25,  featured: false, image: PHOTOS.hatXLarge1,  images: [PHOTOS.hatXLarge1, PHOTOS.hatXLarge2, PHOTOS.hatXLarge3], dimensions: "100mm dia × 100mm (h)",  description: "Tiny round hat box with fitted lid — ideal for jewellery, candles, and single-item luxury gifts." },
  { id: 2,  name: "Shallow Hat Box (S)",               category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 30,  featured: false, image: PHOTOS.hatShallowSm2, images: [PHOTOS.hatShallowSm2, PHOTOS.hatShallowSm1, PHOTOS.hatShallowSm3], dimensions: "200mm dia × 100mm (h)",  description: "Wide shallow round hat box — great for small bouquets, spa products, and personalised keepsakes." },
  { id: 3,  name: "Shallow Hat Box (L)",               category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 40,  featured: false, image: PHOTOS.hatShallowLg2, images: [PHOTOS.hatShallowLg2, PHOTOS.hatShallowLg1, PHOTOS.hatShallowLg3], dimensions: "287mm dia × 100mm (h)",  description: "Wide shallow round hat box — a florist favourite for floral arrangements and luxury gift displays." },
  { id: 4,  name: "Shallow Hat Box (M)",               category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 55,  featured: false, image: PHOTOS.hatShallowMed2, images: [PHOTOS.hatShallowMed2, PHOTOS.hatShallowMed1, PHOTOS.hatShallowMed3], dimensions: "240mm dia × 100mm (h)",  description: "Wide, shallow round hat box — perfect for floral arrangements, spa gifts, and flat-lay hampers." },
  { id: 5,  name: "Medium Hat Box 5",                 category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 65,  featured: true,  image: PHOTOS.hatXLarge2,  images: [PHOTOS.hatXLarge2, PHOTOS.hatXLarge1, PHOTOS.hatXLarge3], dimensions: "250mm dia × 200mm (h)",  description: "Slightly taller medium round hat box — ideal for bulkier bouquets and layered gift presentations." },
  { id: 6,  name: "Large Hat Box",                    category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 75,  featured: false, image: PHOTOS.hatXLarge3,  images: [PHOTOS.hatXLarge3, PHOTOS.hatXLarge1, PHOTOS.hatXLarge2], dimensions: "287mm dia × 150mm (h)",  description: "Wide-diameter large hat box with a shallow profile, great for flat arrangements and premium gifts." },
  { id: 7,  name: "Large Hat Box 2",                  category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#F5F5F5", price: 85,  featured: true,  image: PHOTOS.hatLarge2c,  images: [PHOTOS.hatLarge2c, PHOTOS.hatLarge2a, PHOTOS.hatLarge2b], dimensions: "287mm dia × 200mm (h)",  description: "Large round hat box with a taller lid — the go-to choice for full flower arrangements." },
  { id: 8,  name: "Extra Large Hat Box",              category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 110, featured: true,  image: PHOTOS.hatXLarge1,  images: [PHOTOS.hatXLarge1, PHOTOS.hatXLarge2, PHOTOS.hatXLarge3], dimensions: "287mm dia × 300mm (h)",  description: "Our tallest hat box — perfect for dramatic floral displays and oversized luxury hampers." },
  { id: 9,  name: "Tall Hat Box",                     category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 60,  featured: false, image: PHOTOS.hatXLarge2,  images: [PHOTOS.hatXLarge2, PHOTOS.hatXLarge3, PHOTOS.hatXLarge1], dimensions: "160mm dia × 250mm (h)",  description: "Slim, tall cylindrical box designed for single-stem flowers, bottles, and vertical gift arrangements." },
  { id: 10, name: "Flower Cake Box",                  category: "hat-boxes",       categoryLabel: "Hat Boxes",       color: "#93C5FD", price: 70,  featured: true,  image: PHOTOS.hatXLarge3,  images: [PHOTOS.hatXLarge3, PHOTOS.hatXLarge1, PHOTOS.hatXLarge2], dimensions: "160mm dia × 200mm (h)",  description: "Round open-top box styled for floral cake displays — combines a bouquet presentation with a cake reveal." },
  // SQUARE BOXES
  { id: 11, name: "Square Mini Box (S)",              category: "square-boxes",    categoryLabel: "Square Boxes",    color: "#1A1A1A", price: 25,  featured: false, image: PHOTOS.squareSmall1, images: [PHOTOS.squareSmall1, PHOTOS.squareSmall2, PHOTOS.squareSmall3, PHOTOS.squareSmall4, PHOTOS.squareSmall5], dimensions: "100mm × 100mm × 100mm",  description: "Compact cube gift box — ideal for jewellery, small treats, and single-item luxury presents." },
  { id: 12, name: "Square Box (M)",                   category: "square-boxes",    categoryLabel: "Square Boxes",    color: "#3D2010", price: 35,  featured: false, image: PHOTOS.squareMedium1, images: [PHOTOS.squareMedium1, PHOTOS.squareMedium2, PHOTOS.squareMedium3, PHOTOS.squareMedium4, PHOTOS.squareMedium5], dimensions: "130mm × 130mm × 130mm",  description: "Mid-size square box available in multiple colours, great for candles, cosmetics, and gift sets." },
  { id: 13, name: "Square Cube Box",                  category: "square-boxes",    categoryLabel: "Square Boxes",    color: "#B91C1C", price: 45,  featured: true,  image: PHOTOS.squareCube1, images: [PHOTOS.squareCube1, PHOTOS.squareCube2, PHOTOS.squareCube3], dimensions: "150mm × 150mm × 150mm",  description: "Classic cube gift box with a separate lid, perfect for premium products and branded packaging." },
  // CLAMSHELL BOXES
  { id: 14, name: "Small Ribbon Clamshell Box",       category: "clamshell-boxes", categoryLabel: "Clamshell Boxes", color: "#F5F0E8", price: 55,  featured: false, image: PHOTOS.clamshellLarge3, images: [PHOTOS.clamshellLarge3, PHOTOS.clamshellLarge2, PHOTOS.clamshellLarge1, PHOTOS.clamshellLarge4], dimensions: "200mm × 200mm × 100mm",  description: "Magnetic clamshell box with a pre-attached satin ribbon — opens beautifully for an impressive unboxing." },
  { id: 15, name: "Medium Ribbon Clamshell Box",      category: "clamshell-boxes", categoryLabel: "Clamshell Boxes", color: "#F5F0E8", price: 75,  featured: true,  image: PHOTOS.clamshellLarge2, images: [PHOTOS.clamshellLarge2, PHOTOS.clamshellLarge1, PHOTOS.clamshellLarge4, PHOTOS.clamshellLarge3], dimensions: "300mm × 200mm × 100mm",  description: "Rectangular magnetic gift box with ribbon closure — elegant for corporate gifts and hampers." },
  { id: 16, name: "Large Ribbon Clamshell Box",       category: "clamshell-boxes", categoryLabel: "Clamshell Boxes", color: "#F5F0E8", price: 95,  featured: false, image: PHOTOS.clamshellLarge4, images: [PHOTOS.clamshellLarge4, PHOTOS.clamshellLarge1, PHOTOS.clamshellLarge2, PHOTOS.clamshellLarge3], dimensions: "330mm × 250mm × 100mm",  description: "Signature ribbon clamshell box — the luxury choice for special occasions and branded gifting." },
  { id: 17, name: "Large Ribbon Clamshell Box A",     category: "clamshell-boxes", categoryLabel: "Clamshell Boxes", color: "#F5F0E8", price: 95,  featured: false, image: PHOTOS.clamshellLarge1, images: [PHOTOS.clamshellLarge1, PHOTOS.clamshellLarge2, PHOTOS.clamshellLarge3, PHOTOS.clamshellLarge4], dimensions: "340mm × 200mm × 100mm",  description: "Wide magnetic clamshell with satin ribbon handle — ideal for corporate hampers and gifting." },
  { id: 18, name: "Large Ribbon Clamshell Box B",     category: "clamshell-boxes", categoryLabel: "Clamshell Boxes", color: "#F5F0E8", price: 105, featured: false, image: PHOTOS.clamshellLarge3, images: [PHOTOS.clamshellLarge3, PHOTOS.clamshellLarge4, PHOTOS.clamshellLarge1, PHOTOS.clamshellLarge2], dimensions: "340mm × 250mm × 100mm",  description: "Larger footprint clamshell with ribbon closure — fits more product with a premium presentation." },
  { id: 19, name: "Extra Large Ribbon Clamshell Box", category: "clamshell-boxes", categoryLabel: "Clamshell Boxes", color: "#F5F0E8", price: 155, featured: true,  image: PHOTOS.clamshellLarge2, images: [PHOTOS.clamshellLarge2, PHOTOS.clamshellLarge3, PHOTOS.clamshellLarge4, PHOTOS.clamshellLarge1], dimensions: "450mm × 350mm × 200mm",  description: "Our biggest magnetic clamshell — the statement piece for luxury hampers and oversized gifts." },
  // RECTANGLE BOXES
  { id: 20, name: "Medium Box 1",                     category: "rectangle-boxes", categoryLabel: "Rectangle Boxes", color: "#1A1A1A", price: 55,  featured: false, image: PHOTOS.rectMed1a,   images: [PHOTOS.rectMed1a, PHOTOS.rectMed1b, PHOTOS.rectMed1c, PHOTOS.rectMed1d], dimensions: "200mm × 200mm × 100mm",  description: "Square-profile gift box with separate lid — versatile for a wide range of gift items." },
  { id: 21, name: "Medium Box 2",                     category: "rectangle-boxes", categoryLabel: "Rectangle Boxes", color: "#7C3AED", price: 65,  featured: false, image: PHOTOS.rectMed2a,   images: [PHOTOS.rectMed2a, PHOTOS.rectMed2b, PHOTOS.rectMed2c, PHOTOS.rectMed2d], dimensions: "300mm × 200mm × 100mm",  description: "Rectangular gift box in a range of colours — suits hampers, clothing, and curated gift sets." },
  { id: 22, name: "Large Box 1",                      category: "rectangle-boxes", categoryLabel: "Rectangle Boxes", color: "#166534", price: 85,  featured: false, image: PHOTOS.rectLarge1a,  images: [PHOTOS.rectLarge1a, PHOTOS.rectLarge1b, PHOTOS.rectLarge1c, PHOTOS.rectLarge1d], dimensions: "330mm × 250mm × 100mm",  description: "Large flat rectangular box with separate lid — great for clothing, scarves, and premium gifts." },
  { id: 23, name: "Large Box 2",                      category: "rectangle-boxes", categoryLabel: "Rectangle Boxes", color: "#1D4ED8", price: 145, featured: false, image: PHOTOS.rectLarge2a,  images: [PHOTOS.rectLarge2a, PHOTOS.rectLarge2b, PHOTOS.rectLarge2c, PHOTOS.rectLarge2d], dimensions: "450mm × 350mm × 200mm",  description: "Extra-spacious rectangular gift box — perfect for large hampers, clothing, and oversized gifts." },
  // WINE BOXES
  { id: 24, name: "Wine Box Standard with Lid",       category: "wine-boxes",      categoryLabel: "Wine Boxes",      color: "#1A1A1A", price: 65,  featured: true,  image: PHOTOS.wineStd1,    images: [PHOTOS.wineStd1, PHOTOS.wineStd2, PHOTOS.wineStd3, PHOTOS.wineStd4], dimensions: "355mm × 100mm × 100mm",  description: "Sleek standard wine box with a fitted lid — designed to hold a single bottle with style." },
  { id: 26, name: "Wine Magnet Closure Box",          category: "wine-boxes",      categoryLabel: "Wine Boxes",      color: "#1A1A1A", price: 80,  featured: false, image: PHOTOS.wineMagnet2, images: [PHOTOS.wineMagnet2, PHOTOS.wineMagnet1, PHOTOS.wineMagnet3], dimensions: "355mm × 110mm × 110mm",  description: "Luxury magnetic closure wine box — opens flat to reveal the bottle for a dramatic gifting moment." },
  // HEART BOXES
  { id: 27, name: "Small Heart Box",                  category: "heart-boxes",     categoryLabel: "Heart Boxes",     color: "#1A1A1A", price: 75,  featured: false, image: PHOTOS.heartSmall1,  images: [PHOTOS.heartSmall1, PHOTOS.heartSmall2, PHOTOS.heartSmall3, PHOTOS.heartSmall4],  dimensions: "250mm × 210mm × 100mm",  description: "Heart-shaped gift box — perfect for Valentine's Day, Mother's Day, and romantic hampers." },
  { id: 28, name: "Medium Heart Box",                 category: "heart-boxes",     categoryLabel: "Heart Boxes",     color: "#DC2626", price: 95,  featured: true,  image: PHOTOS.heartMedium1, images: [PHOTOS.heartMedium1, PHOTOS.heartMedium2, PHOTOS.heartMedium3, PHOTOS.heartMedium4], dimensions: "300mm × 260mm × 100mm",  description: "Medium heart box with generous depth — fits chocolates, wine, flowers, and curated pamper gifts." },
  { id: 29, name: "Large Heart Box",                  category: "heart-boxes",     categoryLabel: "Heart Boxes",     color: "#B91C1C", price: 120, featured: false, image: PHOTOS.heartLarge1, images: [PHOTOS.heartLarge1, PHOTOS.heartLarge5, PHOTOS.heartLarge3, PHOTOS.heartLarge4, PHOTOS.heartLarge2], dimensions: "360mm × 312mm × 100mm",  description: "Our largest heart box — a showstopper for luxury Valentine's, anniversary, and celebration gifts." },
  // BOOK STYLE BOXES
  { id: 33, name: "Large Book Style Box",             category: "clamshell-boxes", categoryLabel: "Clamshell Boxes", color: "#F5F5F5", price: 95,  featured: true,  image: PHOTOS.bookLarge1,  images: [PHOTOS.bookLarge1, PHOTOS.bookLarge2], dimensions: "280mm × 280mm × 100mm", description: "Large magnetic book-style box with a satin ribbon bow — a luxurious fold-open design perfect for hampers, clothing, and premium gifts." },
  { id: 31, name: "Small Book Style Box",             category: "clamshell-boxes", categoryLabel: "Clamshell Boxes", color: "#F4A7B9", price: 65,  featured: true,  image: PHOTOS.bookSmall1,  images: [PHOTOS.bookSmall1, PHOTOS.bookSmall2, PHOTOS.bookSmall3], dimensions: "210mm × 140mm × 80mm", description: "Magnetic book-style gift box with a satin ribbon bow — elegant fold-open design perfect for clothing, accessories, and luxury gifts." },
  // SPECIALTY
  { id: 30, name: "Rectangle Bouquet Box",            category: "specialty-boxes", categoryLabel: "Specialty Boxes", color: "#F9F3EC", price: 85,  featured: false, image: PHOTOS.hatBox,       dimensions: "390mm × 130mm × 120mm",  description: "Open-top bouquet box with a satin ribbon handle — display your floral arrangements in luxury." },
];

const CATEGORIES = [
  { id: "all",             label: "All Products" },
  { id: "hat-boxes",       label: "Hat Boxes" },
  { id: "square-boxes",    label: "Square Boxes" },
  { id: "clamshell-boxes", label: "Clamshell Boxes" },
  { id: "rectangle-boxes", label: "Rectangle Boxes" },
  { id: "wine-boxes",      label: "Wine Boxes" },
  { id: "heart-boxes",     label: "Heart Boxes" },
  { id: "specialty-boxes", label: "Specialty" },
];

const BRANDING_OPTIONS = [
  { title: "Foiling",        icon: "", description: "Gold, silver, or custom colour foil stamping for logos and text — a premium metallic finish." },
  { title: "Vinyl Printing", icon: "", description: "Full-colour vinyl labels applied to your box — ideal for names, monograms, and short-run branding." },
  { title: "Raised Prints",  icon: "", description: "Embossed or debossed printing gives your brand a tactile, luxury feel on any box surface." },
  { title: "Full Colour",    icon: "", description: "End-to-end full colour printing for maximum visual impact — perfect for brand campaigns and events." },
];
