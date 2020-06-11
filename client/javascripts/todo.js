//jshint esversion: 6

let controller = function() {
  //load comments from db when page loads
  if (localStorage.getItem("commentsList")) {
    $(".comments").html(localStorage.getItem("commentsList"));
  }

  $.ajax({
    url: "http://localhost:8888/todos",
    method: "GET"
  }).done((res) => {
    let pElem;
    //console.log(res.comments[0]._id + " " + res.comments[0].data)
    res.comments.forEach((comment) => {
      pElem = $("<p>").html(comment.data)
      $(".comments").append(pElem);
    })
  });

  let addCommentFromInputBox = function() {
    //Semmy uses "$" to name variables that will contain jQuery objects
    let $new_comment, content;

    if ($(".comment-input input").val() !== "") {
      content = $(".comment-input input").val();
      $new_comment = $("<p>").text(content);
      //$new_comment.hide();
      $(".comments").append($new_comment);
      //$new_comment.fadeIn();
      $(".comment-input input").val("");

      //add comment to db
      $.ajax({
          method: "POST",
          url: "http://localhost:8888/addtodo",
          data: {
            data: content
          }
        })
        .done(function(msg) {
          console.log("Data Saved: " + msg);
        });
    }
  };

  $(".comment-input button").on("click", function(event) {
    addCommentFromInputBox();
  });

  $(".comment-input input").on("keypress", function(event) {
    if (event.keyCode === 13) {
      addCommentFromInputBox();
    }
  });
};

let deleteComment = () => {
  //delete a comment from db
  let content = $("#deleteOne").val();
  $.ajax({
      method: "POST",
      url: "http://localhost:8888/deletetodo/" + content
    })
    .done(function(msg) {
      console.log("Todo deleted: " + msg);
    });

  window.location.reload();
}

let getComment = () => {
  //clear outDiv
  $("#outDiv").html("");
  let pElem;
  //retrieve a comment from db
  let content = $("#getOne").val();
  $.ajax({
      method: "GET",
      url: "http://localhost:8888/gettodo/" + content
    })
    .done(function(msg) {
      console.log("Todo retrieved: " + msg.message.data);
      pElem = $("<p>").html("Todo Retrieved: " + msg.message.data)
      $("#outDiv").append(pElem);
    });

  //window.location.reload();
}

let deleteAll = () => {
  //delete all comments from db
  console.log(localStorage.getItem("commentList"))
  localStorage.removeItem("commentsList")
  console.log(localStorage.getItem("commentList"))
  //window.location.reload();
  console.log(localStorage.getItem("commentList"))
}

$(document).ready(() => {
  let btn01, btn02, btn03;
  //console.log("ready")
  //select the delete button
  btn03 = document.querySelectorAll('button')[3];
  btn03.addEventListener('click', deleteAll);
  btn02 = document.querySelectorAll('button')[2];
  btn02.addEventListener('click', deleteComment);
  btn01 = document.querySelectorAll('button')[1];
  btn01.addEventListener('click', getComment);
  controller();
});
