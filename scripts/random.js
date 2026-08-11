// test vars possibility to rework how this is done

// funcs with possibility to be moved to seperate file will be labelled with //~
async function fetchJSONData() {
  try {
    const response = await fetch('scripts//Data//CUBEOUTPUT.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();  
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}



function setChallHints(arrChall){
    
    pkmnCard.src = arrChall.image;
    pkmnCard.alt = arrChall.name;
}

async function getRandomChall(){
    const challArray = await fetchJSONData();
    const challToGive =  Math.floor(Math.random() * challArray.length);
    console.log(challArray[challToGive]);
    return(challArray[challToGive]);
}



// Function to check if the user has completed the game today.
async function runDailyTask() {
    try {
        const challDone = false;
        var ranARR = await getRandomChall();
        if (!ranARR) {
            console.error("Could not load JSON.");
            return;
        }
        setChallHints(ranARR);
        const handler = async  () => {
            event.preventDefault();
            ranARR = await getRandomChall();
            setChallHints(ranARR);
        };
        input.addEventListener("click", handler);
    } catch (err) {
        console.error("Error running function: ", err);
    }
}

// Run on page load
runDailyTask();