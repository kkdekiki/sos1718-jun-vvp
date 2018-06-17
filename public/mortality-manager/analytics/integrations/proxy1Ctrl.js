/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("managerApp")
    .controller("proxy1Ctrl", ["$http", "$scope", function($http, $scope) {


        var dato1 = [];
        var dato2 = [];
        var total = [];

        $http
            .get("api/v1/mortality-stats")
            .then(function(res) {
                dato2 = funciondatos2();
                total.push(dato2);
                
                function funciondatos2() {
                    var ret = [];

                    res.data.forEach(function(d) {
                        res.data.country = d.country;
                        res.data.year = d.year;
                        res.data.transport = d.transport;
                        res.data.suicide = d.suicide;
                        res.data.cancer = d.cancer;
                        ret.push({
                            "country": res.data.country,
                            "year": res.data.year,
                            "transport": res.data.transport,
                            "suicide": res.data.suicide,
                            "cancer": res.data.cancer,
                        });
                    });

                    return ret;
                }
            });


        $http
            .get("/proxy1")
            .then(function(res) {
                dato1 = res.data;
                total.push(dato1);

                Highcharts.chart('container01', {
                    chart: {
                        type: 'column',

                    },
                    title: {
                        text: 'Highcharts'
                    },
                    subtitle: {
                        text: 'Comparason champions motoGP and transports mortality'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: dato1.map(function(d) {
                            return d.country;
                        })
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: 'Champions motoGP',
                        data: dato1.map(function(d) {
                            return Number(d.win);
                        })
                    }, {
                        name: 'Transport mortality',
                        data: dato2.map(function(d) {
                            return Number(d.transport);
                        })
                    }]
                });

            });

}]);
