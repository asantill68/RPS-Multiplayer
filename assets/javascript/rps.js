//Set up and initialize FireBase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCz7Ea9WQd9-pFEZ_xGkBF2ZjMML1xNxfE",
    authDomain: "trainschedule-30484.firebaseapp.com",
    databaseURL: "https://trainschedule-30484.firebaseio.com",
    projectId: "trainschedule-30484",
    storageBucket: "trainschedule-30484.appspot.com",
    messagingSenderId: "894273759113",
    appId: "1:894273759113:web:c53426872cf628e6256358"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //SETUP VARIABLES
//============================================================
var trnName = ' ';
var dest    = ' ';
var ftTime  = 0;
var freq    = 0;

//FUCTIONS
//============================================================

//MAIN PROCESSES Function calls
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

// 2  USE THOSE VARS TO RUN AN AJAZ CALL TO
// 3. BREAK DOWN THE OBJECT INTO USABLE FIELS
// 4. DYNAMICALLY GENERATE HTML CONTENT

// 5. DEALING WITH "EDGE CASES" -- BUGS OR SITUATIONS THAT ARE NOT INTUITIVE