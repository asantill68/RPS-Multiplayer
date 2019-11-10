// Check for connection via console.log
$('#addTrain').on('click', function(){
    event.preventDefault();
    console.log('Connect:  Lets do this!!  again...');
})

//Display current time on HTML id = currrent-time
function displayRealTime() {
    setInterval(function(){
        $('#current-time').html(moment().format('hh:mm A'))
      }, 1000);
}
displayRealTime();

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAv4ArSJMPpPQczx5uy31zsEuSlP36bpWM",
    authDomain: "three-73c5f.firebaseapp.com",
    databaseURL: "https://three-73c5f.firebaseio.com",
    projectId: "three-73c5f",
    storageBucket: "three-73c5f.appspot.com",
    messagingSenderId: "542043057830",
    appId: "1:542043057830:web:b8873689966900f4e40e67",
    measurementId: "G-JL892KNZG1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Create firebase shortcut
  var database = firebase.database();

//Global Variables
var name     = '';
var dest     = '';
var fTrnTime = '';
var frq      = '';

// JQuery shortcut
var jqName      = $('#nameInp');
var jqDest      = $('#destInp');
var jqfTrnTime  = $('#ftTimeInp');
var jqFrq       = $('#frqInp');

//Collect data from form via click event id = addTrain
$('#addTrain').on('click', function(){
    event.preventDefault();
//Create var using jq shortcut
    var name = jqName.val().trim();
    var dest = jqDest.val().trim();
    var fTrnTime = jqfTrnTime.val().trim();
    var frq = jqFrq.val().trim(); 
// Console log each var (QC)
    console.log('Train Name:  ' + name);
    console.log('Destination:  ' + dest);
    console.log('First Train Time:  ' + fTrnTime);
    console.log('Frequency:  ' + frq);

// Push adds new data continuously into firebase .set replaces data
    database.ref().push({
        name:name,
        dest:dest,
        fTrnTime:fTrnTime,
        frq:frq,
        dateAdded:firebase.database.ServerValue.TIMESTAMP
    });

    // Alert that train was added successfully
    alert('Train was added successfully!')

    // Empty form once it has been submitter
    jqName.val('');
    jqDest.val('');
    jqfTrnTime.val('');
    jqFrq.val('');

});



//Firebase Listener that gets all data and loads all members in to tbody-element class=table-display
database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().frq);
    // Create Var to calculate data
        //var trainDiff = 0;
        //trainDiff = moment().diff(moment.unix(snapshot.val().time), 'minutes');


    // Append data to table inside element tbody class = table-display
        $('table-display').append(
            "<tr><td>" + snapshot.val().name + "</td>" +
            "<td>" + snapshot.val().dest + "</td>" +
            "<td>" + frq + "</td></tr>"
            // "<td>" + minutesTillArrival + "</td>" +
            // "<td>" + nextTrainTime + "  " + "</td>"
        );   
});


