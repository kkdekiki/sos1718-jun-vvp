var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://dbtest:dbtest0@ds155730.mlab.com:55730/sos1718-jun-vvp";
var db = null;


mongoClient.connect(mongoURL, { native_parser: true }, (error, dataa) => {

    if (error) {
        console.log("No se puede usar la base de datos " + error);
        process.exit();
    }

    db = dataa.db("sos1718-jun-vvp").collection("mortality");

    console.log("La base de datos ha sido conectada con éxito");//PRIMERO EN MOSTRARSE AL REINICIAR EL SERVIDOR

});

module.exports.getInitialData = (request, response) => {

    db.find({}).toArray(function(error, stats) {
        if (error) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500);
        }
        else {
            if (stats.length === 0) {
                db.insert([{
                    "country": "austria",
                    "year": 2013,
                    "transport": 5.8,
                    "suicide": 15.3,
                    "cancer": 32.4
                }, {
                    "country": "belgium",
                    "year": 2013,
                    "transport": 6.7,
                    "suicide": 17.3,
                    "cancer": 37
                }, {
                    "country": "cyprus",
                    "year": 2013,
                    "transport": 6.5,
                    "suicide": 4.5,
                    "cancer": 26.6
                }, {
                    "country": "france",
                    "year": 2013,
                    "transport": 5.1,
                    "suicide": 14.1,
                    "cancer": 32.9
                }, {
                    "country": "greece",
                    "year": 2013,
                    "transport": 8.6,
                    "suicide": 5,
                    "cancer": 31
                }, {
                    "country": "ireland",
                    "year": 2013,
                    "transport": 4,
                    "suicide": 11,
                    "cancer": 41.2
                }, {
                    "country": "italy",
                    "year": 2013,
                    "transport": 5.6,
                    "suicide": 6.3,
                    "cancer": 31.7
                }, {
                    "country": "latvia",
                    "year": 2013,
                    "transport": 12.4,
                    "suicide": 19,
                    "cancer": 34.6
                }, {
                    "country": "lithuania",
                    "year": 2013,
                    "transport": 10.7,
                    "suicide": 31.5,
                    "cancer": 28.5
                }, {
                    "country": "luxembourg",
                    "year": 2013,
                    "transport": 6,
                    "suicide": 13.4,
                    "cancer": 35.6
                }, {
                    "country": "malt",
                    "year": 2013,
                    "transport": 2.5,
                    "suicide": 8.3,
                    "cancer": 35.1
                }, {
                    "country": "poland",
                    "year": 2013,
                    "transport": 10.3,
                    "suicide": 15.5,
                    "cancer": 31
                }, {
                    "country": "portugal",
                    "year": 2013,
                    "transport": 7.8,
                    "suicide": 11.3,
                    "cancer": 26.7
                }, {
                    "country": "spain",
                    "year": 2013,
                    "transport": 4.3,
                    "suicide": 8.2,
                    "cancer": 23.7
                }, {
                    "country": "united-kindom",
                    "year": 2013,
                    "transport": 2.8,
                    "suicide": 7.1,
                    "cancer": 34.7

                }]);
                console.log("OK");
                response.sendStatus(201);

            }
            else {
                console.log("La base de datos ya ha sido inicializada con anterioridad, los datos están cargados")
                response.sendStatus(409);
            }

        }
    });
};

module.exports.getCollection = (request, response) => {

    var limit = parseInt(request.query.limit);
    var offset = parseInt(request.query.offset);
    var country = request.query.country;
    var year = parseInt(request.query.year);
    var transport = parseFloat(request.query.transport);
    var suicide = parseFloat(request.query.suicide);
    var cancer = parseFloat(request.query.cancer);
    console.log(country);
    var a = [];
    var b = [];

    console.log("INFO: New resquest to /mortality-stats");
    if (!db) {
        console.log("BD is empty");
        response.sendStatus(404);
    }
    else if (limit > 0 || offset >= 0) {
        db.find({}).skip(offset).limit(limit).toArray(function(error, stats) {
            if (error) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500);
            }
            else {
                if (stats.length === 0) {
                    console.log("INFO: Any stats I");
                    response.send([]);
                }
                if (country || year || transport || suicide || cancer) {
                    console.log("INFO: Search by parameters with Limit&Offset");
                    a = buscador(stats, a, country, year, transport, suicide, cancer);
                    if (a.length > 0) {
                        b = a.slice(offset, offset + limit);
                        response.send(b);
                    }
                    else {
                        console.log("INFO: Any stats with this value with limit&offset");
                        response.send([]);

                    }
                }
                else {
                    console.log("INFO: GET to collection with Limit&Offset ");
                    response.send(stats);

                }
            }
        });

    }
    else {

        db.find({}).toArray(function(error, stats) {
            if (error) {
                console.error('ERROR from data');
                response.sendStatus(500);
            }
            else {
                if (stats.length === 0) {
                    console.log("INFO: Any stats II");
                    response.send([]);

                }
                else if (country || year || transport || suicide || cancer) {
                    console.log("INFO: Search by parameters");
                    a = buscador(stats, a, country, year, transport, suicide, cancer);
                    if (a.length > 0) {
                        response.send(a);

                    }
                    else {
                        console.log("INFO: Any stats with this value")
                        response.send([]);

                    }
                }

                else {
                    console.log("INFO: GET to collection");
                    response.send(stats);
                }
            }
        });
    }
};

