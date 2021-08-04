var obj= navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
var coordgeo;
var b1 = 1;

var latgeo;

function fn_mal() {
	console.log("algo salio mal");
	
	var rta = {coords:{
				latitude: -12.047783958634945,
				longitude: -75.19866675138474
				}};
	fn_ok(rta);
}

function fn_ok(rta) {


	var posicion = {
		lat: rta.coords.latitude,
		lng: rta.coords.longitude
	}
	latgeo= rta.coords.latitude;

	var opcionesMapa = {
		center: posicion,
		zoom: 16
	}
	var mapa= new google.maps.Map(document.getElementById('mapa'),opcionesMapa);

	var maker= new google.maps.Marker({
		position: posicion,
		map: mapa
	});

	  var contentString = '<p>ESTAS AQUI</p>';

	  var infowindow = new google.maps.InfoWindow({
	    content: contentString
	  });

	  $( document ).ready(function() {
		    infowindow.open(mapa, maker);
		});
	

	

	// aqui comienza el click
	mapa.addListener('click', function(e) { //inicio de click

   		$("#botones").css({"display": "inline-block"}); 
   		$("#info").css({"display": "block"}); 
   		$("#mapa").css({"height": "90%"}); 
   		


   		// Limpiando el localstorage	 
   		 localStorage.removeItem('nombre_1');

   		
   		 
   		 	
   		 	//obteniendo posicion del click
   		 	var latitudx = e.latLng.lat();
			var longitudx = e.latLng.lng();
					
			//Puedo unirlas en una unica variable si asi lo prefiero
			var coordenadas = e.latLng.lat() + ", " + e.latLng.lng();
			coordgeo = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
			
		if (b1 == 1) {
				var maker2= new google.maps.Marker({
				position: coordgeo,
				map: mapa
				});	

		}

		if (latitudx > latgeo) {
			console.log('vas al norte');
			medirNorte(latitudx,longitudx);
			//-------------------------------------------------------------------
				//GRAFICANDO LAS RUTAS POR MEDIO DE LOS IF

						//guardando los nombres de las rutas en los i's
						
						var i1 = (localStorage.getItem('nombre_1'));

						
						
							if (b1 == 1) {// es la b1 es la bandera que cuenta los clicks y segun a ello grafica la ruta
								//console.log('del local es '+i1);

								var objConfDR = { 
								map: mapa,
								suppressMarkers: true
								}
								var destino = rutas.norte[i1].final;
								
								var objConfDS = {
									origin:rutas.norte[i1].inicio,
									destination: destino,
									waypoints:rutas.norte[i1].waypts,
									travelMode: google.maps.TravelMode.WALKING
								}

								var ds = new google.maps.DirectionsService();

								var dr = new google.maps.DirectionsRenderer(objConfDR);

								ds.route(objConfDS, fn_rutear);

								function fn_rutear(resultado, status) {
									if (status=='OK') {
										dr.setDirections(resultado);
									}else{
										console.log('error al trazar ruta');
									}
								}
								//
								$( "#info img" ).attr( "src", rutas.norte[i1].imagen );
								//$( "p" ).text( "<b>Some</b> new text." );
								
								$( "#txt_info #nombreruta"  ).text( rutas.norte[i1].datos.n_ruta);
								$( "#txt_info #ubi"  ).text( rutas.norte[i1].datos.nombre);
								$( "#txt_info #zona"  ).text( rutas.norte[i1].datos.lorem1);
								$( "#txt_info #dist"  ).text( rutas.norte[i1].datos.lorem2);
								

							}
						

			//-------------------------------------------------------------------

		}else if (latitudx < latgeo) {
			console.log('vas al sur');
			medirSur(latitudx,longitudx);
			//-------------------------------------------------------------------
				//GRAFICANDO LAS RUTAS POR MEDIO DE LOS IF

						//guardando los nombres de las rutas en los i's
						
						var i1 = (localStorage.getItem('nombre_1'));

						
						
							if (b1 == 1) {// es la b1 es la bandera que cuenta los clicks y segun a ello grafica la ruta
								//console.log('del local es '+i1);

								var objConfDR = { 
								map: mapa,
								suppressMarkers: true
								}
								var destino = rutas.sur[i1].final;
								
								var objConfDS = {
									origin:rutas.sur[i1].inicio,
									destination: destino,
									waypoints:rutas.sur[i1].waypts,
									travelMode: google.maps.TravelMode.WALKING
								}

								var ds = new google.maps.DirectionsService();

								var dr = new google.maps.DirectionsRenderer(objConfDR);

								ds.route(objConfDS, fn_rutear);

								function fn_rutear(resultado, status) {
									if (status=='OK') {
										dr.setDirections(resultado);
									}else{
										console.log('error al trazar ruta');
									}
								}
								//
								$( "#info img" ).attr( "src", rutas.sur[i1].imagen );
								//$( "p" ).text( "<b>Some</b> new text." );
								
								$( "#txt_info #nombreruta"  ).text( rutas.sur[i1].datos.n_ruta);
								$( "#txt_info #ubi"  ).text( rutas.sur[i1].datos.nombre);
								$( "#txt_info #zona"  ).text( rutas.sur[i1].datos.lorem1);
								$( "#txt_info #dist"  ).text( rutas.sur[i1].datos.lorem2);
								

							}
						

			//-------------------------------------------------------------------

		}

		

		//coordenadas obtenidas en click
			console.log(coordenadas);

		//	medir(latitudx,longitudx);




		//---- ejemplo de for nuevo ----
		/*
		for (var x in rutas.norte){
			
			for (var z in rutas.norte[x].waypts){
				console.log(rutas.norte[x].waypts[z].location);
			}
			
		}
		*/
		//---- FIN ejemplo de for nuevo ----






b1 ++; //la bandera incrementa uno en cada click

  	});
  	// fin de click

}


