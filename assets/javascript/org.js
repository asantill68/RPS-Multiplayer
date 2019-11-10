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

  function displayRealTime() {
    setInterval(function(){
        $('#current-time').html(moment().format('hh:mm A'))
      }, 1000);
    }
    displayRealTime();

  //SETUP VARIABLES
//============================================================
var trnName = ' ';
var dest    = ' ';
var ftTime  = 0;
var freq    = 0;

//FUCTIONS
//============================================================

// 1. RETREIVE USER INPTS AND CONVERT TO VARS
$('#addTrain').on('click', function(e){
    e.preventDefault();

    var trnName = $('#trnInput').val().trim();
    var dest    = $('#destInput').val().trim();
    var ftTime  = $('#ftTimeInput').val().trim();
    var freq    = $('#frqInput').val().trim();
        //console.log('Name '+ trnName + 'destination '+ dest + 'frist time ' + ftTime + 'frequency '+ freq);
    firebase.database().ref().push({
        trnName:trnName,
        dest:dest,
        ftTime:ftTime,
        freq:freq,
        dateAdded:firebase.database.ServerValue.TIMESTAMP
    });
});



// 4. DYNAMICALLY GENERATE HTML CONTENT
//Firebase Listener that gets all data and loads all members in to tbody-element class=display
firebase.database().ref().on("child_added", function(snapshot){
    $(".display").append(snapshot.val().trnName);

});

//Post data on the html
firebase.database().ref().on("child_added", function(snapshot){
    $('#name').html(snapshot.val().trnName);
    $("#dest").html(snapshot.val().dest);
    $("#freq").html(snapshot.val().freq);
    // $("#ft").html(snapshot.val().ftTime);
    // $("#tbd").html(snapshot.val().ftTime);
});


//The orderByChild selects the dateAdded var and limits to limitToLast(1) makes sure the last user added via time
//  firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added",function(snapshot){
//      $("#name").html(snapshot.val().trnName);
    // $("#emailDisplay").html(snapshot.val().email);
    // $("#ageDisplay").html(snapshot.val().age);
    // $("#commentDisplay").html(snapshot.val().comment);
//  })



// 5. DEALING WITH "EDGE CASES" -- BUGS OR SITUATIONS THAT ARE NO Intuitive