var manopt = [];
var placeopt = [];
var options = []; // array that will store all added options

//get create-choice input value and add to options array
function addOption() {
  var manadd = document.getElementById('create-choice');
  var error = document.getElementById('new-item');
  var optElem = document.getElementById('options');
  if (manadd.value==='') {
    $(error).addClass('error');
  } else {
    $(error).removeClass('error');
    manopt.push(manadd.value);
    options = manopt.concat(placeopt); //combine manual/place options to options array
    showOptions();
    optElem.scrollIntoView(false);
  }
};

//remove options from list
function removeOption() {
  var id = this.getAttribute('id');
  options.splice(id, 1);
  manopt.splice(id, 1);
  showOptions();
  return false;
};

//display a list of items in the options array
function showOptions() {
  var optionList = '<ul>';
  for(var i=0; i<options.length; i++) {
    optionList += '<li><span class="name">' + options[i] + '</span><span class="remove" id="' + i + '"><i class="material-icons">remove_circle</i></span></li>';
  };
  optionList += '</ul>';
  document.getElementById('options').innerHTML = optionList;
  var removers = document.getElementsByClassName('remove');
  for (var i=0; i < removers.length; i++) {
    removers[i].addEventListener('click', removeOption);
  };
  var blank = document.getElementById('create-choice');
  blank.value = '';
};

//randomize and animate to display decision from options array
function shaftAnimate() {
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
    countdown.innerHTML = '<span id="winner">' + choice + '!</span';
  };
  setTimeout(step1,0);
  setTimeout(step2,1000);
};

//initiate decision and error handling
function shaft() {
  var errors = document.getElementById('options');
  if (options.length > 1) {
    shaftAnimate();
  } else if (options.length === 1) {
    errors.innerHTML = '<p>This would be more fun if there were multiple choices.</p>'
  } else if (options != null) {
    errors.innerHTML = '<p>add something.</p>';
  } else {
    errors.innerHTML = '<p>Something went wrong... try again?</p>';
  };
};

$("#create-choice").on('keyup', function (e) {
  if (e.keyCode == 13) {
    addOption();
  }
});
document.getElementById('add').addEventListener('click', addOption);
document.getElementById('shaft').addEventListener('click', shaft);

//add class when scrolled so input can be sticky
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 40) {
    $("body").addClass("scrolled");
  } else {
    $("body").removeClass("scrolled");
  }
});
