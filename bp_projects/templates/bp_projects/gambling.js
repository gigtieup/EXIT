function getData(name, stat) {
    let playerheader = {
      "search": name
    };
  
    fetch("https://www.balldontlie.io/api/v1/players", playerheader)
      .then(response => response.json())
      .then(json => {
        const player_id = json.data[0].id;
        const currentDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];
        let gamesheader = {
          "player_ids": [player_id],
          "start_date": currentDate
        };
  
        fetch(`https://www.balldontlie.io/api/v1/stats?player_ids=${player_id}&start_date=${currentDate}`)
          .then(response => response.json())
          .then(json => {
            const player_games = json.data;
            // Filter the specific stat
            const filteredStats = player_games.filter(game => game.stat_name === stat);
            // Process the filtered stats data here
            displayStats(filteredStats); // Call function to display stats
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
  
  // Function to display the stats on the web page
  function displayStats(stats) {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = ''; // Clear previous content
  
    if (stats.length === 0) {
      statsContainer.textContent = 'No stats found.';
      return;
    }
  
    stats.forEach(stat => {
      const statElement = document.createElement('p');
      statElement.textContent = `${stat.game.date} - ${stat.stat_name}: ${stat.value}`;
      statsContainer.appendChild(statElement);
    });
  }
  

  // Usage: Pass the player's name and the desired stat to the `getData` function
  getData( "id:29", "pts");
  

// How to add query parameters to link for Fetch.API...
// Search up: How to get today's date in javascript & How to 1 month before today in javascript.
// Calculate how many times it hits using a for loop to iterate through the data.


// This searches the ID based on the players name and retrieves its stats.

// What we are doing: perfoming calculations using someone else's backend. Using our own would be extensive and would take significant amounts of time.

// I am using JSON to store the NBA stat data. Specifically I am entering a start date (1 month before today) and fetching stats from that time period.