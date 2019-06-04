$(".title").click(function() {
  let currColor = $(this).css("color");
  if (currColor == "rgb(255, 255, 255)") {
    $(this).css("color", "#060110");
    $(this).css("transform", "rotate(-90deg)");
    $("body").css("background", "white");
    $(".pic14").css("filter", "invert(0%)");
  }

  else {
    $(this).css("color", "white");
    $(this).css("transform", "rotate(-90deg) scaleY(-1)");
    $("body").css("background", "black");
    $(".pic14").css("filter", "invert(100%)");
  }
});

$(".gallery").each(function() {
  let zInd = $(this).css("z-index");
  $(this).mouseover(function() {
    $(this).css("z-index", 10);
    let posTop = $(this).position().top;
    let posLeft = $(this).position().left;
    $("body").append("<span class='pieceTitle'></span>");
    $(".pieceTitle").append($(this).attr("alt"))
    .css("text-transform", "uppercase")
    .css("color", "white")
    .css("position", "absolute")
    .css("z-index", 11)
    .css("font-size", 18)
    .css("top", posTop + 10)
    .css("left", posLeft + 10)
    .css("width", $(this).width()/2);
    if ($(this).attr("id") == "pic3" || $(this).attr("id") == "pic5" || $(this).attr("id") == "pic12") {
      $(".pieceTitle").css("color", "black")
      .css("text-align", "right")
      .css("left", posLeft+ $(this).width()/2 - 10);
    }
    if ($(this).attr("id") == "pic9" || $(this).attr("id") == "pic11" || $(this).attr("id") == "pic13") {
      $(".pieceTitle").css("text-align", "right")
      .css("left", posLeft+ $(this).width()/2 - 10);
    }
    if ($(this).attr("id") == "pic1") {
      $("body").append("<span class='pieceDesc'>Click To Expand</span>");
      $(".pieceDesc").css("text-transform", "uppercase")
      .css("position", "absolute")
      .css("z-index", 11)
      .css("font-size", 18)
      .css("text-align", "right")
      .css("color", "white")
      .css("top", posTop + $(this).height() - 28)
      .css("left", posLeft + $(this).width()/2)
      .css("width", $(this).width()/2 - 10);
    }
  });
  $(this).mouseout(function() {
    $(this).css("z-index", zInd);
    $(".pieceTitle").remove();
    $(".pieceDesc").remove();
  });
});

function topFunction() {
  $('html, body').animate({scrollTop:0}, 1000, "swing");
}