/************************************METODO AUXILIAR GET A COLECCION*************************************/

var buscador = function(stats, a, param_country, param_year, param_transport, param_suicide, param_cancer) {
    if (param_country || param_year || param_transport || param_suicide || param_cancer) {
        for (var j = 0; j < stats.length; j++) {
            var country = stats[j].country;
            var year = parseInt(stats[j].year);
            var transport = parseFloat(stats[j].transport);
            var suicide = parseFloat(stats[j].suicide);
            var cancer = parseFloat(stats[j].cancer);

            if (param_country) {

                if (param_country == country) {
                    console.log("INFO:Search with country");
                    a.push(stats[j]);
                }
            }
            else if (param_year) {

                if (param_year == year) {
                    console.log("INFO:Search with year");
                    a.push(stats[j]);
                }
            }
            else if (param_transport) {

                if (param_transport == transport) {
                    console.log("INFO:Search whith tranport");
                    a.push(stats[j]);
                }
            }
            else if (param_suicide) {

                if (param_suicide == suicide) {
                    console.log("INFO:Search with suicide");
                    a.push(stats[j]);
                }
            }
            else if (param_cancer) {

                if (param_cancer == cancer) {
                    console.log("INFO:Search with cancer");
                    a.push(stats[j]);
                }
            }
        }
    }
    return a;
};

module.exports.getRecurso = (request, response) => {
    var country = request.params.country;
    var aux = [];
    var year = null;

    if (!country || country == null) {

        console.log("WARMING: Incorrect data");
        response.sendStatus(400);
    }
    else {
        if (checkdb(db) == false) {
            response.sendStatus(500);
            process.exit();
        }
        else {

            db.find({}).toArray(function(error, stats) {

                if (checkdb(stats) == false) {
                    response.sendStatus(500);
                }
                else {

                    filtrado(stats, aux, country, year);

                    if (aux.length == 0) {
                        console.log("INFO: Any stats with this value");
                        response.sendStatus(404);
                    }
                    else {
                        console.log("INFO: New request to /mortality-stats/value");
                        response.send(aux);

                    }
                }
            });
        }
    }
};

/*********** METODO AUXILIAR GET A UN RECURSO*************/
var filtrado = function(stats, aux, country, year) {

    if (year == null) {
        if (isNaN(country)) {
            stats.filter((x) => {
                return x.country == country;

            }).map((x) => {
                return aux.push(x);
            });
        }
        else {
            stats.filter((x) => {
                return x.year == parseInt(country);
            }).map((x) => {
                return aux.push(x);
            });
        }
    }
    else {
        stats.filter((x) => {
            return x.country == country && x.year == parseInt(year);
        }).map((x) => {
            return aux.push(x);
        });
    }
};

var checkdb = function(database) {

    if (!database || database == null || database.length === 0) {
        console.log("INFO: DB is empty");
        return false;
    }
    else {
        return true;
    }
};


module.exports.getRecursoConcreto = (request, response) => {
    var country = request.params.country;
    var year = parseInt(request.params.year);
    var a = [];
    if (!country) {
        console.log("Bad Request");
        response.sendStatus(400);

    }
    else if (!db) {
        response.sendStatus(404);
    }
    else {
        db.find({}).toArray(function(error, stats) {
            if (stats.length === 0) {
                console.log("WARNING: Error getting data from DB");
                response.sendStatus(404);
            }
            else {
                if (country) {
                    for (var i = 0; i < stats.length; i++) {
                        if (stats[i].country === country) {
                            a.push(stats[i]);
                        }
                    }
                    var b = a.filter(f => f.year === year);
                    response.send(b);
                }
            }
        });
    }
};


