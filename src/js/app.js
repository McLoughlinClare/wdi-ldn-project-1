$(()=>{

  console.log('JS LOADED');
///Random quote generator for new page.
  function padNum(num) {
    if(num < 10) return `0${num}`;
    return num;
  }

  const quote = [
    'Eat Glitter for breakfast and shine all day.',
    'This is the start of something wonderful.',
    'Everyday is a fresh start.',
    'Better things are coming.',
    '"Where you movin?", they asked. "On to better things", I replied.',
    'A new day has come',
    'Be patient, the best things happen unexpectedly.',
    'Don\'t get mad. Don\'t get even. Do better. Much better.',
    'She believed she could, so she did.',
    'Life is a story, make yours the best seller.',
    'Enjoy the little things.',
    'The comeback is always stronger than the setback.',
    'Don\'t give your past the power to define your future.',
    'Doubt kills more dreams that failure ever will.',
    'Take a chance, make a change.',
    'Escape the ordinary.',
    'You are too determined to be defeated.',
    'Never allow yourself to be defined by someone else’s opinion of you.'
  ];

  const randomquote = Math.floor(Math.random()*(quote.length));


  const todayQuote = quote[randomquote];
  $( 'span.quote' ).html(todayQuote);

  //Random New Activity generator for profile page.


  const betternessActivity = [
    'listen to a new podcast',
    'Listen to a song from a genre you would not normally choose.',
    'pick a new recipe to cook for dinner',
    'plan a new route to work for tomorrow',
    'learn to count to 10 in a new language',
    'Spend 10 minutes doing some stretches',
    'learn a new dance from Youtube',
    'Read an article from a magazine you don\'t normally read.',
    'Research local recreational leagues/teams near you, are there any you want to try?',
    'go through your DVD collection, sell any you no longer want.',
    'go through your tupperware collection, through out any that don\'t have lids',
    'Declutter your magazines and books.',
    'Clear out your wardrobe, any clothes you no longer wear give them to a charity shop.',
    'Call up a close friend, just for a chat.',
    'Make contact with an old friend, arrange to meet them for a coffee.',
    'Write a to do list of all the little things that need doing around your home, try and do at least 2 a week for the next 6 weeks.',
    'Make a list of things that make you smile.',
    'Write a thank-you note to someone who has helped you in the past, be sure to send it to them!',
    'Greet a neighbour you\'ve never spoken to before',
    'Write down five things about yourself you like.',
    'Choose a random fitness video on youtube and try it out',
    'Use youtube videos to learn a few basic steps of a cultural dance',
    'Declutter that pile of "stuff" you have in the corner',
    'Watch a TED talk',
    'Count the things you\'re grateful for'

  ];

  const randomactivity = Math.floor(Math.random()*(betternessActivity.length));


  const todayBetterness = betternessActivity[randomactivity];
  $( 'span.betterness' ).html(todayBetterness);

// to calculate date in a format for fitbit, also for new page.
  let today = new Date();
  let todayView = new Date();
  const dd = padNum(today.getDate());
  const mm = padNum(today.getMonth()+1); //January is 0!
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;
  todayView = `${dd}-${mm}-${yyyy}`;

  $( 'span.today' ).html(todayView);


//Function to get and use fitbit data.
  let lastNightSleepMinutes = '';
  let stepsTaken = '';
  let heartRate = '';

  $.ajax({
    url: '/fitbits',
    method: 'GET',
    data: { date: today }
  })
  .then((data) => {
    $('span.today').html(`<strong>${data.sleep.sleep.summary}</strong>`);
    console.log(data);

    lastNightSleepMinutes = (data.sleep.summary.totalMinutesAsleep);
    console.log(lastNightSleepMinutes);
    stepsTaken = (data.activity.summary.steps);
    heartRate = data.heartRate['activities-heart'][0].restingHeartRate;

    const hours = Math.floor(lastNightSleepMinutes/60);
    const minutes = lastNightSleepMinutes % 60;

    $( 'span.sleep' ).html(`${hours}hr ${minutes}mins`);
    $( 'span.steps' ).html(stepsTaken);
    $( 'span.heartRate' ).html(heartRate);

    $('#stepsTaken').val(stepsTaken);
    $('#hoursSlept').val(lastNightSleepMinutes);
    $('#heartRate').val(heartRate);

    $('#formattedHoursSlept').val(`${hours}hr ${minutes}mins`);

  });

  $( 'span.today' ).html(todayView);

  // daily depression warning

  $('form.newForm a.button').on('click', depressionRating);
  let depressionScore = 0;

  function depressionRating(e){
    e.preventDefault();
    const checked = $('input[type=radio]:checked');
    console.log(checked);
    let total = 0;
    $.each(checked, (i, radio) => {
      total += parseFloat($(radio).val());
    });
    depressionScore = total;
    $('#depressionScore').val(depressionScore);
    console.log('depression score input', $('#depressionScore'));


    if($('#depressionScore').val(depressionScore)) {
      $('form.newForm').trigger('submit');
    }
  }














});
