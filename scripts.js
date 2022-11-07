// add event listener to know when to search
const input = document.getElementById("form");
const text = document.getElementById("query");
input.onsubmit = (ev) => {
    ev.preventDefault();
    console.log(text.value);
    search(text.value);
};

// write function that searches given a (string) query
async function search (query)
{
    const results = await fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${query}`);
    const rhymes = await results.json();
    console.log(rhymes);
    const rhymeResults = rhymes.map((rhymeWord) => {
        const resultElem = document.createElement("div");
        resultElem.innerText = rhymeWord.word;
        if (rhymeWord.score >= 300) {
            resultElem.classList.add("result-perfect");
            resultElem.style.fontSize = "4rem";
        } else if (rhymeWord.score >= 250) {
            resultElem.classList.add("result-somewhat");
            resultElem.style.fontSize = "3rem";
        } else if (rhymeWord.score >= 200) {
            resultElem.classList.add("result-ok");
            resultElem.style.fontSize = "2rem";
        } else {
            resultElem.classList.add("result-poor");
            resultElem.style.fontsize = "1rem";
        }
        return resultElem;
    });
    console.log(rhymeResults);
    const resultsContainer = document.getElementById('results');
    // resultsContainer.style.width = "100vw";
    // resultsContainer.style.height = "100vh";
    // resultsContainer.style.display = "flex";
    // resultsContainer.style.flexDirection = "row";
    // resultsContainer.style.justifyContent = "space-evenly";
    // resultsContainer.style.alignItems = "space-around"
    // resultsContainer.style.flexWrap = true;
    Array.from(resultsContainer.childNodes).forEach((child) => {
        child.remove();
    });
    resultsContainer.append(...rhymeResults);
}

// 1. write function that expects array of word object results
//    that look like the spec says https://rhymebrain.com/api.html#rhyme
// 2. creates DOM elements and inserts them into the page