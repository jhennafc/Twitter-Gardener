const ROSE_CRSR = chrome.runtime.getURL('images/rose-cursor.gif');
const IMG_BCKGRND = chrome.runtime.getURL('images/sparkle.gif');

const POSITIVE_MESSAGES = [
  'You are worthy.',
  'You are enough.',
  'Be kind and forgiving to yourself.',
  'You are amazing.',
  'It\'s okay not to be okay.',
  'It\'s enough to just breathe.',
  'You are loved.',
  'I believe in you.',
  'You can do it!',
  'You are not a failure.',
  'You matter.',
  'Your life matters.'
];

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(onMessage);
});


function startGardening() {
  // grab all tweets 
  const tweets = document.querySelectorAll(".tweet");

  for (let tweet of tweets) {
    tweet.style.cursor = 'url(' + ROSE_CRSR + ') 4 12, auto';

    tweet.addEventListener('mouseover', onMouseOver);
    tweet.addEventListener('mouseout', onMouseOut);
    tweet.addEventListener('click', onClick);
  }

}
function stopGardening() {
  const tweets = document.querySelectorAll(".tweet");

  for (let tweet of tweets) {
    tweet.style.cursor = '';


    tweet.removeEventListener('mouseover', onMouseOver);
    tweet.removeEventListener('mouseout', onMouseOut);
    tweet.removeEventListener('click', onClick);
  }
}

function onMouseOver(event) {
  const tweet = event.currentTarget;

  tweet.style.backgroundImage = 'url(' + IMG_BCKGRND + ')';
  tweet.style.opacity = '0.8';

}

function onMouseOut(event) {
  const tweet = event.currentTarget;

  tweet.style.backgroundImage = '';
  tweet.style.opacity = '';

}

function onClick(event) {
  const tweet = event.currentTarget;
  
  event.stopPropagation();
  const tweetText = document.querySelector('.tweet-text');

  let randIndx = Math.floor(Math.random() * POSITIVE_MESSAGES.length);

  tweet.textContent = POSITIVE_MESSAGES[randIndx];

}


function onMessage(gardeningInProgress) {
  if (gardeningInProgress) {
    startGardening();
  }
  else{
    stopGardening();
  }
}

console.log('Gardener extension loaded!');