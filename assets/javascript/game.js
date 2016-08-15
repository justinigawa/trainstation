
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
var frequency = 0;
var nextArrival = 0;
var minTil = 0;


$('#searchBtn').on('click', function() {

	var name = $('#name').val().trim();
	var dest = $('#destinationInput').val().trim();
	var freq = $('#frequencyInput').val().trim();
	
	trainName = name;
	destination = dest;
	frequency = freq;
	

	console.log(name);
	console.log(dest);
	console.log(freq);


	dataRef.ref().push( {
		name: name,
		dest: dest,
		freq: freq,
		
	});

	return false;

});

//Firebase watcher + initial loader HINT: .on("value")
dataRef.ref().on("child_added", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().freq);
   

   // Change the HTML to reflect
       var $div = $("<div>");
       var $name = $("<h4 id='nameDisplay'>" + childSnapshot.val().name + "</h4>");
       var $dest = $("<h4 id='destDisplay'>" + childSnapshot.val().dest + "</h4>");
       var $freq = $("<h4 id='freqDisplay'>" + childSnapshot.val().freq + "</h4>");
       

	   
       $("#nameDisplay").append($div).append($name);
	   $("#destDisplay").append($div).append($dest);
	   $("#freqDisplay").append($div).append($freq);
	   

// Handle the errors
}, function(errorObject){

    console.log("Errors handled: " + errorObject.code)
});

dataRef.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot){
	// Change the HTML to reflect
	$("#newEntry").append("<tr>" + "<br>" + "<td>" + snapshot.val().name + "</td>" + "<br>" + "<td>" + snapshot.val().dest + "</td>" + "<br>" + "<td>" + snapshot.val().freq + "</td>" + "<br>" + "<td>" + "</td>" + "<td>");
})


var tFrequency = 15;
var firstTime = "6:00";

//first time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1,"years");
console.log(firstTimeConverted);


//current time
var currentTime= moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//diference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: "+ diffTime);

//time apart(remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

//minute unitl train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//next train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: "+ moment(nextTrain).format("hh:mm"));


