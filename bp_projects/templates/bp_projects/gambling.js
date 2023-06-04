function getData(name, stat) {
  let playerheader = {
    "search": name
  };

  // Fetch the data by name
  fetch(`https://www.balldontlie.io/api/v1/players?search=${name}`, playerheader)
    .then(response => response.json())
    .then(json => {
      const player_id = json.data[0].id;
      // Gets the player id starting at 1 (0)
      const currentDate = new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().split('T')[0];
      // Gets the data 2 months beforer today.
      let gamesheader = {
        "player_ids": [player_id],
        "start_date": currentDate
      };
      console.log(player_id)

      // Fetching the stats of the player 2 months before today
      fetch(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${player_id}&start_date=${currentDate}`)
        .then(response => response.json())
        .then(json => {
          console.log(json); // Logs the API response to inspect the data
          const player_games = json.data;
          // Filter the specific stat
          let filteredStats = []
          player_games.forEach(game => filteredStats.push(game[stat]));
          console.log(filteredStats); // Log the filtered stats to see if any stats are found
          // Process the filtered stats data here
          const userInput = Number(prompt('What is his line?'));
          // Asking for the number of the line
          const percentLikelihood = calculatePercentLikelihood(filteredStats, userInput);
          // Calculates the PercentLikelihood
          displayStats(name, filteredStats, percentLikelihood); // Pass name to the displayStats function
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

// Percentage hit rate
function calculatePercentLikelihood(stats, userInput) {
  // if statement to calculate stats
  if (stats.length === 0) {
    return 0;
  }

  let count = 0;
  stats.forEach(stat => {
    if (stat >= userInput) {
      count++;
    }
  });

  return (count / stats.length) * 100;
  // divides count and stats in order to calculate percent
}

// Function to display the stats and hit rate on the web page
function displayStats(name, stats, percentLikelihood) {
  const statsContainer = document.getElementById('stats-container');
  statsContainer.innerHTML = '';

  if (stats.length === 0) {
    statsContainer.textContent = 'No stats found.';
    return;
  }
  // If statement for the stats

  const statsElement = document.createElement('p');
  statsElement.textContent = `${name}'s Stats: ${stats.join(', ')}`;
  // Returns the name of the player inputted and then the stats after
  statsContainer.appendChild(statsElement);

  const percentElement = document.createElement('p');
  percentElement.textContent = `The percentage likelihood of the bet hitting is ${percentLikelihood.toFixed(2)}%.`;
  // Displays the percent likely of that bet hitting
  statsContainer.appendChild(percentElement);
}

// Usage: Pass the player's name and the desired stat to the `getData` function
