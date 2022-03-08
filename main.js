let news = [];
let page = 1;
let total_page = 0;
let menus = document.querySelectorAll(".menus button");
let searchButton = document.getElementById("search_button");
let url = ''
menus.forEach((menu) => menu.addEventListener("click", (event)=>getNewsByTopic(event)))

const getNews = async () => {
    try{
        // 헤더 할당
        let header = new Headers({'x-api-key':'jPvCB5Es3RRgYPDQmHyd2aaoHWWwSjDhpbymDHuNHeE'}) // 헤더에 담는다.
        
        url.searchParams.set('page', page) // ->  &page=2 페이지 url 추가하는 코드
        // API 호출
        let response = await fetch(url,{headers:header})
        let data = await response.json()
        if (response.status == 200) {
            if (data.total_hits == 0) {
                throw new Error("검색된 결과 값이 없습니다.")
            }
            news = data.articles
            total_pages = data.total_pages
            page = data.page

            render()
            pagination()
        } else {
            throw new Error(data.message)
        }
    } catch(error) {
        errorRender(error.message)
    }
}

const getLatesNews = async () => {
    // 요청 내용 세팅
    // new 클래스 생성자
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=tech&page_size=10`)
    getNews()
}

const getNewsByTopic = async (event) => {
    page = 1
    let topic = event.target.textContent.toLowerCase() // textContent 태그 안의 내용을 가리킴
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`)
    getNews()
}

const getNewByKeyword = async () => {
    page = 1
    let keyword = document.getElementById("search_input").value // 인풋 값 가져오기
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
    getNews()  
}

const render = () => {
    let newsHTML = ''
    newsHTML = news.map((newsItem) => {
        // <!-- 부트스트랩 클래스 row :: 한 줄로 만듬-->
        //     <!-- 컬럼을 4 대 8 사이즈로 나눈 것 -->
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

const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">${message}</div>`
    document.getElementById("news_board").innerHTML = errorHTML
}

//전체 페이지
//페이지
//페이지 그룹
//마지막
//첫번째
//첫번째-마지막 페이지
const pagination = () => {
    let paginationHTML = ''
    let pageGroup = Math.ceil(page/5)
    let last_page = pageGroup*5
    if (total_page > last_page){
        last_page = total_page
    }
    let first_page = last_page - 4 <= 0 ? 1 : last_page - 4;

    if (first_page > 6){
        paginationHTML = `<li class="page-item">
        <a class="page-link" href="#" aria-label="Previous"  onclick="moveToPage(${page-5})">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>`
    }



    for(let i=first_page;i<=last_page;i++){
        paginationHTML += `<li class="page-item ${page==i?"active":""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    }

    if (last_page > total_page){
    paginationHTML += `<li class="page-item">
        <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+5})">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`
}

    document.querySelector(".pagination").innerHTML = paginationHTML
}

// 이동하고 싶은 페이지 확인
// 이동하고 싶은 페이지로 API 호출
const moveToPage = (pageNum) => {
    page = pageNum
    getNews()

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