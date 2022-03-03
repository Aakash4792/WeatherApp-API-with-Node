const express = require("express");
const app = express();
const apicaller = require("./apicaller");

//API setup
const key = "0rKBx3GTAnmRdsEDvWGHqZ7cFnuw3s8u";
const cityBase = "https://dataservice.accuweather.com/locations/v1/cities/search";
const weatherBase = "https://dataservice.accuweather.com/currentconditions/v1/";

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const buildObject = async (city) => {
  const cityQuery = `?apikey=${key}&q=${city}`;
  let cityDet = await apicaller.callAPI(cityBase + cityQuery);

  let cityKey = cityDet[0].Key;
  let name = cityDet[0].EnglishName;

  const weatherQuery = `${cityKey}?apikey=${key}`;
  const weatherDet = await apicaller.callAPI(weatherBase + weatherQuery);

  let weatherText = weatherDet[0].WeatherText;
  let temp = weatherDet[0].Temperature.Metric.Value;
  let dayTime = weatherDet[0].IsDayTime;

  let response = { success: true, name, weatherText, temp, dayTime };

  return response;
};

app.get("/getDetails/:city", (req, res) => {
  let city = req.params.city;
  if (city.length <= 0) {
    res.json({ success: true, data: [] });
  } else {
    buildObject(city)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.send("Error");
      });
  }
});
const port = 5000;
app.listen(process.env.PORT||port, () => {
  console.log("Listening to port 5000");
});