function medirNorte(latx,lony) {
		var origenn = new google.maps.LatLng(latx,lony);
		var med1=500000000.5;
		var nomb_a;

		for (var x in rutas.norte) {
			var bande1 =0;
			for (var z in rutas.norte[x].waypts) {
				var waypts_r = rutas.norte[x].waypts[z].location;
				var medida_waypts = google.maps.geometry.spherical.computeDistanceBetween(waypts_r, origenn)
				var lugarway = x;

				//console.log(medida_waypts);
				if (medida_waypts < med1) {
					med1 = medida_waypts;
					nomb_a = lugarway;
				}	
			}
		}
		//graf_rutas(nomb_a);
		console.log(nomb_a);
		localStorage.setItem('nombre_1', nomb_a);

};
function medirSur(latx,lony) {
		var origenn = new google.maps.LatLng(latx,lony);
		var med1=500000000.5;
		var nomb_a;

		for (var x in rutas.sur) {
			var bande1 =0;
			for (var z in rutas.sur[x].waypts) {
				var waypts_r = rutas.sur[x].waypts[z].location;
				var medida_waypts = google.maps.geometry.spherical.computeDistanceBetween(waypts_r, origenn)
				var lugarway = x;

				//console.log(medida_waypts);
				if (medida_waypts < med1) {
					med1 = medida_waypts;
					nomb_a = lugarway;
				}	
			}
		}
		//graf_rutas(nomb_a);
		console.log(nomb_a);
		localStorage.setItem('nombre_1', nomb_a);

};


//

/*function graf_rutas(a) {

	localStorage.setItem('nombre_1', a);


}
*/






