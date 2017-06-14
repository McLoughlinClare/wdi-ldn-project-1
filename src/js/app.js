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

  const $today = $('.today');


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

  $.ajax({
    url: '/fitbits',
    method: 'GET',
    data: { date: today }
  })
  .then((data) => {
    $today.html(`<strong>${data.sleep.sleep.summary}</strong>`);
    console.log(data);

    lastNightSleepMinutes = (data.sleep.summary.totalMinutesAsleep);
    console.log(lastNightSleepMinutes);
    stepsTaken = (data.activity.summary.steps);

    const hours = Math.floor(lastNightSleepMinutes/60);
    const minutes = lastNightSleepMinutes % 60;

    $( 'span.sleep' ).html(`${hours}hr ${minutes}mins`);
    $( 'span.steps' ).html(stepsTaken);
    $('#stepsTaken').val(stepsTaken);
    $('#hoursSlept').val(lastNightSleepMinutes);
    $('#formattedHoursSlept').val(`${hours}hr ${minutes}mins`);

  });

  $( 'span.today' ).html(todayView);






});
