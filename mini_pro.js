const API_KEY="dc4c93524657443284bf843713f0943a";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',() => fetchNews("india"));
function reload(){
  window.location.reload();
}
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
      const cardcontainer=document.getElementById('card-container');
      const newstemplate=document.getElementById('template-news');
      cardcontainer.innerHTML="";

      articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone=newstemplate.content.cloneNode(true);
        fillDatainCard(cardclone,article);
        cardcontainer.appendChild(cardclone);
      });

      function fillDatainCard(cardclone,article){
        const newsimg=cardclone.querySelector('#news-img');
        const newstitle=cardclone.querySelector('#title');
        const newssource=cardclone.querySelector('#source');
        const newsdesc=cardclone.querySelector('#news-description');

        newsimg.src=article.urlToImage;
        newstitle.innerHTML=article.title;
        newsdesc.innerHTML=article.description;

        const date=new Date(article.publishedAt).toLocaleString('en-US',{timeZone:'Asia/Jakarta'});
        newssource.innerHTML=`${article.source.name} ${date}`;

        cardclone.firstElementChild.addEventListener("click",()=>{
          window.open(article.url,"_blank");
        });
  
      }  
      
  }
  let curSelectNav=null;
  function onNav(id) {
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectNav?.classList.remove('active');
    curSelectNav=navItem;
    curSelectNav.classList.add('active');
  }
  const searchButton=document.getElementById('search-button');
  const searchText=document.getElementById('search-text');

  searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectNav?.classList.remove('active');
    curSelectNav=null;

  })
