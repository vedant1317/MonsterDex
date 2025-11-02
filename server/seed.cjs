const mongoose = require("mongoose");
const Flavor = require("./models/Flavor.cjs");

const flavorsData = [
  // Original Series
  {
    name: "Monster Energy Original",
    category: "Original",
    description: "The classic green beast that started it all. Bold energy with a smooth taste.",
    imageUrl: "https://via.placeholder.com/300x400/00a651/ffffff?text=Original",
  },
  {
    name: "Monster Absolutely Zero",
    category: "Original",
    description: "Zero sugar, maximum energy. All the power with none of the calories.",
    imageUrl: "https://via.placeholder.com/300x400/000000/ffffff?text=Absolutely+Zero",
  },
  {
    name: "Monster Assault",
    category: "Original",
    description: "Cherry lime flavor with full Monster energy. Combat-ready refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/8B0000/ffffff?text=Assault",
  },
  {
    name: "Monster Zero Sugar",
    category: "Original",
    description: "Original flavor without the sugar. Pure energy in every can.",
    imageUrl: "https://via.placeholder.com/300x400/1a1a1a/00ff88?text=Zero+Sugar",
  },
  {
    name: "Monster Lo-Carb",
    category: "Original",
    description: "Half the calories, full Monster energy. Perfect balance.",
    imageUrl: "https://via.placeholder.com/300x400/0066cc/ffffff?text=Lo-Carb",
  },
  {
    name: "Monster Khaos",
    category: "Original",
    description: "Juice and energy collision. Tropical chaos in a can.",
    imageUrl: "https://via.placeholder.com/300x400/FF6600/ffffff?text=Khaos",
  },
  {
    name: "Monster Ripper",
    category: "Original",
    description: "Fruit punch energy with a bite. Rip into refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/9900cc/ffffff?text=Ripper",
  },

  // Ultra Series
  {
    name: "Monster Ultra White",
    category: "Ultra",
    description: "Citrus zero sugar refreshment. Clean energy, smooth taste.",
    imageUrl: "https://via.placeholder.com/300x400/ffffff/000000?text=Ultra+White",
  },
  {
    name: "Monster Ultra Blue",
    category: "Ultra",
    description: "Mixed berry zero sugar energy. Blue raspberry bliss.",
    imageUrl: "https://via.placeholder.com/300x400/0066ff/ffffff?text=Ultra+Blue",
  },
  {
    name: "Monster Ultra Red",
    category: "Ultra",
    description: "Cranberry energy with zero sugar. Red hot refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/cc0000/ffffff?text=Ultra+Red",
  },
  {
    name: "Monster Ultra Black",
    category: "Ultra",
    description: "Black cherry zero sugar energy. Dark and delicious.",
    imageUrl: "https://via.placeholder.com/300x400/000000/00ff88?text=Ultra+Black",
  },
  {
    name: "Monster Ultra Paradise",
    category: "Ultra",
    description: "Tropical kiwi lime zero sugar. Paradise in every sip.",
    imageUrl: "https://via.placeholder.com/300x400/00cc66/ffffff?text=Ultra+Paradise",
  },
  {
    name: "Monster Ultra Fiesta",
    category: "Ultra",
    description: "Mango zero sugar celebration. Fiesta flavor explosion.",
    imageUrl: "https://via.placeholder.com/300x400/FF9900/ffffff?text=Ultra+Fiesta",
  },
  {
    name: "Monster Ultra Rosa",
    category: "Ultra",
    description: "Rose hip and hibiscus zero sugar energy. Floral refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/FF69B4/ffffff?text=Ultra+Rosa",
  },
  {
    name: "Monster Ultra Watermelon",
    category: "Ultra",
    description: "Refreshing watermelon zero sugar energy. Summer in a can.",
    imageUrl: "https://via.placeholder.com/300x400/FF1493/ffffff?text=Ultra+Watermelon",
  },
  {
    name: "Monster Ultra Gold",
    category: "Ultra",
    description: "Pineapple zero sugar energy. Golden tropical taste.",
    imageUrl: "https://via.placeholder.com/300x400/FFD700/000000?text=Ultra+Gold",
  },
  {
    name: "Monster Ultra Peachy Keen",
    category: "Ultra",
    description: "Peach nectarine zero sugar energy. Just peachy perfection.",
    imageUrl: "https://via.placeholder.com/300x400/FFDAB9/000000?text=Ultra+Peachy",
  },
  {
    name: "Monster Ultra Violet",
    category: "Ultra",
    description: "Grape zero sugar energy. Purple power refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/8A2BE2/ffffff?text=Ultra+Violet",
  },
  {
    name: "Monster Ultra Strawberry Dreams",
    category: "Ultra",
    description: "Strawberry zero sugar energy. Dreamy berry flavor.",
    imageUrl: "https://via.placeholder.com/300x400/FF1493/ffffff?text=Ultra+Strawberry",
  },

  // Java Series
  {
    name: "Monster Java Mean Bean",
    category: "Java",
    description: "Coffee and energy fusion. Vanilla bean perfection.",
    imageUrl: "https://via.placeholder.com/300x400/5C4033/ffffff?text=Java+Mean+Bean",
  },
  {
    name: "Monster Java Loca Moca",
    category: "Java",
    description: "Mocha madness with Monster energy. Coffee lovers dream.",
    imageUrl: "https://via.placeholder.com/300x400/3E2723/ffffff?text=Java+Loca+Moca",
  },
  {
    name: "Monster Java Farmer's Oats",
    category: "Java",
    description: "Oat milk coffee energy blend. Smooth and creamy.",
    imageUrl: "https://via.placeholder.com/300x400/D7CCC8/000000?text=Java+Farmers",
  },
  {
    name: "Monster Java Triple Shot Mocha",
    category: "Java",
    description: "Triple espresso mocha energy. Maximum coffee kick.",
    imageUrl: "https://via.placeholder.com/300x400/2E1B0D/00ff88?text=Java+Triple+Shot",
  },

  // Rehab Series
  {
    name: "Monster Rehab Peach Tea",
    category: "Rehab",
    description: "Peach tea recovery blend. Refresh and recharge.",
    imageUrl: "https://via.placeholder.com/300x400/FFDAB9/000000?text=Rehab+Peach",
  },
  {
    name: "Monster Rehab Lemonade",
    category: "Rehab",
    description: "Lemonade energy recovery. Citrus refreshment therapy.",
    imageUrl: "https://via.placeholder.com/300x400/FFE135/000000?text=Rehab+Lemonade",
  },
  {
    name: "Monster Rehab Orangeade",
    category: "Rehab",
    description: "Orange recovery energy. Vitamin-packed refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/FFA500/000000?text=Rehab+Orangeade",
  },
  {
    name: "Monster Rehab Strawberry Lemonade",
    category: "Rehab",
    description: "Strawberry lemonade recovery. Sweet and tangy revival.",
    imageUrl: "https://via.placeholder.com/300x400/FF69B4/ffffff?text=Rehab+Strawberry",
  },
  {
    name: "Monster Rehab Watermelon",
    category: "Rehab",
    description: "Watermelon recovery energy. Hydrating refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/FF1493/ffffff?text=Rehab+Watermelon",
  },
  {
    name: "Monster Rehab Wild Berry Tea",
    category: "Rehab",
    description: "Wild berry tea recovery. Berry good refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/8B008B/ffffff?text=Rehab+Berry",
  },
  {
    name: "Monster Rehab Protean",
    category: "Rehab",
    description: "Protein-infused energy recovery. Muscle fuel and hydration.",
    imageUrl: "https://via.placeholder.com/300x400/4682B4/ffffff?text=Rehab+Protean",
  },

  // Reserve Series
  {
    name: "Monster Reserve White Pineapple",
    category: "Reserve",
    description: "Premium white pineapple energy. Exotic sophistication.",
    imageUrl: "https://via.placeholder.com/300x400/FFE4B5/000000?text=Reserve+Pineapple",
  },
  {
    name: "Monster Reserve Orange Dreamsicle",
    category: "Reserve",
    description: "Premium orange cream energy. Nostalgic flavor elevated.",
    imageUrl: "https://via.placeholder.com/300x400/FFA500/ffffff?text=Reserve+Orange",
  },
  {
    name: "Monster Reserve Watermelon",
    category: "Reserve",
    description: "Premium watermelon energy. Summer luxury in a can.",
    imageUrl: "https://via.placeholder.com/300x400/FF69B4/ffffff?text=Reserve+Watermelon",
  },

  // Specialty Series
  {
    name: "Monster Pipeline Punch",
    category: "Specialty",
    description: "Tropical passion fruit punch. Hawaiian wave of flavor.",
    imageUrl: "https://via.placeholder.com/300x400/FF1493/ffffff?text=Pipeline+Punch",
  },
  {
    name: "Monster Mango Loco",
    category: "Specialty",
    description: "Mango madness energy. Tropical insanity in every sip.",
    imageUrl: "https://via.placeholder.com/300x400/FF8C00/ffffff?text=Mango+Loco",
  },
  {
    name: "Monster Pacific Punch",
    category: "Specialty",
    description: "Pacific island punch energy. Apple, orange, cherry, raspberry blend.",
    imageUrl: "https://via.placeholder.com/300x400/0066cc/ffffff?text=Pacific+Punch",
  },
  {
    name: "Monster Papillon",
    category: "Specialty",
    description: "Peach nectarine butterfly effect. Delicate energy explosion.",
    imageUrl: "https://via.placeholder.com/300x400/FFDAB9/000000?text=Papillon",
  },
  {
    name: "Monster Aussie Style Lemonade",
    category: "Specialty",
    description: "Down under lemonade energy. Australian refreshment mate.",
    imageUrl: "https://via.placeholder.com/300x400/FFE135/000000?text=Aussie+Lemonade",
  },
  {
    name: "Monster Dragon Tea Green Tea",
    category: "Specialty",
    description: "Green tea dragon energy. Asian-inspired refreshment.",
    imageUrl: "https://via.placeholder.com/300x400/90EE90/000000?text=Dragon+Tea",
  },
  {
    name: "Monster Khaotic",
    category: "Specialty",
    description: "Juice and energy chaos. Orange tropical mayhem.",
    imageUrl: "https://via.placeholder.com/300x400/FF4500/ffffff?text=Khaotic",
  },
  {
    name: "Monster The Doctor",
    category: "Specialty",
    description: "Valentino Rossi signature blend. Racing fuel energy.",
    imageUrl: "https://via.placeholder.com/300x400/FFD700/000000?text=The+Doctor",
  },
  {
    name: "Monster Lewis Hamilton",
    category: "Specialty",
    description: "F1 champion energy blend. Victory in a can.",
    imageUrl: "https://via.placeholder.com/300x400/00D2BE/000000?text=Lewis+Hamilton",
  },
  {
    name: "Monster Ultra Fantasy Ruby Red",
    category: "Specialty",
    description: "Ruby red grapefruit zero sugar. Fantasy flavor reality.",
    imageUrl: "https://via.placeholder.com/300x400/E0115F/ffffff?text=Fantasy+Ruby",
  },
  {
    name: "Monster Ultra Vice Guava",
    category: "Specialty",
    description: "Guava passion zero sugar energy. Tropical vice temptation.",
    imageUrl: "https://via.placeholder.com/300x400/FF69B4/ffffff?text=Vice+Guava",
  },
  {
    name: "Monster Ultra Blue Hawaiian",
    category: "Specialty",
    description: "Hawaiian blue raspberry zero sugar. Island paradise energy.",
    imageUrl: "https://via.placeholder.com/300x400/4169E1/ffffff?text=Blue+Hawaiian",
  },
  {
    name: "Muscle Monster Strawberry",
    category: "Specialty",
    description: "Protein shake meets energy drink. 25g protein strawberry power.",
    imageUrl: "https://via.placeholder.com/300x400/FF1493/ffffff?text=Muscle+Strawberry",
  },
  {
    name: "Muscle Monster Chocolate",
    category: "Specialty",
    description: "Chocolate protein energy shake. 25g protein muscle fuel.",
    imageUrl: "https://via.placeholder.com/300x400/3E2723/ffffff?text=Muscle+Chocolate",
  },
  {
    name: "Monster Nitro Super Dry",
    category: "Specialty",
    description: "Nitro-infused smooth energy. Cold brew coffee technology.",
    imageUrl: "https://via.placeholder.com/300x400/2E1B0D/00ff88?text=Nitro+Super+Dry",
  },
  {
    name: "Monster MaXX Super Dry",
    category: "Specialty",
    description: "Maximum energy minimum sweetness. Dry energy revolution.",
    imageUrl: "https://via.placeholder.com/300x400/1a1a1a/00ff88?text=MaXX+Super+Dry",
  },
  {
    name: "Monster Energy Import",
    category: "Specialty",
    description: "European energy formula. International strength classic.",
    imageUrl: "https://via.placeholder.com/300x400/333333/00ff88?text=Import",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Flavor.deleteMany({});
    console.log("Cleared existing flavors");

    await Flavor.insertMany(flavorsData);
    console.log(`Seeded ${flavorsData.length} Monster Energy flavors`);

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedDatabase();
