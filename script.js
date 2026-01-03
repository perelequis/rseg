import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDz99jgwAcRskflE97ylR8dThFxLknMjG0",
    authDomain: "rseg-monitoramento-e-int-21879.firebaseapp.com",
    projectId: "rseg-monitoramento-e-int-21879",
    storageBucket: "rseg-monitoramento-e-int-21879.firebasestorage.app",
    messagingSenderId: "209374076836",
    appId: "1:209374076836:web:9f7c0f756455f871fceb31",
    measurementId: "G-BGGKLPDWRF"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase conectado com sucesso!");


