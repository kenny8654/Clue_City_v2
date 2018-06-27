var current = { lat: 22.996950, lng: 120.222417 }
var flag = 0;
var time = 1800;
var is_big_clue = 0;
var markersList = [];
var clue_index = 0;//系館
var success_or_failure = 0;
var score = 0;


function addMarker() {
  console.log("mark")
  var marker = new google.maps.Marker({
    position: current,
    map: map,
    icon: './images/Map/marker.png'
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

  google.maps.event.addListener(map, 'zoom_changed', function () {
    console.log("zoom change")
    map.data.setStyle(function (feature) {
      var magnitude = feature.getProperty('mag');
      return {
        icon: getCircle(magnitude)
      };
    });
  });
}

function getCircle(magnitude) {
  var zoom = map.getZoom();
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .2,
    //scale: Math.pow(2, magnitude) / 2,
    scale: Math.pow(2, magnitude + zoom - 17) / 2,
    strokeColor: 'white',
    strokeWeight: .5

  };
}



function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}

gps = function () {
  navigator.geolocation.getCurrentPosition(successCallback,
    errorCallback,
    { maximumAge: 1000, timeout: 0 });
  setTimeout(gps, 2000)
}
gps()

function successCallback(position) {
  var crd = position.coords;
  current.lat = crd.latitude;
  current.lng = crd.longitude;
  console.log('Latitude : ' + current.lat + 'Longitude: ' + current.lng);

  if (flag == 0) {
    console.log("init")
    initMap()
    flag = 1
  }
  function clearMarkers(addMarker) {
    console.log("delete")
    for (var i = 0; i < markersList.length; i++) {
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

function Time() {

  clue();
  time -= 1;
  if (Math.floor(time % 60) < 10)
    document.getElementById('time').innerHTML = Math.floor(time / 60) + ":0" + Math.floor(time % 60);
  else
    document.getElementById('time').innerHTML = Math.floor(time / 60) + ":" + Math.floor(time % 60);
  if (time != 0) {
    setTimeout("Time()", 1000);
  }
}
Time();

function btn_hide_onclick() {
  console.log("click")
  document.getElementById('btn_clue').style.visibility = 'hidden'
  document.getElementById('big_clue_picture').style.visibility = 'hidden'
  document.getElementById('big_clue_background').style.visibility = 'hidden'
  document.getElementById('btn_hide').style.visibility = 'hidden'
  document.getElementById('small_clue_background').style.visibility = 'visible'
  document.getElementById('small_clue_picture').style.visibility = 'visible'
  document.getElementById('submit_image').style.visibility = 'hidden'
  document.getElementById('submit_image').style.visibility = 'hidden'
  document.getElementById('submit_button').style.visibility = 'hidden'
  document.getElementById('submit_button').style.visibility = 'hidden'
  document.getElementById('success').style.visibility = 'hidden'
  document.getElementById('submit_image_label').style.visibility = 'hidden'
  document.getElementById('submit_button_label').style.visibility = 'hidden'
  document.getElementById('message').style.visibility = 'hidden'
  document.getElementById('success_message').style.visibility = 'hidden'

}

function btn_camera_onclick() {
  document.getElementById('btn_clue').style.visibility = 'visible'
  document.getElementById('big_clue_picture').style.visibility = 'visible'
  document.getElementById('big_clue_background').style.visibility = 'visible'
  document.getElementById('btn_hide').style.visibility = 'visible'
  document.getElementById('small_clue_background').style.visibility = 'hidden'
  document.getElementById('small_clue_picture').style.visibility = 'hidden'
  document.getElementById('submit_image').style.visibility = 'visible'
  document.getElementById('submit_button').style.visibility = 'visible'
  document.getElementById('submit_image_label').style.visibility = 'visible'
  document.getElementById('submit_button_label').style.visibility = 'visible'
}

function small_clue_onclick() {
  is_big_clue = 1
  document.getElementById('btn_clue').style.visibility = 'visible'
  document.getElementById('big_clue_picture').style.visibility = 'visible'
  document.getElementById('big_clue_background').style.visibility = 'visible'
  document.getElementById('btn_hide').style.visibility = 'visible'
  document.getElementById('small_clue_background').style.visibility = 'hidden'
  document.getElementById('small_clue_picture').style.visibility = 'hidden'
  //document.getElementById('submit_image').style.visibility = 'visible'
  //document.getElementById('submit_button').style.visibility = 'visible'
  document.getElementById('submit_image_label').style.visibility = 'visible'
  document.getElementById('submit_button_label').style.visibility = 'visible'
}

function success_message_onclick() {
  setTimeout(function () {
    document.getElementById("success_clue_picture").src = "./target.jpg";
  }, 1000)
  document.getElementById('success').style.visibility = 'hidden'
  document.getElementById('success_message').style.visibility = 'hidden'
  if (success_or_failure == 1) {
    for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
      document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
    for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
      document.getElementsByClassName('small_clue')[i].style.visibility = 'hidden'
    document.getElementById('success_background').style.visibility = 'visible'
    document.getElementById('btn_exit').style.visibility = 'visible'
    document.getElementById('success_clue_picture').style.visibility = 'visible'
    document.getElementById('success_paragraph').style.visibility = 'visible'
    document.getElementById('btn_share').style.visibility = 'visible'
  }
  else {
    document.getElementById('submit_image_label').style.visibility = 'visible'
    document.getElementById('submit_button_label').style.visibility = 'visible'
    document.getElementById('btn_clue').style.visibility = 'visible'
    document.getElementById('big_clue_picture').style.visibility = 'visible'
    document.getElementById('big_clue_background').style.visibility = 'visible'
    document.getElementById('btn_hide').style.visibility = 'visible'
    document.getElementById('small_clue_background').style.visibility = 'hidden'
    document.getElementById('small_clue_picture').style.visibility = 'hidden'
  }
}

function btn_exit() {
  document.getElementById('success_background').style.visibility = 'hidden'
  document.getElementById('btn_exit').style.visibility = 'hidden'
  document.getElementById('success_clue_picture').style.visibility = 'hidden'
  document.getElementById('success_paragraph').style.visibility = 'hidden'
  document.getElementById('share_word').style.visibility = 'hidden'
  document.getElementById('btn_share').style.visibility = 'hidden'
  document.getElementById('btn_share_submit').style.visibility = 'hidden'

}

function setting_onclick() {
  document.getElementById('setting_background').style.visibility = 'visible'
  document.getElementById('p_end_game').style.visibility = 'visible'
  document.getElementById('btn_yes').style.visibility = 'visible'
  document.getElementById('btn_no').style.visibility = 'visible'

}

function btn_yes() {
  var facebook_id = document.getElementById("facebook_id").textContent
  $.ajax({
    type: 'post',
    url: './map/tellscore',
    data: {
      name: score,
      id: facebook_id,
    }
  });
  user_score();
  PassScore();
  document.location.href = "https://luffy.ee.ncku.edu.tw:10047/score";
}

function btn_no() {
  document.getElementById('setting_background').style.visibility = 'hidden'
  document.getElementById('p_end_game').style.visibility = 'hidden'
  document.getElementById('btn_yes').style.visibility = 'hidden'
  document.getElementById('btn_no').style.visibility = 'hidden'

}

function btn_share_onclick() {
  console.log("click share")
  document.getElementById('success_paragraph').style.visibility = 'hidden'
  document.getElementById('share_word').style.visibility = 'visible'
  document.getElementById('btn_share_submit').style.visibility = 'visible'
}

function btn_share_submit_onclick() {
  Message = document.getElementById("share_word").value;
  facebook_id = document.getElementById("facebook_id").textContent;
  document.getElementById('success_paragraph').style.visibility = 'hidden'
  document.getElementById('share_word').style.visibility = 'hidden'
  document.getElementById('btn_share_submit').style.visibility = 'hidden'
  document.getElementById('btn_exit').style.visibility = 'hidden'
  document.getElementById('success_clue_picture').style.visibility = 'hidden'
  document.getElementById('btn_share').style.visibility = 'hidden'
  document.getElementById('success_background').style.visibility = 'hidden'


  for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
    document.getElementsByClassName('small_clue')[i].style.visibility = 'hidden'
  for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
    document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'

  $.ajax({
    url: './map/createAlbum',
    type: 'post',
    data: {
      ID: facebook_id,
      message: Message
    },
    dataType: 'text',
    success: function () {
      console.log("album_success!!!!!!!!!");
    },
    error: function () {
      console.log("album_error!!!!!!!!!");
    }
  })

}

function clue() {
  console.log("clue")
  if (is_big_clue == 0) {
    if (current.lng <= 120.223217 && current.lng >= 120.221617 && current.lat <= 22.997750 && current.lat >= 22.996150) {//系館
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue0.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue0.jpg"
      clue_index = 0;

    }
    else if (current.lng <= 120.206608 && current.lng >= 120.205608 && current.lat <= 22.989796 && current.lat >= 22.988796) {//德化堂120.206108,22.989296
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue1.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue1.jpg"
      document.getElementById('index').text = 1
      document.getElementById('success_paragraph').text = "龍華派齋友便至安平傳教，建立化善堂。而到了嘉慶十九年（1814年），門徒黃丑集資又建德善堂於臺灣府城內的覆頂金進入日治時期後，德化堂為求自保，與其他許多臺灣寺院一樣加入日本佛教曹洞宗。之後德善堂因開新路而被拆除，遂併入德化堂中。而五年後，德化堂也因為開闢今天的府前路一段而拆除了第一進的部分，將凹字型頭門移到中進，後進的宅居則改為正堂，堂前建四垂亭。"
        
    }
    else if (current.lng <= 120.204716 && current.lng >= 120.203716 && current.lat <= 22.989549 && current.lat >= 22.988549) {//愛國婦人會館(台南創意中心)120.204216,22.989049
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue2.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue2.jpg"
      document.getElementById('index').text = 2
      document.getElementById('success_paragraph').text = "日治時期日本愛國婦人會在臺灣臺南之分部，在當時是主要之婦女團體，成員都是具有一定社會地位之婦女，其宗旨為關心地方建設、從事社會服務、倡導社會團結等，並宣揚大日本帝國愛國思想直到日本戰敗投降為止，在戰後陸續有美國新聞處、紅十字會、市立藝術中心圖書室等，近幾年全面整修過後成為文創中心，繼續靜靜地矗立在府城的一隅。"
        
    }
    else if (current.lng <= 120.203182 && current.lng >= 120.202182 && current.lat <= 22.990201 && current.lat >= 22.989201) {//原台南神社休憩所120.202682,22.989701
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue3.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue3.jpg"
      document.getElementById('index').text = 3
      document.getElementById('success_paragraph').text = "原臺南神社事務所位於忠義國小內，用材造型同似武德殿，座南朝北，呈「」」形平面，外環繞「ㄇ」字型迴廊，一層樓高，屬鋼筋混凝土造，表面皆洗石子處理為主，屋頂為入母屋式。整體由仿階條石洗石子基座、採仿木構造設計屋身及屋頂三部分所組成。南向立面有仿石條窗開口；室內有一小型集會空間。 民國96年進行修護工程，修復團隊在整修工程中發現，布紋面磚的運用已相當少見，神社事務所的地磚是無縫的彩色水泥地磚，是全市古蹟僅有的地磚"
    }
    else if (current.lng <= 120.201433 && current.lng >= 120.200433 && current.lat <= 22.990112 && current.lat >= 22.989112) {//台南司法博物館120.200933,22.989612
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue4.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue4.jpg"
      document.getElementById('index').text = 4
      document.getElementById('success_paragraph').text = "為日本人在1912年所興建，有日治時期臺灣三大代表建築之美譽，是全臺現存歷史最久的大型法院建築，巴洛克式的風格彷彿置身國外，其在戰後仍繼續當作法院來使用，直到2001年搬遷至安平，而原有之建築則展開整修為司法博物館，開放給大眾共享。"
    }
    else if (current.lng <= 120.203952 && current.lng >= 120.202952 && current.lat <= 22.991147 && current.lat >= 22.990147) {//原台南武德殿120.203452,22.990647
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue5.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue5.jpg"
      document.getElementById('index').text = 5
      document.getElementById('success_paragraph').text = "原臺南武德殿的建築式樣為日本傳統的社殿建築，但材料則為新式材料（鋼筋混凝土、洗石子）。其坐北朝南，二層樓高，左右各寬四開間，而主入口則位於二樓，須爬樓梯方能進入。一樓是各種附屬服務空間，兩側有次入口，而二樓西邊為武道場，東邊為劍道場，而北邊則突出做為祭壇。"
    }
    else if (current.lng <= 120.204995 && current.lng >= 120.203995 && current.lat <= 22.990784 && current.lat >= 22.989784) {//台南孔廟120.204495,22.990284
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue6.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue6.jpg"
      document.getElementById('index').text = 6
    }
    else if (current.lng <= 120.204135 && current.lng >= 120.203135 && current.lat <= 22.991620 && current.lat >= 22.990620) {//台南山林事務所120.203635,22.991120
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue7.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue7.jpg"
      document.getElementById('index').text = 7
    }
    else if (current.lng <= 120.203797 && current.lng >= 120.202797 && current.lat <= 22.991474 && current.lat >= 22.990474) {//友愛天主堂120.203297,22.990974
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue8.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue8.jpg"
      document.getElementById('index').text = 8
    }
    else if (current.lng <= 120.203678 && current.lng >= 120.202678 && current.lat <= 22.991875 && current.lat >= 22.990875) {//擇賢堂120.203178,22.991375
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue9.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue9.jpg"
      document.getElementById('index').text = 9
    }
    else if (current.lng <= 120.204036 && current.lng >= 120.203036 && current.lat <= 22.992137 && current.lat >= 22.991137) {//重慶寺120.203536,22.991637
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue10.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue10.jpg"
      document.getElementById('index').text = 10
    }
    else if (current.lng <= 120.204376 && current.lng >= 120.203376 && current.lat <= 22.992541 && current.lat >= 22.991541) {//原台南州會120.203876,22.992041
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue11.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue11.jpg"
      document.getElementById('index').text = 11
    }
    else if (current.lng <= 120.204976 && current.lng >= 120.203976 && current.lat <= 22.992504 && current.lat >= 22.991504) {//台文館120.204476,22.992004
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue12.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue12.jpg"
      document.getElementById('index').text = 12
    }
    else if (current.lng <= 120.203995 && current.lng >= 120.202995 && current.lat <= 22.992897 && current.lat >= 22.991897) {//報恩堂120.203495,22.992397
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue13.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue13.jpg"
      document.getElementById('index').text = 13
    }
    else if (current.lng <= 120.203437 && current.lng >= 120.202437 && current.lat <= 22.992574 && current.lat >= 22.991574) {//台灣土地銀行120.202937,22.992074
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue14.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue14.jpg"
      document.getElementById('index').text = 14
    }
    else if (current.lng <= 120.202979 && current.lng >= 120.201979 && current.lat <= 22.992269 && current.lat >= 22.991269) {//林百貨120.202479,22.991769
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue15.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue15.jpg"
      document.getElementById('index').text = 15
    }
    else if (current.lng <= 120.201604 && current.lng >= 120.200604 && current.lat <= 22.991946 && current.lat >= 22.990946) {//八吉境道署關帝廳120.201104,22.991446
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue16.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue16.jpg"
      document.getElementById('index').text = 16
    }
    else if (current.lng <= 120.200623 && current.lng >= 120.199623 && current.lat <= 22.991162 && current.lat >= 22.990162) {//鰻丼作120.200123,22.990662
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue17.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue17.jpg"
      document.getElementById('index').text = 17
    }
    else if (current.lng <= 120.200100 && current.lng >= 120.199100 && current.lat <= 22.991939 && current.lat >= 22.990939) {//友愛市場120.199600,22.991439
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue18.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue18.jpg"
      document.getElementById('index').text = 18
    }
    else if (current.lng <= 120.200359 && current.lng >= 120.199359 && current.lat <= 22.992484 && current.lat >= 22.991484) {//總趕宮120.199859,22.991984
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue19.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue19.jpg"
      document.getElementById('index').text = 19
    }
    else if (current.lng <= 120.200205 && current.lng >= 120.199205 && current.lat <= 22.992901 && current.lat >= 22.991901) {//雙全紅茶120.199705,22.992401
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue20.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue20.jpg"
      document.getElementById('index').text = 20
    }
    else if (current.lng <= 120.199402 && current.lng >= 120.198402 && current.lat <= 22.991082 && current.lat >= 22.990082) {//蕭氏節孝坊120.198902,22.990582
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue21.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue21.jpg"
      document.getElementById('index').text = 21
    }
    else if (current.lng <= 120.198429 && current.lng >= 120.197429 && current.lat <= 22.990547 && current.lat >= 22.989547) {//阿堂鹹粥120.197929,22.990047
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue22.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue22.jpg"
      document.getElementById('index').text = 22
    }
    else if (current.lng <= 120.196339 && current.lng >= 120.195339 && current.lat <= 22.988641 && current.lat >= 22.987641) {//南南美術館120.195839,22.988141
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue23.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue23.jpg"
      document.getElementById('index').text = 23
    }
    else if (current.lng <= 120.197208 && current.lng >= 120.196208 && current.lat <= 22.991800 && current.lat >= 22.990800) {//銀波布丁120.196708,22.991300
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue24.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue24.jpg"
      document.getElementById('index').text = 24
    }
    else if (current.lng <= 120.195704 && current.lng >= 120.194704 && current.lat <= 22.992783 && current.lat >= 22.991783) {//南台影城120.195204,22.992283
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue25.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue25.jpg"
      document.getElementById('index').text = 25
    }
    else if (current.lng <= 120.197986 && current.lng >= 120.196986 && current.lat <= 22.994061 && current.lat >= 22.993061) {//邱家小卷米粉120.197486,22.993561
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue26.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue26.jpg"
      document.getElementById('index').text = 26
    }
    else if (current.lng <= 120.198224 && current.lng >= 120.197224 && current.lat <= 22.993832 && current.lat >= 22.992832) {//江水號120.197724,22.993332
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue27.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue27.jpg"
      document.getElementById('index').text = 27
    }
    else if (current.lng <= 120.197378 && current.lng >= 120.196378 && current.lat <= 22.993445 && current.lat >= 22.992445) {//今日戲院120.196878,22.992945
      for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
        document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
      for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
        document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
      document.getElementById('small_clue_picture').src = "./images/Map/clue28.jpg"
      document.getElementById('big_clue_picture').src = "./images/Map/clue28.jpg"
      document.getElementById('index').text = 28
    }



  }



}
clue();

function test() {
  for (var i = 0; i < document.getElementsByClassName('small_clue').length; i++)
    document.getElementsByClassName('small_clue')[i].style.visibility = 'visible'
  for (var i = 0; i < document.getElementsByClassName('big_clue').length; i++)
    document.getElementsByClassName('big_clue')[i].style.visibility = 'hidden'
  document.getElementById('small_clue_picture').src = "./images/Map/clue1.jpg"
  document.getElementById('big_clue_picture').src = "./images/Map/clue1.jpg"
}

//----------Han-----------------//

function onSubmitButtonClicked() {

  document.getElementById("loader").style.visibility = "visible";
  document.getElementById("submit_button_label").style.visibility = "hidden";
  document.getElementById("submit_image_label").style.visibility = "hidden";
  document.getElementById("big_clue_picture").style.visibility = "hidden";
  document.getElementById("btn_hide").style.visibility = "hidden";
  document.getElementById("btn_clue").style.visibility = "hidden";
  document.getElementById("message").style.visibility = "hidden";

  document.getElementById("loader_message").setAttribute('style', 'white-space: pre;');

  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading ."
  }, 750);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . "
  }, 1500);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . "
  }, 2250);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading ."
  }, 3000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . "
  }, 3750);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . "
  }, 4500);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 5250);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 6000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 6750);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 7500);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 8250);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 9000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 9750);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 10500);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 11250);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 12000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 12750);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 13500);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 14250);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 15000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 15750);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 16500);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 17250);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 18000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 18750);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 19500);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 20250);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 21000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 22000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 230000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 24000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 25000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 26000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 27000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 28000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 29000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 30000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 31000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 32000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing ."
  }, 33000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . ."
  }, 34000);
  setTimeout(function () {
    document.getElementById("loader_message").textContent = "Uploading . . . \r\nProcessing . . ."
  }, 35000);

  //updateMessage();


  var file = document.getElementById("submit_image");
  //因為準備用post提交，又因為圖片的內容比較大，所以我們選擇使用formdata來承載數據
  //創建formdata對象
  var formData = new FormData();
  //給formdata對象中放入數據(鍵值對的方式)
  formData.append('file', file.files[0]);
  var clue_index = document.getElementById('index').textContent;
  console.log('開始圖片上傳');
  console.log('index : ' + clue_index)
  $.ajax({
    url: './map/upload',
    type: 'post',
    data: formData,
    dataType: 'text',
    success: function () {
      $.ajax({
        url: './map/runPython',
        type: 'post',
        data: { clueIndex: clue_index },
        dataType: 'text',
        success: function (data) {
          //$('#upload_response').text(data);
          console.log(data)
          document.getElementById("loader").style.visibility = "hidden";
          // document.getElementById("btn_hide").style.visibility = "visible";
          document.getElementById("loader_message").style.visibility = "hidden";

          if (data.trim() == "similar") {
            document.getElementById("success").src = "./images/PhotoSharing/success.png"
            document.getElementById("success_message").src = "./images/PhotoSharing/success-1.png"
            console.log("similar")
            success_or_failure = 1;
            score += 100
            document.getElementById("score_text").textContent = score;

            team_score();


          }
          else {
            document.getElementById("success").src = "./images/PhotoSharing/try_again.png"
            document.getElementById("success_message").src = "./images/PhotoSharing/try_again-1.png"
            console.log("not similar")
            success_or_failure = 0;
          }
          setTimeout(function () {
            document.getElementById("success").style.visibility = "visible";
            document.getElementById("success_message").style.visibility = "visible";
          }, 800);
        },
        error: function () {
          console.log("error!!!!!!!!!")
          onSubmitButtonClicked();
        }
      })
    },
    error: function () {
      console.log("error!!!!!!!!!")
      onSubmitButtonClicked();
    },
    cache: false,
    contentType: false,
    processData: false,
  })
}

