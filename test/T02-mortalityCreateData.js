describe('Add stats', function() {
    it('should add a new stats', function() {
        browser.get('https://sos1718-sep-vvp.herokuapp.com/#!/mortality')
        console.log("dentro del create data");
        element.all(by.repeater("stat in mortality")).then(function(initialData) {
            //browser.driver.sleep(2000);

            element(by.model('newStat.country')).sendKeys("prueba");
            element(by.model('newStat.year')).sendKeys(2013);
            element(by.model('newStat.transport')).sendKeys(20.1);
            element(by.model('newStat.suicide')).sendKeys(20.2);
            element(by.model('newStat.cancer')).sendKeys(20.3);

            element(by.buttonText('Add')).click().then(function() {

                element.all(by.repeater("stat in mortality")).then(function(datas) {
                    expect(datas.length).toEqual(initialData.length + 1);
                });

            });

        });
    });

});