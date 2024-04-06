//API KEY -> a770b5e6787248eca122391648a1d22e

const API_KEY = "a770b5e6787248eca122391648a1d22e";
const url = "https://newsapi.org/v2/everything?q=";
 
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

// Define an asynchronous function named fetchNews that takes a 'query' parameter
async function fetchNews(query) {
    // Await the result of the fetch request to the specified URL appended with the 'query' parameter and API key
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // Await the parsing of the response body as JSON
    const data = await res.json();
    // Log the retrieved JSON data to the console
    console.log(data);

    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})