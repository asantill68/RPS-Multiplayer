//Display current time on HTML id = currrent-time
function displayRealTime() {
    setInterval(function(){
        $('#current-time').html(moment().format('hh:mm A'))
      }, 1000);
}
displayRealTime();

//SETUP Global VARIABLES
//============================================================
var trnName     = '';
var trnDest     = '';
var ftTime      = '';
var trnFreq     = '';
var nxtArrival  = '';
var minAway     = '';

// jQuery global Variables
var jqTrnName = $('#trnInput');
var jqTrnDest = $('#destInput');

//Form validation for Time using jQuery Mask plugin
//var jqftTime = $('#ftTimeInput').mask('00:00');
//var jqFreq = $('#frqInput').mask('00');

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBEje8-MaenYt-LkF6Q2x6qzNhBzKgTvB8",
    authDomain: "train-20e09.firebaseapp.com",
    databaseURL: "https://train-20e09.firebaseio.com",
    projectId: "train-20e09",
    storageBucket: "train-20e09.appspot.com",
    messagingSenderId: "713055950864",
    appId: "1:713055950864:web:e082cabd17a53fbbe51295",
    measurementId: "G-G58F2ZMYHN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();
database.ref('/train').on('child_added', function (snapshop){
    var trnDiff = 0;
    var trnRemainder = 0;
    var minutesTilArrival = '';
    var nextTrnTime = '';
    var frequency = snapshop.val().frequency;

    //Compute difference in time from current time and first train sing UNIX time stamp, store in var and convert to minutes
    trnDiff = moment().dif(moment.unix(snapshot.val().time), 'minutes');
    //Get remainder of time by using moderator with the frequency and time differences, store in var
    trnRemainder = trnDiff % frequency;
    //Subtract the remainder from the frequency, store in var
    minutesTilArrival = frequency - trainRemainder;
    //Add minutes tilArrival to now, to find next train and convert to standard format
    nextTrnTime = moment().add(minutesTilArrival, 'm').format('hh:mm A');

    //Append to the table of trains, inside tbody, with a new row of the train data
    $('#schedule-body').append(
        '<tr><td>' + snapshot.val().trnName + '</td>' +
        '<td>' + snapshot.val().trnDest + '</td>' +
        '<td>' + trnFreq + '</td>' +
        '<td>' + minutesTilArrival + '</td>' +
        '<td>' + nextTrnTime + '</td></tr>'
    );
});
//FUCTIONS
//============================================================

// RETREIVE USER INPTS AND CONVERT TO VARS
var storeInputs = function(e){
    e.preventDefault();

    trnName = jqTrnName.val().trim();
    trnDest    = jqTrnDest.val().trim();
    ftTime  = moment(jqftTime.val().trim(), 'HH:mm').subtract(1, 'years').format('X');
    freq    = jqFreq.val().trim();

    //Add to Firebase Database
    firebase.database('/train').ref().push({
        trnName:trnName,
        trnDest:trnDest,
        ftTime:ftTime,
        trnFreq:trnFreq,
        nxtArrival:nxtArrival,
        minAway:minAway,
        date_Added:firebase.database.ServerValue.TIMESTAMP
     });

     //Alert that train was added
     alert('Train Successfully Added!');

     //Empty form once submitted
     jqTrnName.val('');
     jqTrnDest.val('');
     jqftTime.val('');
     jqFreq.val('');     
};
//Calls StoreInputs function if submit button clicked




