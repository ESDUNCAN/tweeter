/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

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
    const data = $(this).serialize();

    const $textArea = $("#tweet-text");
    const text = $textArea.val();
    const length = text.length;
    const remaining = (140 - length);
    const errorMessage = $(".error-messages");

    if (remaining >= 0 && remaining < 140) {
      $.ajax('/tweets', { method: 'POST', data })
        .then(() => {
          loadTweets();
          errorMessage.text("");
        });
    } else if (remaining === 140) {
      errorMessage.text("⚠️ Cannot Tweet an empty box. Please submit a message under 140 characters ⚠️");
    } else if (remaining < 0) {
      errorMessage.text("⚠️ Message exceeds length, please reduce message to 140 characters or less ⚠️");
    };
  });
  const loadTweets = function (tweet) {
    $.get("./tweets", function (data) {
      renderTweets(data);
    });
  };

  renderTweets(data);
});

