// Initialize Firebase
var config = {
	  apiKey: "AIzaSyDazF59Kjgy_Cmf1Ls9Cu_UeInFio1FLeY",
	  authDomain: "week7hw-91336.firebaseapp.com",
	  databaseURL: "https://week7hw-91336.firebaseio.com",
	  storageBucket: "week7hw-91336.appspot.com",
	};
firebase.initializeApp(config);

// Create a variable to reference the database
var dataRef = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstT = 0;
var frequency = 0;



// FUNCTIONS
// =========================================

// MAIN PROCESSES
// =========================================

$('#searchBtn').on('click', function() {

	var name = $('#name').val().trim();
	var destination = $('#destination').val().trim();
	var firstT = $('#frequency').val().trim();
	var frequency = $('#rate').val().trim();
	

	trainName = name;
	destination = destination;
	firstT = firstT;
	frequency = frequency;

	console.log(name);
	console.log(destination);
	console.log(firstT);
	console.log(frequency);


	dataRef.ref().push( {
		name: name,
		destination: destination,
		firstT: firstT,
		frequency: frequency
	});

	return false;

});

//Firebase watcher + initial loader HINT: .on("value")
dataRef.ref().on("child_added", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().role);
    console.log(snapshot.val().start);
    console.log(snapshot.val().mrate);

   // Change the HTML to reflect
       var $div = $("<div>");
       var $name = $("<h4 id='nameDisplay'>" + childSnapshot.val().name + "</h4>");
       var $role = $("<h4 id='roleDisplay'>" + childSnapshot.val().role + "</h4>");
       var $start = $("<h4 id='startDisplay'>" + childSnapshot.val().start + "</h4>");
       var $mrate = $("<h4 id='monthsDisplay'>" + childSnapshot.val().mrate + "</h4>");

	   var $work = $("<h4 id='workDisplay'>" + rate*2 + "</h4>");
       $("#nameDisplay").append($div).append($name);
	   $("#roleDisplay").append($div).append($role);
	   $("#startDisplay").append($div).append($start);
	   $("#monthsDisplay").append($div).append($mrate);

// Handle the errors
}, function(errorObject){

    console.log("Errors handled: " + errorObject.code)
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
	// Change the HTML to reflect
	$("#newEntry").append("<tr>" + "<br>" + "<td>" + snapshot.val().name + "</td>" + "<br>" + "<td>" + snapshot.val().role + "</td>" + "<br>" + "<td>" + snapshot.val().start + "</td>" + "<br>" + "<td>" + "</td>" + "<td>" + snapshot.val().mrate + "</td>" + "<td>" + "</td>" + "</tr>");
})
