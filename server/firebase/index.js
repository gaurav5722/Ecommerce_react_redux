import admin  from 'firebase-admin'
import  serviceAccount  from '../config/fbServiceAccountKey.json' assert { type: "json" };
//import countryTable from "./data/countries.json" assert { type: "json" };
//var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-6d453-default-rtdb.firebaseio.com"
});

export default admin;