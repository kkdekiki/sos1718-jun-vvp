describe('Data is loaded', function () {
	console.log("dentro del load ");
	it('should show 15 data', function (){
		browser.get('https://sos1718-jun-vvp.herokuapp.com/#!/mortality')
		.then(function (){
		    
		    element.all(by.repeater("stat in mortality"))
		    .then(function(data){
		        expect(data.length).toBeGreaterThan(14);
		    });
		    
		});

		});
	});
