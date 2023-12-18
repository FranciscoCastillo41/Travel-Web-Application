const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Add other necessary imports from the 'firebase' package if needed

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDie2O_Qgxj0lXH1ouLhmEesAiY8VbPAV8",
  authDomain: "venture-vista.firebaseapp.com",
  projectId: "venture-vista",
  storageBucket: "venture-vista.appspot.com",
  messagingSenderId: "633975218250",
  appId: "1:633975218250:web:03eadfe07ec67afd3906b3",
  measurementId: "G-GT6GJS686T"
};


// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore instance
const firestore = getFirestore(firebaseApp);

const destinationsData = [
  {
    name: "Paris",
    description: "The capital city of France, known for its art, fashion, and culture.",
    imageURL: "https://cdn.pixabay.com/photo/2016/11/23/18/10/architecture-1854130_1280.jpg",
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    name: "New York City",
    description: "The city that never sleeps, famous for its skyline and diverse neighborhoods.",
    imageURL: "https://cdn.pixabay.com/photo/2014/12/15/13/57/sunset-569093_1280.jpg",
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    name: "Tokyo",
    description: "Japan's bustling metropolis, blending modern and traditional elements.",
    imageURL: "https://cdn.pixabay.com/photo/2015/11/14/16/52/japan-1043416_1280.jpg",
    latitude: 35.6895,
    longitude: 139.6917,
  },
  {
    name: "Sydney",
    description: "A vibrant city in Australia, known for the Sydney Opera House and Harbour Bridge.",
    imageURL: "https://cdn.pixabay.com/photo/2018/05/07/22/08/opera-house-3381786_1280.jpg",
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    name: "Rio de Janeiro",
    description: "A Brazilian city famous for its beaches, carnival, and iconic Christ the Redeemer statue.",
    imageURL: "https://cdn.pixabay.com/photo/2019/10/21/15/05/rio-de-janeiro-4566312_1280.jpg",
    latitude: -22.9068,
    longitude: -43.1729,
  },
  {
    name: "London",
    description: "The capital city of the United Kingdom, rich in history and landmarks.",
    imageURL: "https://cdn.pixabay.com/photo/2018/01/12/11/55/london-3078109_1280.jpg",
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    name: "Barcelona",
    description: "A Spanish city known for its architecture, art, and vibrant street life.",
    imageURL: "https://cdn.pixabay.com/photo/2020/03/05/17/07/montserrat-4904951_1280.jpg",
    latitude: 41.3851,
    longitude: 2.1734,
  },
  {
    name: "Cape Town",
    description: "A coastal city in South Africa, with stunning landscapes and diverse culture.",
    imageURL: "https://cdn.pixabay.com/photo/2016/08/02/09/46/cape-town-1562907_1280.jpg",
    latitude: -33.918861,
    longitude: 18.423300,
  },
  {
    name: "Dubai",
    description: "A modern city in the United Arab Emirates, famous for its skyscrapers and luxury shopping.",
    imageURL: "https://cdn.pixabay.com/photo/2017/04/08/10/42/burj-khalifa-2212978_1280.jpg",
    latitude: 25.276987,
    longitude: 55.296249,
  },
  {
    name: "Venice",
    description: "An Italian city built on canals, known for its architecture and romantic atmosphere.",
    imageURL: "https://cdn.pixabay.com/photo/2017/06/28/15/32/venice-2451047_1280.jpg",
    latitude: 45.4408,
    longitude: 12.3155,
  },
  {
    name: "Marrakech",
    description: "A vibrant city in Morocco, famous for its markets, palaces, and gardens.",
    imageURL: "https://cdn.pixabay.com/photo/2019/09/24/09/58/marrakech-4500910_1280.jpg",
    latitude: 31.6295,
    longitude: -7.9811,
  },
  {
    name: "Bangkok",
    description: "The capital city of Thailand, known for its vibrant street life, temples, and nightlife.",
    imageURL: "https://cdn.pixabay.com/photo/2010/11/29/thailand-422_1280.jpg",
    latitude: 13.7563,
    longitude: 100.5018,
  },
  {
    name: "Prague",
    description: "The capital city of the Czech Republic, known for its historic architecture and charming streets.",
    imageURL: "https://cdn.pixabay.com/photo/2020/06/15/17/10/ancient-5302626_1280.jpg",
    latitude: 50.0755,
    longitude: 14.4378,
  },
  {
    name: "Auckland",
    description: "A city in New Zealand, surrounded by stunning natural landscapes and harbors.",
    imageURL: "https://cdn.pixabay.com/photo/2013/11/24/05/45/auckland-216820_1280.jpg",
    latitude: -36.8485,
    longitude: 174.7633,
  },
  {
    name: "Istanbul",
    description: "A city in Turkey, known for its rich history, architecture, and unique blend of cultures.",
    imageURL: "https://cdn.pixabay.com/photo/2019/04/09/19/45/galata-4115381_1280.jpg",
    latitude: 41.0082,
    longitude: 28.9784,
  },
  {
    name: "Amsterdam",
    description: "The capital city of the Netherlands, famous for its canals, museums, and vibrant culture.",
    imageURL: "https://cdn.pixabay.com/photo/2016/01/19/19/26/amsterdam-1150319_1280.jpg",
    latitude: 52.3676,
    longitude: 4.9041,
  },
  {
    name: "Berlin",
    description: "The capital city of Germany, known for its history, art scene, and modern architecture.",
    imageURL: "https://cdn.pixabay.com/photo/2020/10/03/17/30/bridge-5624104_1280.jpg",
    latitude: 52.5200,
    longitude: 13.4050,
  },
  {
    name: "Seoul",
    description: "The capital city of South Korea, a dynamic metropolis with a mix of traditional and modern elements.",
    imageURL: "https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283_1280.jpg",
    latitude: 37.5665,
    longitude: 126.9780,
  },
  {
    name: "Havana",
    description: "The capital city of Cuba, known for its colorful architecture, music, and lively street life.",
    imageURL: "https://cdn.pixabay.com/photo/2016/09/02/08/32/cars-1638594_1280.jpg",
    latitude: 23.1136,
    longitude: -82.3666,
  },
  {
    name: "Vienna",
    description: "The capital city of Austria, famous for its classical music, architecture, and cultural events.",
    imageURL: "https://cdn.pixabay.com/photo/2015/03/15/18/54/vienna-674855_1280.jpg",
    latitude: 48.8566,
    longitude: 2.3522,
  },
];


  const createDestinationsCollection = async () => {
    try {
      const destinationsCollectionRef = collection(firestore, 'destinations');
      for (const destination of destinationsData) {
        await addDoc(destinationsCollectionRef, destination);
      }
      console.log('Destinations collection created and populated successfully');
    } catch (error) {
      console.error('Error creating destinations collection:', error.message);
    }
  };
  
  createDestinationsCollection();