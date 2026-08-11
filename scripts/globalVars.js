// ---- state ----
let pkmns = [];
// 1 == daily, 2 == random, 3 == trainer

// ---- DOM refs ----
const datalist = document.getElementById('pkmns');


const testPara = document.querySelector(".flavor");
const title = document.querySelector(".title");
const random = document.getElementById("random");
const input = document.getElementById("guess");

const pkmnCard = document.getElementById("pkmnCard");

// ---- init ----
async function initPkmnList() {
    pkmns = await getList();

    const fragment = document.createDocumentFragment();
    pkmns.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        fragment.appendChild(option);
    });
    datalist.appendChild(fragment);
}

initPkmnList();