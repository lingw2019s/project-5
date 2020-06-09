//jshint esversion: 6
// this file goes in client/javascripts

let failHandler = () => {
  $("div").html("request failed");
}

let controller = function() {
  let endpointURLprefix = $("#endpointURL").val();
  let endpointURLsuffix = $("#userName").val();
  let endpointURL = `${endpointURLprefix}${endpointURLsuffix}`
  console.log("in controller " + "endpointURL = " + endpointURL)

  //clear response div
  $('div').html('');

  $.getJSON(endpointURL, (resp) => {
    console.log("in getJSON. resp.message =" + resp.message);
    $("div").text(resp.message);
  }).fail(failHandler);
};

$(document).ready(() => {
  //console.log("ready")
  let buttonElem = document.querySelector('button');
  buttonElem.addEventListener('click', controller);
});
