const geoCode = require("./geoCode");
const forecast = require("./forecast");

const axios = require("axios");

const express = require("express");

const app = express();

//Cette ligne permet d'utiliser EJS.
//Le set view engine permet de gérer le rendu...
app.set("view engine", "ejs");

const port = 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));

app.get("/", (req, res) => {
  //render va chercher dans un dossier Views (par défaut) (et index est sans extention)
  res.render("index");
});

app.get("/temp", (req, res) => {
  res.render("index");
});

//Le module body-parser permet de récupérer les
//données d'un formulaire

const bodyParser = require("body-parser");
const res = require("express/lib/response");

//La fonction use() permet d'utiliser un
//middleware (ici body-parser)

app.use(
  bodyParser.urlencoded({
    //Dans la doc de body-parser, urlencoded
    //renvoie un objet key-value.
    //si extends vaut false, la valeur peut
    //être un str ou un tableau
    //(ou si extended vaut true, renvoyer n'importe
    //quel type de données)
    extended: true,
  })
);

//On demande au middleware express de
//chercher les document statiques (images,
//pages CSS) dans le dossier "public"

//J'ai mis une image dans "public"
//il faut mettre dans le navigateur :
//localhost:3001/eart.jpg
app.use(express.static("public"));

//On affiche les résultats dans la page temperature.ejs

app.post("/temperature", async (req, res) => {
  try {
    //la valeur de ville  va chercher dans la
    //requête dans le DOM <body> puis l'élément
    // de name "City"
    const ville = req.body.City;
    console.log(ville);

    const geoloc = await geoCode(ville);

    const temp = await forecast(geoloc);

    console.log(`La température à ${ville} est de ${temp}°C.`);

    //on créer un objet result
    const result = {
      ville,
      temp,
    };

    //On affiche la page "temperature" la valeur de result
    res.render("temperature", result);

    //si jamais une fonction asynchrone  (await) ne fonctionne pas, mettre le mot clé "async" devant la fonction
    //qui est le scope parent
  } catch (err) {
    console.log(err.message);
  }
});

//Route pour la page "About"

app.get("/about", (req, res) => {
  res.render("about");
});

//Route pour les suggessions d'autocomplete

//On crée une nvlle route nommée suggestion
app.post("/suggestion", async (req, res) => {
  //Clé API AUTOCOMPLETE
  const API_KEY = process.env.API_AUTOCOMPLETE;

  //Si le contenu qu'on envoie n'est pas vide
  if (req.body.City != "") {
    /*On fait la recherche*/ 
    const { data } = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.City}.json?access_token=${API_KEY}&limit=5`
    );

    /*result est un objet
    
    map() renvoie un tableau différent de l'original (place est l'argument de map)
    Chaque élément de map() est modifié pour recevoit place.place_name */ 
    const result = {
      result: data.features.map((place) => {
        return place.place_name;
      }),
    };

    console.log(result);
    res.send(result);
  }
});
