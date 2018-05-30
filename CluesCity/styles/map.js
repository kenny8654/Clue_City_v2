var current = { lat: 22.996950, lng: 120.222417 }   
var flag = 0;
var time = 1800;
var markersList = [];    

$(document).ready(function () {
});

function onSubmitButtonClicked(){
  event.preventDefault();
  var formData = new FormData($('#upload_form')[0]);
  console.log('post');
  $.ajax({
    url : '/upload',
    type : 'post',
    data : formData,
    success : function(data){
      $('#upload_response').text(data);
      if(data == "similar"){
        document.getElementById('success').style.visibility = 'visible'
      }
      else{
        document.getElementById('try_again').style.visibility = 'visible'
      }
    },  
    cache: false,
    contentType: false,
    processData: false,
  })

  // document.getElementById('btn_clue').style.visibility ='hidden'
  // document.getElementById('submit_image_label').style.visibility ='hidden'
  // document.getElementById('submit_button_label').style.visibility ='hidden'
  // document.getElementById('fb').style.visibility ='visible'
  // document.getElementById('ig').style.visibility ='visible'
  // document.getElementById('twitter').style.visibility ='visible'
  // document.getElementById('big_clue_background').style.background = "";
}

function addMarker(){
  console.log("mark")
    var marker = new google.maps.Marker({
    position:  current,
    map: map,
    icon: '../images/Map/marker.png'
  });
  markersList.push(marker);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: current,
    mapTypeId: 'terrain'
  });
   addMarker()

  var script = document.createElement('script');

  script.src = './data.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  map.data.setStyle(function (feature) {
    var magnitude = feature.getProperty('mag');
    return {
      icon: getCircle(magnitude)
    };
  });
}

//initMap();

function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: 'white',
    strokeWeight: .5
  };
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}

gps = function(){
  navigator.geolocation.getCurrentPosition(successCallback,
    errorCallback,
    { maximumAge: 1000, timeout: 0 });
    setTimeout(gps,2000)
}
gps()

function successCallback(position) {
  var crd = position.coords;
  current.lat = crd.latitude;
  current.lng = crd.longitude;
  console.log('Latitude : ' + current.lat +'Longitude: ' + current.lng);

  if (flag == 0){
    console.log("init")
    initMap()
    flag = 1
  }  
  function clearMarkers(addMarker) {
    console.log("delete")
    for(var i = 0; i < markersList.length; i++) {
      markersList[i].setMap(null);
   }
   addMarker()
  }
  clearMarkers(addMarker) 
}

function errorCallback(error) {
  switch (error.code) {
    case error.TIMEOUT:
      doFallback();
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      break;
  };
}

function doFallback() {

}

function btn_hide_onclick(){
  document.getElementById('btn_clue').style.visibility = 'hidden'
  document.getElementById('big_clues_picture').style.visibility = 'hidden'
  document.getElementById('big_clue_background').style.visibility = 'hidden'
  document.getElementById('btn_hide').style.visibility = 'hidden'
  document.getElementById('small_clue_background').style.visibility = 'visible'
  document.getElementById('small_clue_picture').style.visibility = 'visible'
  document.getElementById('submit_image').style.visibility = 'hidden'
  document.getElementById('submit_image').style.visibility = 'hidden'
  document.getElementById('submit_button').style.visibility = 'hidden'
  document.getElementById('submit_button').style.visibility = 'hidden'
  document.getElementById('try_again').style.visibility = 'hidden'
  document.getElementById('success').style.visibility = 'hidden'
}

function Time()
{
    time -= 1;
    document.getElementById('time').innerHTML= Math.floor(time / 60) +":" +  Math.floor(time % 60);
    if(time!=0)
    {
        setTimeout("Time()",1000);
    }
      
}
Time();

$('#submit_button').click(function(event){
  event.preventDefault();    
  $('#upload_form').submit();
});

function btn_camera_onclick(){
  document.getElementById('btn_clue').style.visibility = 'visible'
  document.getElementById('big_clues_picture').style.visibility = 'visible'
  document.getElementById('big_clue_background').style.visibility = 'visible'
  document.getElementById('btn_hide').style.visibility = 'visible'
  document.getElementById('small_clue_background').style.visibility = 'hidden'
  document.getElementById('small_clue_picture').style.visibility = 'hidden'
  document.getElementById('submit_image_label').style.visibility = 'visible'
  document.getElementById('submit_image').style.visibility = 'visible'
  document.getElementById('submit_button_label').style.visibility = 'visible'
  document.getElementById('submit_button').style.visibility = 'visible'
}
