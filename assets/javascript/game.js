
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDazF59Kjgy_Cmf1Ls9Cu_UeInFio1FLeY",
    authDomain: "week7hw-91336.firebaseapp.com",
    databaseURL: "https://week7hw-91336.firebaseio.com",
    storageBucket: "week7hw-91336.appspot.com",
  };
  firebase.initializeApp(config);


// Create a variable to reference the database
var database = firebase.database();

// Initial Values var trainName = ""; var destination = ""; var frequency = 0;
var nextT = 0; var minTil = 0;


$('#submit').on('click', function() {

	var name = $('#name').val().trim();
	var dest = $('#destinationInput').val().trim();
	var freq = $('#frequencyInput').val().trim();
	var firstT = $('#firstTInput').val().trim();

	database.ref().push( {
		name: name,
		dest: dest,
		freq: freq,
		firstT: firstT,
	});

	$("#name").val("");
	$("#destinationInput").val("");
	$("#frequencyInput").val("");
	$("#firstTInput").val("");

	return false;

});

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // Log everything that's coming out of childSnapshot
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().freq);
	console.log(childSnapshot.val().firstT);
   

   // Change the HTML to reflect
	var $div = $("<div>");
    var $name = $("<h4 id='nameDisplay'>" + childSnapshot.val().name + "</h4>");
    var $dest = $("<h4 id='destDisplay'>" + childSnapshot.val().dest + "</h4>");
    var $freq = $("<h4 id='freqDisplay'>" + childSnapshot.val().freq + "</h4>");
	var $nextT = $("<h4 id='nextTDisplay'>" + childSnapshot.val().nextT + "</h4>");
	var $minTil = $("<h4 id='minTilDisplay'>" + childSnapshot.val().minTil + "</h4>");
	
	var tFrequency = childSnapshot.val().freq;
	var firstTime = childSnapshot.val().firstT;

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

	//next trainx
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("ARRIVAL TIME: "+ moment(nextTrain).format("hh:mm"));

         

	   

	// Change the HTML to reflect
	$("#newEntry").append("<tr><br><td>" + childSnapshot.val().name + "</td><br><td>" + childSnapshot.val().dest + "</td><br><td>" + childSnapshot.val().freq + "</td><br><td>" + moment(nextTrain).format("hh:mm") + "</td><br><td>" + tMinutesTillTrain + "</td>");
})



database.ref().orderByChild("dateAdded").limitToLast(7).on("child_added", function(childSnapshot){

	// Handle the errors
}, function(errorObject){

    console.log("Errors handled: " + errorObject.code)
});






