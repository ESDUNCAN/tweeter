$(document).ready(function () {
  $("#tweet-text").on("input", onChange);
});

const onChange = function () {
  console.log(this)
  const $textArea = $(this)
  const text = $textArea.val()
  const length = text.length
  console.log(length, text);

  const $counter = $(".counter")
  const remaining = (140 - length)
  $counter.text(remaining)
  if (remaining < 0) {
    $counter.addClass("red")
  } else if (remaining >= 0) {
    $counter.removeClass("red")
  }
}





