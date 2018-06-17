describe('Data is loaded', function () {
	console.log("dentro del load rape data");
	it('should show 15 data', function (){
		browser.get('https://sos1718-12.herokuapp.com/#!/mortality')
		.then(function (){
		    
		    element.all(by.repeater("data in database"))
		    .then(function(data){
		        expect(data.length).toBeGreaterThan(14);
		    });
		    
		});

		});
	});