module.exports.postCollection = (request, response) => {
    var country = request.params.country;
    var newStat = request.body;
    if (!newStat) {
        console.log("WARMING: New POST without Stat");
        response.sendStatus(400); //bad request
    }
    else {
        console.log("INFO: New PORT with correct body");
        if (!newStat.country || !newStat.year || !newStat.transport || !newStat.suicide || !newStat.cancer) {
            console.log("WARMING: New POST incorrect");
            console.log(newStat);
            response.sendStatus(422); //incorrecto
        }
        else {
            db.find({}).toArray(function(error, stats) {
                if (error) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500);
                }
                else {
                    var StatBeforeInsertion = stats.filter((i) => {
                        return (i.country.localeCompare(newStat.country, "en", {
                            "sensitiviry": "a"
                        }) === 0);
                    });
                    if (StatBeforeInsertion.length > 0) {
                        console.log("WARMING: This data already exists");
                        response.sendStatus(409);
                    }
                    else {
                        console.log("INFO: adding Internetandphones");
                        db.insert(newStat);
                        response.sendStatus(201);
                    }
                }
            });
        }
    }

};

module.exports.postRecurso = (request, response) => {
    console.log("INFO: Method Not Allowed (405)");
    response.sendStatus(405);
};

module.exports.putRecurso = (request, response) => {
    var updateStat = request.body;
    if (!updateStat) {
        console.log("WARNING: New PUT");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New PUT");
        if (!updateStat.country || !updateStat.year || !updateStat.transport || !updateStat.suicide || !updateStat.cancer) {
            console.log("WARMING: New PUT incorrect");
            response.sendStatus(422); //incorrecto
        }
        else {
            db.update({
                country: updateStat.country
            }, {
                country: updateStat.country,
                year: updateStat.year,
                transport: updateStat.transport,
                suicide: updateStat.suicide,
                cancer: updateStat.cancer
            });
            response.sendStatus(200);
        }
    }
};


module.exports.putRecursoConcreto = (request, response) => {
    var updateStat = request.body;
    var countryPar = request.params.country;
    var yearPar = parseInt(request.params.year);
    if (!updateStat) {
        console.log("WARNING: New PUT");
        response.sendStatus(400); // bad request

    }
    else {
        console.log("INFO: New PUT request to stat" + countryPar + " and year " + yearPar + " with data " + JSON.stringify(updateStat, 2, null));
        if (!updateStat.country || !updateStat.year || !updateStat.transport || !updateStat.suicide || !updateStat.cancer) {
            console.log("WARNING: The stat " + JSON.stringify(updateStat, 2, null));
            response.sendStatus(422); // unprocessable entity ¿duda)400 o 422?
        }
        else {
            db.find({}, function(err, stats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    console.log(stats);
                    if (countryPar === updateStat.country && yearPar === parseInt(updateStat.year)) {
                        db.update({country: countryPar, year: yearPar}, updateStat);
                        console.log("INFO: Modifying data with country " + countryPar + " with data " + JSON.stringify(updateStat, 2, null));
                        response.send(updateStat); // return the updated contact
                    }
                    else {
                        console.log("WARNING: There are not any data with country " + countryPar);
                        response.sendStatus(400); // not found
                    }
                }
            });
        }
    }
};


module.exports.putCollection = (request, response) => {
    console.log("INFO: Method Not Allowed (405)");
    response.sendStatus(405);

};
module.exports.deleteCollection = (request, response) => {
    console.log("INFO: New DELETE");
    db.remove({}, {multi: true}, function(error, stats) {
        if (error) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500);
        }
        else {
            if (stats.length > 0) {
                console.log("INFO: The stats is removed");
                response.sendStatus(204); // no content
            }
            else {
                console.log("WARNING: There are no stats to delete");
                response.send([]);
            }
        }
    });
};

module.exports.deleteRecurso = (request, response) => {
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New DELETE");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New DELETE");
        db.remove({country: country}, {}, function(error, stats) {
            if (error) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500);
            }
            else {
                console.log("INFO: Stats remove");
                if (stats === 1) {
                    console.log("INFO: The stats is removed");
                    response.sendStatus(204); // no content
                }
                else {
                    console.log("WARNING: There are no stats to delete");
                    response.send([]); // not found
                }
            }
        });
    }
};


module.exports.deleteRecursoConcreto = (request, response) => {
    var country = request.params.country;
    var year = parseInt(request.params.year);
    if (!country && !year) {
        console.log("WARNING: New DELETE request");
        response.sendStatus(400);
    }
    else {
        console.log("INFO: New DELETE" + country);
        db.remove({ country: country, year: year }, {}, function(error, stats) {
            var a = JSON.parse(stats);
            if (error) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            }
            else if (stats.length === 0) {
                console.log("Something is wrong");
                response.send([]);
            }
            else {
                console.log("INFO: The stat with country " + country + " has been succesfully deleted");
                response.sendStatus(204); // no content

            }
        });
    }
};


