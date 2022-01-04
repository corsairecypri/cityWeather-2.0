require("dotenv").config();

//dotenv permet d'utiliser les variables dans les fichiers .env

const axios = require("axios");

const API_KEY = process.env.API_COORDINATES_KEY;

const geoCode = async (query) => {
  const result = {};
  try {
    const {
      data: { data },
    } = await axios(
      /*encodeURIComponent(query) permet de traduire la str de query dans un format compréhensible par l'URL
      (exemple : les espaces, les accents et caractères spéciaux sont convertis*/
      `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (data.length == 0) {
      console.log("No results");
    } else {
      longitude = data[0].longitude;
      latitude = data[0].latitude;
      return { longitude, latitude };
    }
  } catch (err) {
    console.log("Error : " + err.message);
  }
};
module.exports = geoCode;
