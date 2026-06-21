import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFZyo3EXro6kKPJel2pj8KqISMnEKF1xI",
  authDomain: "umarm1693-bd872.firebaseapp.com",
  projectId: "umarm1693-bd872",
  storageBucket: "umarm1693-bd872.firebasestorage.app",
  messagingSenderId: "714282802109",
  appId: "1:714282802109:web:63180090c36a30251e10d4",
  measurementId: "G-TQL7KZZ510"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const kitchenAccessories = [
  {
    id: Date.now().toString() + "_1",
    name: "Handmade Ceramic Spice Jar Set",
    price: 3500,
    quantity: 15,
    category: "Dining",
    description: "A beautiful set of three ceramic spice jars with wooden lids, keeping your spices fresh and your kitchen aesthetic.",
    image: "https://images.unsplash.com/photo-1596484552993-9c8846c4f0bd?w=800&q=80"
  },
  {
    id: Date.now().toString() + "_2",
    name: "Olive Wood Cutting Board",
    price: 4200,
    quantity: 10,
    category: "Dining",
    description: "Hand-carved olive wood cutting board, perfect for chopping or as a rustic serving platter for cheese and fruits.",
    image: "https://images.unsplash.com/photo-1585237748443-6901e670490b?w=800&q=80"
  },
  {
    id: Date.now().toString() + "_3",
    name: "Clay Cooking Pot (Handi)",
    price: 2800,
    quantity: 20,
    category: "Traditional",
    description: "Traditional unglazed clay handi for authentic slow-cooked curries. Enhances the earthy flavor of food.",
    image: "https://images.unsplash.com/photo-1604152003887-8df7d9d2a23e?w=800&q=80"
  },
  {
    id: Date.now().toString() + "_4",
    name: "Artisan Mortar and Pestle",
    price: 1800,
    quantity: 25,
    category: "Lifestyle",
    description: "Heavy-duty stone mortar and pestle for crushing fresh herbs and spices with ease.",
    image: "https://images.unsplash.com/photo-1596647265934-08016462725e?w=800&q=80"
  },
  {
    id: Date.now().toString() + "_5",
    name: "Ceramic Spoon Rest",
    price: 850,
    quantity: 40,
    category: "Dining",
    description: "Keep your kitchen counters clean with this hand-painted ceramic spoon rest featuring traditional motifs.",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80"
  },
  {
    id: Date.now().toString() + "_6",
    name: "Wooden Salad Serving Spoons",
    price: 1200,
    quantity: 30,
    category: "Dining",
    description: "Set of two beautifully carved wooden serving spoons, perfect for tossing and serving fresh salads.",
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=800&q=80"
  },
  {
    id: Date.now().toString() + "_7",
    name: "Terracotta Water Dispenser",
    price: 6500,
    quantity: 5,
    category: "Traditional",
    description: "Large terracotta water dispenser with a modern tap. Naturally cools water and adds essential minerals.",
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&q=80"
  },
  {
    id: Date.now().toString() + "_8",
    name: "Ceramic Coffee Canister",
    price: 2100,
    quantity: 18,
    category: "Lifestyle",
    description: "Airtight ceramic canister to keep your coffee beans fresh, featuring a minimalist matte finish.",
    image: "https://images.unsplash.com/photo-1577937927133-66ef06ac992a?w=800&q=80"
  }
];

async function seed() {
  for (const item of kitchenAccessories) {
    await setDoc(doc(db, "products", item.id), item);
    console.log(`Added: ${item.name}`);
  }
  console.log("Done seeding products!");
  process.exit(0);
}

seed().catch(console.error);
