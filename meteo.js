function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; domain=arawn.fr/sncf; path=/; secure";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function changement(train1){ 

	var Retard = "OK";
	var Image = "images/approved.png";

	if (train1 == "SIGNIFICANT_DELAYS") {
  		Retard = "En retard";
		Image = "images/exclamation.png";
	}

	if (train1 == "DETOUR") {
  		Retard = "Annulé";
		Image = "images/false.png";		
	}

	if (train1 == "NO_SERVICE") {
  		Retard = "Annulé";
		Image = "images/false.png";
	}
	
	
	return {Ret: Retard, Img: Image};
	
}

var callBackGetSuccess = function(data) {
	//console.log("donnees api", data);

	var Train_1 = document.getElementById("Train1");
	var Train_2 = document.getElementById("Train2");
	var Train_3 = document.getElementById("Train3");
	
	var Heure_Train1 = data.journeys[0].departure_date_time.substr(9, 2);
	var Minute_Train1 = data.journeys[0].departure_date_time.substr(11, 2);
	
	var Heure_Train2 = data.journeys[1].departure_date_time.substr(9, 2);
	var Minute_Train2 = data.journeys[1].departure_date_time.substr(11, 2);
	
	var Heure_Train3 = data.journeys[2].departure_date_time.substr(9, 2);
	var Minute_Train3 = data.journeys[2].departure_date_time.substr(11, 2);
	
	var Result1 = data.journeys[0].status;
	var Result2 = data.journeys[1].status;
	var Result3 = data.journeys[2].status;
	
	var Affichage_1 = changement(Result1);
	var Affichage_2 = changement(Result2);
	var Affichage_3 = changement(Result3);

	Train_1.innerHTML = "Train de " + Heure_Train1 + "h" + Minute_Train1 + " : " + Affichage_1.Ret;
	Train_2.innerHTML = "Train de " + Heure_Train2 + "h" + Minute_Train2 + " : " + Affichage_2.Ret;
	Train_3.innerHTML = "Train de " + Heure_Train3 + "h" + Minute_Train3 + " : " + Affichage_3.Ret;
	
	var Image_1 = document.getElementById("Image1");
	var Image_2 = document.getElementById("Image2");
	var Image_3 = document.getElementById("Image3");
	
	Image_1.setAttribute("src", Affichage_1.Img);
	Image_2.setAttribute("src", Affichage_2.Img);
	Image_3.setAttribute("src", Affichage_3.Img);
	//console.log(Affichage_1.Img, Affichage_2.Img, Affichage_3.Img); 
}

function ceciestuntestd()

{
	var Token = document.getElementById("texte1").value;
	document.cookie = "Token=" + Token +"; path=/; samesite=lax ; max-age=907200"; 
	document.location.reload();
	//console.log(Token);

}

function buttonClickGET()
{
	
	Date_Heure = window.localStorage.getItem("Date_Heure");
	
	Gare_Depart = window.localStorage.getItem("Gare_Depart");

	Gare_Arrivee = window.localStorage.getItem("Gare_Arrivee");
	
	if (Date_Heure == null)
	{
		Date_Heure = "0730";
	}
	
	if (Gare_Depart == null)
	{
		Gare_Depart = "3A87723718";
	}
	
	if (Gare_Arrivee == null)
	{
		Gare_Arrivee = "3A87723197";
	}
	
	
	document.getElementById("Token1").style.display = "none";
	//var Date1 = document.getElementById("Date");
	var ladate=new Date();
	
	var Date_Jour = (   ladate.getFullYear() + "" +(ladate.getMonth()+1)+ "" + ladate.getDate()   );

	//Date1.innerHTML = Date_Jour;

	var cookie = readCookie("Token");
	//console.log("Le Token est : " + cookie);
	
	
	var url = "https://@api.sncf.com/v1/coverage/sncf/journeys?key="+ cookie + "&from=stop_area%3AOCE%3ASA%" + Gare_Depart + "&to=stop_area%3AOCE%3ASA%" + Gare_Arrivee + "&datetime=" + Date_Jour + "T" + Date_Heure + "00&datetime_represents=departure&min_nb_journeys=3&";
		
	$.get(url, callBackGetSuccess).done(function() {
		
	})
	.fail(function(){
		var Erreur1 = document.getElementById("Erreur");
		Erreur1.innerHTML = "Erreur de token";
		document.getElementById("Token1").style.display = "block";
	})
	.always(function(){
			
	});
	
}

function switcht()
{
	if (Date_Heure == "0730")
	{
		Date_Heure = "1730";
		window.localStorage.setItem("Date_Heure", "1730");
		window.localStorage.setItem("Gare_Depart", "3A87723197");
		window.localStorage.setItem("Gare_Arrivee", "3A87723718");
		buttonClickGET()
	}
	
	else 
	{
		Date_Heure = "0730";
		window.localStorage.setItem("Date_Heure", "0730");
		window.localStorage.setItem("Gare_Depart", "3A87723718");
		window.localStorage.setItem("Gare_Arrivee", "3A87723197");
		buttonClickGET()
	}	
	
}

 
	





