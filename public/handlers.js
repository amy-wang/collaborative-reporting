function newCaseFile(id, location, date, description) {
  return {
    location: location,
    date: date,
    id: id,
    description: description
  };
}

// sorry
let fb = getFirebaseModule();
function processCase() {
  let caseFile = {};
  caseFile.id = Math.random();
  caseFile.date = new Date();
  getNavigatorModule().getCoords(({latitude, longitude}) => {
    caseFile.location = {lat: latitude, long: longitude};
  });
  caseFile.description = document.getElementById('description').value;
  fb.pushCaseFile(caseFile);
}

function renderSnapshot(snapshot) {
  var snap = snapshot.val() || {};

  var cases = document.getElementById('cases');
  var asdf = '';

  Object.keys(snap).forEach(function(key) {
    var current = snap[key];
    asdf += 'Case ID: ' + current.id + '<br>Location: ' + current.location + '<br>Date:' + current.date + '<br>Description: ' + current.description + '<br><br>';
  });
  cases.innerHTML = asdf;
}

//Main initialization of app.
function init() {
  let storage = firebase.storage();
  let fileDrop = document.getElementById('file-drop');
  
  let fb = getFirebaseModule();
  fileDrop.addEventListener('change', () => {
    fb.uploadFile(fileDrop);
  });
  fb.onDatabaseChange(renderSnapshot);
}

init();
