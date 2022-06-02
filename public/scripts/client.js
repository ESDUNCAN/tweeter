/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function (tweets) {
    let $tweets = ""
    let $tweetContainer = $(".tweet-container");
    $tweetContainer.empty();
    for (const index in tweets) {
      const tweet = tweets[index]
      $tweetContainer.prepend(createTweetElement(tweet))
    };
    console.log("Prepend")
  };

  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
    <div class="user-username"> 
      <div class="avatar-username">
        <img src=${tweet.user.avatars}>
        <div>${tweet.user.name} </div>
      </div>
      <div>${tweet.user.handle}</div>
    </div>
    <section>
      ${escape(tweet.content.text)}
    </section>
    <footer> <span> ${timeago.format(tweet.created_at)} </span>
      <div class="emojis">
        <i class="fa-solid fa-flag" id="flag-emoji"></i>
        <i class="fa-solid fa-retweet" id="retweet-emoji"></i>
        <i class="fa-solid fa-heart" id="heart-emoji"></i>
      </div>
    </footer>
  </article>`
    return $tweet;
  };

  $('form').submit(function (event) {
    event.preventDefault();

    const $textArea = $("#tweet-text");
    const text = $textArea.val();
    const length = text.length;
    const remaining = (140 - length);
    const errorMessage = $(".error-messages");

    if (!remaining) {
      errorMessage.text("⚠️ Cannot Tweet an empty box. Please submit a message under 140 characters ⚠️");
      return
    }

    if (remaining <= 0) {
      errorMessage.text("⚠️ Message exceeds length, please reduce message to 140 characters or less ⚠️");
      return
    }

    const data = $(this).serialize()

    $.post('/tweets', data)
      .then(() => {
        loadTweets();
        errorMessage.text("");
        $textArea.val("").trigger("input")
      })
      .catch(() =>
        errorMessage.text("Sorry the server failed, please re-submit your tweet"));
  }
  );
  const loadTweets = function (tweet) {
    $.get("./tweets", function (data) {
      renderTweets(data);
    });
  };
  loadTweets()
});

