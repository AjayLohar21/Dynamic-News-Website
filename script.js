const API_KEY = "620562613ea247508d5f2a30aca02485";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;
    

    cardClone.firstElementChild.addEventListener("click",() => {
        window.open(article.url,"_blank");
    });
}

function onNavItemClick(id) {

    const liItems = document.querySelectorAll('.nav-item');
    liItems.forEach((item) => {
        item.classList.remove("active");
    });

    event.target.classList.add("active");
    fetchNews(id);
}

function display() {
    const search = document.getElementById("news-input").value;
    if(!search){
        console.log("something");
        return;
    }
    console.log(search);
    fetchNews(search);
}

