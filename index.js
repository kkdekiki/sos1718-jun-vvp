var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var request= require("request");

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.listen(process.env.PORT);

var m = "/api/v1/mortality-stats";
var mortality = require("./public/mortality-manager/v1/mortality.js");

app.get(m + "/loadInitialData", mortality.getInitialData);
app.get(m, mortality.getCollection);
app.get(m + "/:country", mortality.getRecurso);
app.get(m + "/:country/:year", mortality.getRecursoConcreto);

app.post(m, mortality.postCollection);
app.post(m + "/:country", mortality.postRecurso);

app.put(m, mortality.putCollection);
app.put(m + "/:country", mortality.putRecurso);
app.put(m + "/:country/:year", mortality.putRecursoConcreto);

app.delete(m,mortality.deleteCollection);
app.delete(m+"/:country",mortality.deleteRecurso);
app.delete(m+"/:country/:year",mortality.deleteRecursoConcreto);

app.get("/api/v1/mortality-stats/docs",(req,res)=>{
   res.redirect("https://documenter.getpostman.com/view/360401/RWEfMK4X");
});