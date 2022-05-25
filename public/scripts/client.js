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
  ]

  const renderTweets = function (tweets) {
    let $tweets = ""
    for (const index in tweets) {
      const tweet = tweets[index]
      $tweets += createTweetElement(tweet)
    }
    $(".tweet-container").html($tweets)
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
    <div class="user-username">
      <div>${tweet.user.name}</div>
      <div>${tweet.user.handle}</div>
    </div>
    <section>
      ${tweet.content.text}
    </section>
    <footer> <span> ${tweet.created_at} </span>
      <div class="emojis">
        <i class="fa-solid fa-flag" id="flag-emoji"></i>
        <i class="fa-solid fa-retweet" id="retweet-emoji"></i>
        <i class="fa-solid fa-heart" id="heart-emoji"></i>
      </div>
    </footer>
  </article>`
    return $tweet;
  }

  renderTweets(data);
});

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// const renderTweets = function (tweets) {
//   let $tweets = ""
//   for (const index in tweets) {
//     const tweet = tweets[index]
//     $tweets += createTweetElement(tweet)
//   }
//   $(".tweet-container").html($tweets)
//   // loops through tweets
//   // calls createTweetElement for each tweet
//   // takes return value and appends it to the tweets container
// }

// const createTweetElement = function (tweet) {
//   let $tweet = `<article class="tweet">
//     <div class="user-username">
//       <div>${tweet.user.name}</div>
//       <div>${tweet.user.handle}</div>
//     </div>
//     <section>
//       ${tweet.content.text}
//     </section>
//     <footer> <span> ${tweet.created_at} </span>
//       <div class="emojis">
//         <i class="fa-solid fa-flag" id="flag-emoji"></i>
//         <i class="fa-solid fa-retweet" id="retweet-emoji"></i>
//         <i class="fa-solid fa-heart" id="heart-emoji"></i>
//       </div>
//     </footer>
//   </article>`
//   return $tweet;
// }

// renderTweets(data);