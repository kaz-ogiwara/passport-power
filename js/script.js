
var container = document.getElementById("globe");
var controller = new GIO.Controller(container);
var data;
var current = {"name":"UNITED STATES","ISOCode":"US"};


function showInfoBox(select){
  if (data) {
    let name = select.name;
    let code = select.ISOCode;

    $("#info-box").find(".title").text(name);
    $table = $("#info-box").find("table");

    if (data[code]) {
      $table.find("tr").eq(0).find("td").eq(0).text(data[code][0]);
      $table.find("tr").eq(1).find("td").eq(0).text(data[code][1]);
      $table.find("tr").eq(2).find("td").eq(0).text(data[code][2]);
    } else {
      $table.find("tr").eq(0).find("td").eq(0).text("-");
      $table.find("tr").eq(1).find("td").eq(0).text("-");
      $table.find("tr").eq(2).find("td").eq(0).text("-");
    }

    if (!$("#info-box").hasClass("show")) {
      $("#info-box").addClass("show");
    }
  }
}


$.getJSON("data/summary.json",function(json){
  data = json;

  // do event when country data was loaded
  showInfoBox(current);
});


controller.addDataAsync('data/data.json', function(json) {
  controller.setBackgroundColor("#123");
  controller.setInitCountry(current.ISOCode);
  controller.init();
  showInfoBox(current);
  $("#cover").removeClass("show");
});


controller.onCountryPicked(function(select, relate) {
  current = select;
  //console.log(select);
  //console.log(relate);

  showInfoBox(select);
})

$(function(){
  $("#help-button").on("click",function(){
    $("#article").addClass("show");
  });

  $("#article").find(".cover").on("click",function(){
    console.log("cover clicked!");
    $("#article").removeClass("show");
  });

  $("#article").find("button.close").on("click",function(){
    console.log("button.close clicked!");
    $("#article").removeClass("show");
  });
});