//Json rutas
var rutas ={

				norte:{
					//----------------------------------------------------
						tm04: {//inicio
							inicio: {lat: -12.078405682575637, lng:-75.2301424741745},
							final: {lat: -12.056876622960312, lng: -75.2032881975174},
							waypts: [ //el numero de waypoints maximo es 8
										{location: new google.maps.LatLng(-12.070100623078728,-75.21495848894119)},
										{location: new google.maps.LatLng(-12.071475025471134,-75.21365493535995)},
										{location: new google.maps.LatLng(-12.067752581966475,-75.2076481282711)},
										{location: new google.maps.LatLng(-12.069696169742405,-75.20637944340706)},
										{location: new google.maps.LatLng(-12.067692254453785,-75.20296767354012)},
										{location: new google.maps.LatLng(-12.062834533488468,-75.20554259419441)},
										{location: new google.maps.LatLng(-12.06155608806243,-75.20387828350067)},
										{location: new google.maps.LatLng(-12.058691761493174,-75.20386755466461)}
									],
							imagen: "https://c2.staticflickr.com/6/5808/31031624985_f561a6522f_z.jpg",
							datos: 	{
										n_ruta: 'TM-01 (EX TM-04)',
										nombre: 'La Rivera',
										lorem1: 'Uñas',
										lorem2: 'Huancayo',
									}
							  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
						tm04a: {//inicio
							inicio: {lat: -12.059393157654096, lng:-75.20347461104393},
							final: {lat: -12.024568253149075, lng: -75.18422573804855},
							waypts: [ //el numero de waypoints maximo es 8
										{location: new google.maps.LatLng(-12.053770923921896,-75.20054161548615)},
										{location: new google.maps.LatLng(-12.04933160074027,-75.19602745771408)},
										{location: new google.maps.LatLng(-12.044033904768465,-75.19395411014557)},
										{location: new google.maps.LatLng(-12.038871462589661,-75.19225895404816)},
										{location: new google.maps.LatLng(-12.033341666032953,-75.18987715244293)},
										{location: new google.maps.LatLng(-12.029238838328393,-75.18818199634552)},
										{location: new google.maps.LatLng(-12.024223020178008,-75.18590748310089)},
										{location: new google.maps.LatLng(-12.024568253149075,-75.18422573804855)}
									],
							imagen: "https://c2.staticflickr.com/6/5808/31031624985_f561a6522f_z.jpg",
							datos: 	{
										n_ruta: 'TM-01 (EX TM-04)',
										nombre: 'La Rivera',
										lorem1: 'Uñas',
										lorem2: 'Huancayo',
									}
							  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tm07v: {//inicio
						inicio: {lat: -12.060234094985915, lng:-75.19384682178497},
						final: {lat: -12.066480980074797, lng: -75.22893279790878},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.067419993629134,-75.20783990621567)},
									{location: new google.maps.LatLng(-12.06853211707834,-75.20737320184708)},
									{location: new google.maps.LatLng(-12.072214681935733,-75.213483273983)},
									{location: new google.maps.LatLng(-12.059004950722695,-75.22183164954185)},
									{location: new google.maps.LatLng(-12.059844316008688,-75.2233524620533)},
									{location: new google.maps.LatLng(-12.06211058931808,-75.22551164031029)},
									{location: new google.maps.LatLng(-12.063327304304684,-75.22850632667542)},
									{location: new google.maps.LatLng(-12.066480980074797,-75.22893279790878)}
								],
						imagen: "https://c8.staticflickr.com/6/5350/30946333031_7422bde684_z.jpg",
						datos: 	{
									n_ruta: 'TM-03 (EX TM-07)',
									nombre: 'Cerrito La Libertad',
									lorem1: 'Urb. La Florida',
									lorem2: 'El Tambo',
								}
						  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tm16v: {//inicio
						inicio: {lat: -12.082430122262828, lng:-75.20190954208374},
						final: {lat: -12.029248281224499, lng: -75.23510724306107},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.073936341715516,-75.20635664463043)},
									{location: new google.maps.LatLng(-12.068228906001984,-75.20955383777618)},
									{location: new google.maps.LatLng(-12.070600024572576,-75.21442472934723)},
									{location: new google.maps.LatLng(-12.063822346743814,-75.21813690662384)},
									{location: new google.maps.LatLng(-12.060496395717784,-75.21280467510223)},
									{location: new google.maps.LatLng(-12.054037428461005,-75.21719545125961)},
									{location: new google.maps.LatLng(-12.054766640706804,-75.218885242939)},
									{location: new google.maps.LatLng(-12.0434452657151,-75.22583216428757)}
								],
						imagen: "https://c8.staticflickr.com/6/5350/30946333031_7422bde684_z.jpg",
						datos: 	{
									n_ruta: 'TM-04 (EX TM-11)',
									nombre: 'Huancan',
									lorem1: 'La Victoria',
									lorem2: 'Viques',
								}
						  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tm1v: {//inicio
						inicio: {lat: -12.076307409770505, lng:-75.20542323589325},
						final: {lat: -11.999457359602692, lng: -75.25288760662079},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.068936047594981,-75.20508795976639)},
									{location: new google.maps.LatLng(-12.067561632179565,-75.20296901464462)},
									{location: new google.maps.LatLng(-12.06535311028368,-75.20418137311935)},
									{location: new google.maps.LatLng(-12.06950889344944,-75.21173179149628)},
									{location: new google.maps.LatLng(-12.070589533423956,-75.21441400051117)},
									{location: new google.maps.LatLng(-12.046373759496596,-75.23057162761688)},
									{location: new google.maps.LatLng(-12.042596405430546,-75.22652685642242)},
									{location: new google.maps.LatLng(-11.999457359602692,-75.25288760662079)}
								],
						imagen: "https://c2.staticflickr.com/6/5647/31067388145_41b4acea28_z.jpg",
						datos: 	{
									n_ruta: 'TM-09 (EX TM-1A)',
									nombre: 'Barrio San José',
									lorem1: 'San Agustín de Cajas',
									lorem2: 'Cajas',
								}
						  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tc04v: {//inicio
						inicio: {lat: -12.105736280533682, lng:-75.20526766777039},
						final: {lat: -12.031295506590336, lng: -75.1892226934433},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.086034863375795,-75.20825028419495)},
									{location: new google.maps.LatLng(-12.071529581644423,-75.21376356482506)},
									{location: new google.maps.LatLng(-12.069315846690273,-75.20963832736015)},
									{location: new google.maps.LatLng(-12.067765696601326,-75.207629352808)},
									{location: new google.maps.LatLng(-12.064324383785662,-75.20232662558556)},
									{location: new google.maps.LatLng(-12.06004628788851,-75.20441606640816)},
									{location: new google.maps.LatLng(-12.057953117390213,-75.20407810807228)},
									{location: new google.maps.LatLng(-12.048283404167911,-75.19535958766937)}
								],
						imagen: "https://c3.staticflickr.com/6/5610/30995950226_64cfc39923_z.jpg",
						datos: 	{
									n_ruta: 'TC-05 (EX TC-04)',
									nombre: 'Huari',
									lorem1: 'Vilcacoto',
									lorem2: 'Huancán',
								}
						  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tc07v: {//inicio
						inicio: {lat: -12.143792201876195, lng:-75.16222357749939},
						final: {lat: -12.023415021425853, lng: -75.2391117811203},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.082383967279126,-75.20174860954285)},
									{location: new google.maps.LatLng(-12.073390785824856,-75.20751535892487)},
									{location: new google.maps.LatLng(-12.070043970237485,-75.21277248859406)},
									{location: new google.maps.LatLng(-12.070537077354587,-75.21444618701935)},
									{location: new google.maps.LatLng(-12.06387323280908,-75.21831527352333)},
									{location: new google.maps.LatLng(-12.06049010075938,-75.21279126405716)},
									{location: new google.maps.LatLng(-12.05407415110705,-75.21722763776779)},
									{location: new google.maps.LatLng(-12.023415021425853,-75.2391117811203)}
								],
						imagen: "https://c5.staticflickr.com/6/5582/30951905172_2f2f59868b_z.jpg",
						datos: 	{
									n_ruta: 'TC-07 (EX TC-06)',
									nombre: 'Punta',
									lorem1: 'Saños Grande',
									lorem2: 'El Tambo',
								}
						  },// fin 
					//---------------------------------------------------------	

					//---------------------------------------------------------
					tc09v: {//inicio
						inicio: {lat:-12.135776570791679, lng:-75.22290050983429},
						final: {lat: -12.031421424544229, lng: -75.18928706645966},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.074719006707735,-75.21194770932198)},
									{location: new google.maps.LatLng(-12.071466632083407,-75.20606830716133)},
									{location: new google.maps.LatLng(-12.069098144263556,-75.20724847912788)},
									{location: new google.maps.LatLng(-12.068250939120539,-75.20600125193596)},
									{location: new google.maps.LatLng(-12.06436897424794,-75.20230248570442)},
									{location: new google.maps.LatLng(-12.058989212598501,-75.20370796322823)},
									{location: new google.maps.LatLng(-12.053130893638807,-75.19987642765045)},
									{location: new google.maps.LatLng(-12.047674838376876,-75.19511282444)}
								],
						imagen: "https://c3.staticflickr.com/6/5674/31061878786_34c0c17fb4_z.jpg",
						datos: 	{
									n_ruta: 'TC-10 (EX TC-09)',
									nombre: 'Huancan',
									lorem1: 'Cullpa Alta',
									lorem2: 'Huancayo',
								}
						  },// fin 
					//---------------------------------------------------------

					//---------------------------------------------------------
					chasqui: {//inicio
						inicio: {lat:-12.040499951766272, lng:-75.19325137138367},
						final: {lat: -12.023415021425853, lng: -75.23905813694},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.062027178247305,-75.20857483148575)},
									{location: new google.maps.LatLng(-12.045607800328213,-75.21765410900116)},
									{location: new google.maps.LatLng(-12.041335177559377,-75.2224338054657)},
									{location: new google.maps.LatLng(-12.043404344441962,-75.22587239742279)},
									{location: new google.maps.LatLng(-12.03753886550081,-75.22968113422394)},
									{location: new google.maps.LatLng(-12.031033175408929,-75.23397266864777)},//
									{location: new google.maps.LatLng(-12.027087711824178,-75.23656904697418)},
									{location: new google.maps.LatLng(-12.023415021425853,-75.23905813694)}
								],
						imagen: "https://c2.staticflickr.com/6/5515/31398869625_96b0c73efe_z.jpg",
						datos: 	{
									n_ruta: 'TC-06  San Carlos',
									nombre: 'Tambo',
									lorem1: 'San Carlos',
									lorem2: 'Huancayo',
								}
						  }// fin 
					//---------------------------------------------------------


				},// fin de NORTE

				sur:{
					//----------------------------------------------------
					tm04v: {//inicio
						inicio: {lat: -12.024726704886781, lng: -75.18605768680573},
						final: {lat: -12.078489613145834, lng: -75.23031413555145},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.057841900472331,-75.2040284872055)},
									{location: new google.maps.LatLng(-12.06001376217287,-75.20446836948395)},
									{location: new google.maps.LatLng(-12.064440318844069,-75.20235747098923)},
									{location: new google.maps.LatLng(-12.0686357,-75.21029759999999)},
									{location: new google.maps.LatLng(-12.070278980799063,-75.21363884210587)},
									{location: new google.maps.LatLng(-12.071114113884203,-75.21683871746063)},
									{location: new google.maps.LatLng(-12.073044562900256,-75.22020757198334)},
									{location: new google.maps.LatLng(-12.075405147409509,-75.22467076778412)}
								],
						imagen: "https://c2.staticflickr.com/6/5808/31031624985_f561a6522f_z.jpg",
						datos: 	{
									n_ruta: 'TM-01 (EX TM-04)',
									nombre: 'Uñas',
									lorem1: 'La Rivera',
									lorem2: 'Huancayo',
								}
						  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tm07: {//inicio
						inicio: {lat: -12.064546286452064, lng:-75.22992789745331},
						final: {lat: -12.057264835373637, lng: -75.18894374370575},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.059010721239936,-75.22170692682266)},
									{location: new google.maps.LatLng(-12.074685434122166,-75.21188467741013)},
									{location: new google.maps.LatLng(-12.072403529726902,-75.20772188901901)},
									{location: new google.maps.LatLng(-12.069413418998609,-75.20206242799759)},
									{location: new google.maps.LatLng(-12.065200978326118,-75.20393460988998)},
									{location: new google.maps.LatLng(-12.063780379164545,-75.2011638879776)},
									{location: new google.maps.LatLng(-12.062069145780827,-75.19784599542618)},
									{location: new google.maps.LatLng(-12.05928876255667,-75.19703596830368)}
								],
						imagen: "https://c5.staticflickr.com/6/5712/30995951956_bc5f23d121_z.jpg",
						datos: 	{
									n_ruta: 'TM-03 (EX TM-07)',
									nombre: 'Urb. La Florida',
									lorem1: 'Cerrito La Libertad',
									lorem2: 'Huancayo',
								}
						  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tm16: {//inicio
						inicio: {lat: -12.029717325800885, lng:-75.23521184921265},
						final: {lat: -12.092669303597651, lng: -75.21349668502808},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.050992552653836,-75.22176861763)},
									{location: new google.maps.LatLng(-12.062911649246422,-75.21385073661804)},
									{location: new google.maps.LatLng(-12.065492651512605,-75.21771311759949)},
									{location: new google.maps.LatLng(-12.069164766694884,-75.21488070487976)},
									{location: new google.maps.LatLng(-12.068388380889909,-75.21269202232361)},
									{location: new google.maps.LatLng(-12.07477461167104,-75.20815640687943)},
									{location: new google.maps.LatLng(-12.074412655877959,-75.20678848028183)},
									{location: new google.maps.LatLng(-12.082497267248524,-75.20219385623932)}
								],
						imagen: "https://c8.staticflickr.com/6/5350/30946333031_7422bde684_z.jpg",
						datos: 	{
									n_ruta: 'TM-07 (EX TM-16)',
									nombre: 'La Victoria',
									lorem1: 'Huancan',
									lorem2: 'El Tambo',
								}
						  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tm1: {//inicio
						inicio: {lat: -11.995549212804487, lng:-75.25508165359497},
						final: {lat: -12.076307409770505, lng: -75.20542323589325},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.043509271505693,-75.2260547876358)},
									{location: new google.maps.LatLng(-12.04669902980779,-75.23077547550201)},
									{location: new google.maps.LatLng(-12.069194142642477,-75.21540105342865)},
									{location: new google.maps.LatLng(-12.066963601657147,-75.21105319261551)},
									{location: new google.maps.LatLng(-12.06498589551903,-75.20711034536362)},
									{location: new google.maps.LatLng(-12.067809236813021,-75.20542323589325)},
									{location: new google.maps.LatLng(-12.072887189859957,-75.20482242107391)},
									{location: new google.maps.LatLng(-12.076307409770505,-75.20542323589325)}
								],
						imagen: "https://c2.staticflickr.com/6/5647/31067388145_41b4acea28_z.jpg",
						datos: 	{
									n_ruta: 'TM-09 (EX TM-1A)',
									nombre: 'San Agustín de Cajas',
									lorem1: 'Barrio San José',
									lorem2: 'Cajas',
								}
						  },// fin 
					//---------------------------------------------------------	
					//----------------------------------------------------
					tc04: {//inicio
						inicio: {lat: -12.042019304991703, lng:-75.193310379982},
						final: {lat: -12.105736280533682, lng: -75.20526766777039},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.057831408344137,-75.20401775836945)},
									{location: new google.maps.LatLng(-12.060118683222989,-75.20461857318878)},
									{location: new google.maps.LatLng(-12.062269542575915,-75.20455420017242)},
									{location: new google.maps.LatLng(-12.06418956342254,-75.20753681659698)},
									{location: new google.maps.LatLng(-12.066697110924382,-75.20667850971222)},
									{location: new google.maps.LatLng(-12.071009198418619,-75.21433889865875)},
									{location: new google.maps.LatLng(-12.085896382336811,-75.20824491977692)},
									{location: new google.maps.LatLng(-12.089851471158676,-75.20744025707245)}
								],
						imagen: "https://c3.staticflickr.com/6/5610/30995950226_64cfc39923_z.jpg",
						datos: 	{
									n_ruta: 'TC-05 (EX TC-04)',
									nombre: 'Vilcacoto',
									lorem1: 'Huari',
									lorem2: 'Huancayo',
								}
						  },// fin 
					//---------------------------------------------------------
					//----------------------------------------------------
					tc09: {//inicio
						inicio: {lat:-12.024361531773623, lng:-75.1858913898468},
						final: {lat: -12.135776570791679, lng: -75.22290050983429},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.057852393240504,-75.2040284872055)},
									{location: new google.maps.LatLng(-12.060244587660502,-75.20457565784454)},
									{location: new google.maps.LatLng(-12.06441408948844,-75.20236283540726)},
									{location: new google.maps.LatLng(-12.070892741108707,-75.21437913179398)},
									{location: new google.maps.LatLng(-12.085968770685481,-75.20827978849411)},
									{location: new google.maps.LatLng(-12.099504998872176,-75.21629691123962)},
									{location: new google.maps.LatLng(-12.111799576693096,-75.21646857261658)},
									{location: new google.maps.LatLng(-12.135776570791679,-75.22290050983429)}
								],
						imagen: "https://c3.staticflickr.com/6/5674/31061878786_34c0c17fb4_z.jpg",
						datos: 	{
									n_ruta: 'TC-10 (EX TC-09)',
									nombre: 'Cullpa Alta',
									lorem1: 'Huancan',
									lorem2: 'Huancan',
								}
						  },// fin 
					
					//---------------------------------------------------------	
					//----------------------------------------------------
					tc07: {//inicio
						inicio: {lat: -12.017265776111145, lng:-75.22557199001312},
						final: {lat: -12.143792201876195, lng: -75.16222357749939},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.023541992800752,-75.23913994431496)},
									{location: new google.maps.LatLng(-12.050696666159487,-75.22163450717926)},
									{location: new google.maps.LatLng(-12.063272571318928,-75.21469965577126)},
									{location: new google.maps.LatLng(-12.069215126009086,-75.21542251110077)},
									{location: new google.maps.LatLng(-12.067999137586648,-75.21283820271492)},
									{location: new google.maps.LatLng(-12.074965556717396,-75.20850643515587)},
									{location: new google.maps.LatLng(-12.07432557639306,-75.20681396126747)},
									{location: new google.maps.LatLng(-12.119205428027033,-75.1789391040802)}
								],
						imagen: "https://c5.staticflickr.com/6/5582/30951905172_2f2f59868b_z.jpg",
						datos: 	{
									n_ruta: 'TC-07 (EX TC-06)',
									nombre: 'Saños Grande',
									lorem1: 'Punta',
									lorem2: 'El Tambo',
								}
						  },// fin 
					//---------------------------------------------------------		
					//----------------------------------------------------
					B: {//inicio
						inicio: {lat: -12.040395023687015, lng:-75.19288659095764},
						final: {lat: -12.080319293293782, lng: -75.22973746061325},
						waypts: [ //el numero de waypoints maximo es 8
									{location: new google.maps.LatLng(-12.060951749675294,-75.20772725343704)},
									{location: new google.maps.LatLng(-12.06587193094503,-75.20511880517006)},
									{location: new google.maps.LatLng(-12.06741422313281,-75.20782247185707)},
									{location: new google.maps.LatLng(-12.068500117410059,-75.20729944109917)},
									{location: new google.maps.LatLng(-12.070066000685378,-75.20917430520058)},
									{location: new google.maps.LatLng(-12.07230910600805,-75.21324723958969)},
									{location: new google.maps.LatLng(-12.076202496339,-75.22032558917999)},
									{location: new google.maps.LatLng(-12.080319293293782,-75.22973746061325)}
								],
						imagen: "https://c2.staticflickr.com/6/5604/31398698545_52dc2e5555_z.jpg",
						datos: 	{
									n_ruta: 'B - San Carlos',
									nombre: 'San Carlos',
									lorem1: 'Cajas Chico',
									lorem2: 'Huancayo',
								}
						  },// fin 
					//---------------------------------------------------------		

				}


		
				////////////////////////////////////////////////////////////////////////////////
};// llave que cierra json

