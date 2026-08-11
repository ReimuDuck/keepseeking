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
function randID(list){
    const randEntry =  Math.floor(Math.random() * list.length);
    return list[randEntry];
}

function findName(arrChall, name){
    var list = [];
    for(let i = 0; i < arrChall.length; i++){
        if(arrChall[i].name.toLowerCase() == name.toLowerCase()){
            console.log(arrChall[i].name );
            console.log(name);
            list.push(i);
        }
    }
    return randID(list);
}

function setChallHints(arrChall){
    
    pkmnCard.src = arrChall.image;
    pkmnCard.alt = arrChall.name;
}

async function getRandomChall(input){
    const challArray = await fetchJSONData();
    var challToGive =  Math.floor(Math.random() * challArray.length);
    if(input != "none"){
        challToGive = findName(challArray, input);
        console.log(challToGive);
        return(challArray[challToGive]);
    }
    
    
    return(challArray[challToGive]);
}



// Function to check if the user has completed the game today.
async function runDailyTask() {
    try {
        const challDone = false;
        var ranARR = await getRandomChall("none");
        if (!ranARR) {
            console.error("Could not load JSON.");
            return;
        }
        setChallHints(ranARR);
        const handler = async  () => {
            event.preventDefault();
            console.log(input.elements.guessBox.value);
            ranARR = await getRandomChall(input.elements.guessBox.value);
            setChallHints(ranARR);
        };
        input.addEventListener("submit", handler);
    } catch (err) {
        console.error("Error running function: ", err);
    }
}

// Run on page load
runDailyTask();