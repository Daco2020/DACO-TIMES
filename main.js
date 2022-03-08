// new 클래스 생성자
let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) => menu.addEventListener("click", (event)=>getNewsByTopic(event)))
let searchButton = document.getElementById("search_button");


const getLatesNews = async () => {
    
    // 요청 내용 세팅
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=tech&page_size=10`)
    let header = new Headers({'x-api-key':'jPvCB5Es3RRgYPDQmHyd2aaoHWWwSjDhpbymDHuNHeE'}) // 헤더에 담는다.
    
    // API 호출
    let response = await fetch(url,{headers:header})
    let data = await response.json()
    news = data.articles
    
    render()
}
const getNewsByTopic = async (event) => {
    let topic = event.target.textContent.toLowerCase() // textContent 태그 안의 내용을 가리킴
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`)
    let header = new Headers({'x-api-key':'jPvCB5Es3RRgYPDQmHyd2aaoHWWwSjDhpbymDHuNHeE'}) // 헤더에 담는다.
    
    // API 호출
    let response = await fetch(url,{headers:header})
    let data = await response.json()
    news = data.articles

    render()
}

const getNewByKeyword = async () => {
    let keyword = document.getElementById("search_input").value // 인풋 값 가져오기
    let url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
    let header = new Headers({'x-api-key':'jPvCB5Es3RRgYPDQmHyd2aaoHWWwSjDhpbymDHuNHeE'}) 

    // API 호출
    let response = await fetch(url,{headers:header})
    let data = await response.json()
    news = data.articles

    render()
}

const render = () => {
    let newsHTML = ''
    newsHTML = news.map((newsItem) => {
        // <!-- 부트스트랩 클래스 row :: 한 줄로 만듬-->
        //     <!-- 4 대 8 사이즈로 나눈 것 -->
        return `<div class="row news">
                <div class="col-lg-4">
                    <img class="news_img_size" src="${newsItem.media || "https://t1.daumcdn.net/cfile/tistory/22733D47570702942E"}"/>
                </div>
                <div class='col-lg-8'>
                    <h2>${newsItem.title}</h2>
                    <p>${newsItem.summary == null || newsItem.summary == ""
                        ? "내용없음"
                        : newsItem.summary.length > 200
                        ? newsItem.summary.substring(0,200)+"..."
                        : newsItem.summary
                    }</p>
                    <div>${newsItem.rights || "no source"}, ${moment(newsItem.published_date).fromNow()}</div>

                </div>
            </div>`
    }).join('');

    document.getElementById("news_board").innerHTML=newsHTML
}

searchButton.addEventListener("click", getNewByKeyword)
getLatesNews();



const openSearchBox = () => {
    let inputArea = document.getElementById("input_area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};