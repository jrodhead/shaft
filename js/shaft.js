var options = []; // array that will store all added options

function resetChoice() { //reset create-choice for faster input
  var blank = document.getElementById('create-choice');
  blank.value = '';
}

function errBox(errText, errPar) { //error display
  var errBox = document.createElement('div');
  errBox.className = 'error';
  errBox.innerHTML = '<p>' + errText + '</p>';
  var refChild = errPar.firstChild;
  errPar.insertBefore(errBox, refChild);
}

function attention(elem, className) { //add a class then remove it after a set time
  $(elem).addClass(className);
  setTimeout(function() {$(elem).removeClass(className)}, 500);
}

function addOption() { //get create-choice input value and add to options array
  var manadd = document.getElementById('create-choice');
  var optElem = document.getElementById('options');
  var errPar = document.getElementById('options');
  if (manadd.value==='') {
    attention(document.getElementById('new-item'), 'error');
    errBox('Whoops! Please type something into the input box to add it to your list.', errPar);
  } else {
    options.push({'id':manadd.value,'type':'manual','name':manadd.value});
    ga('send', 'event', 'Add Option', 'Submit', manadd.value); //Google Analytics event tracking
    showOptions();
    var optElem = document.getElementById('options');
    optElem.scrollIntoView(false);
  }
};

function showOptions() { //display a list of items in the options array
  var optionList = '<ul>';
  for (let listItem of options) {
    optionList += '<li><span class="name">' + listItem.name + '</span><span class="remove" id="' + listItem.id + '"><i class="material-icons">remove_circle</i></span></li>'; // new
  };
  optionList += '</ul>';
  document.getElementById('options').innerHTML = optionList;
  removers();
  resetChoice();
}

function removers() { //loop through remove icons and add removeOption function to that item
  var removers = document.getElementsByClassName('remove');
  for (var i=0; i < removers.length; i++) {
    removers[i].addEventListener('click', function() {
      removeOption(options, 'id', this.id);
    });
  };
}

function removeOption(arr, id, value) { //remove options from list
  var i = arr.length;
  while(i--){
    if( arr[i]
       && arr[i].hasOwnProperty(id)
       && (arguments.length > 2 && arr[i][id] === value ) ){
        arr.splice(i,1);
    }
  };
  showOptions();
}

function shaftAnimate() { //randomize and animate to display decision from options array
  var choose = document.getElementById('choice');
  var choice = options[Math.floor(Math.random() * options.length)];
  choose.innerHTML = '<i class="material-icons close">close</i><div id="countdown"></div>';
  choose.className = 'active';
  $('.close').click(function() {
    $(this).removeClass('active').addClass('hide');
    $('#choice').removeClass('active').addClass('hide');
  })
  var countdown = document.getElementById('countdown');
  function step1() {
    countdown.innerHTML = '<span>The winner is...</span>';
  };
  function step2() {
    countdown.innerHTML = '<span id="winner">' + choice.name + '!</span';
  };
  setTimeout(step1,0);
  setTimeout(step2,1000);
};

function shaft() { //initiate decision and error handling
  var errPar = document.getElementById('options');
  if (options.length > 1) {
    shaftAnimate();
  } else if (options.length === 1) {
    errBox('This would be more fun if there were multiple options.', errPar);
  } else if (options != null) {
    errBox('Whoops! Use the input box above to enter at least 2 options.', errPar);
  } else {
    errBox('Something went wrong... try again?', errPar);
  };
};

$("#create-choice").on('keyup', function (e) {
  if (e.keyCode == 13) {
    addOption();
  }
});
document.getElementById('add').addEventListener('click', addOption);
document.getElementById('shaft').addEventListener('click', shaft);