function onSelectClicked() {
  console.log("onSelectClicked()")
  setTimeout(function () {
    document.getElementById("message").style.visibility = "visible";
  }, 2500);
}




$(document).ready(function () {
  $('submit_button').on('click', function (e) {
    e.preventDefault();
    //do some other stuff here
  });
  $('upload_form').on('submit', function (e) {
    e.preventDefault();
  });
  $('upload_form').on('get', function (e) {
    e.preventDefault();
    return false;
  });
  $('upload_form').on('post', function (e) {
    e.preventDefault();
    //do some other stuff here
  });
  document.getElementById('index').text = 0;
})

//------------------------------------------------------------------------------------------------------<3

// function update_score() {
//   $.ajax({
//     type: 'post',
//     url: './map/update_score',
//     data: {
//       name: document.getElementById("team_name").textContent,
//     },
//     success: function (data) {

//     }
//   });
//   setTimeout("update_score()", 1000);
// }
// update_score();

function team_score() {
  let score = document.getElementById("score_text").text;
  $.ajax({
    type: 'post',
    url: './map/tellteamscore',
    data: {
      score: score,
      name: document.getElementById("team_name").textContent,
    }
  });
}  

function PassScore() {
  let score = document.getElementById("score_text").text;
$.ajax({
  type: 'post',
  url: './score/getMyscore',
  data: {
    score : score,
  },
});
}
function user_score(){
  let score = document.getElementById("score_text").text;
  var facebook_id = document.getElementById("facebook_id").textContent;
  $.ajax({
    type: 'post',
    url: './map/tellscore',
    data: {
      score: score,
      id: facebook_id,
    }
  });
}
