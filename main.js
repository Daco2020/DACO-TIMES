// new 클래스 생성자

let news = []
const getLatesNews = async () => {
    
    // 요청 내용 세팅
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`)
    let header = new Headers({'x-api-key':'jPvCB5Es3RRgYPDQmHyd2aaoHWWwSjDhpbymDHuNHeE'}) // 헤더에 담는다.
    
    // API 호출
    let response = await fetch(url,{headers:header})
    let data = await response.json()
    news = data.articles
    console.log(news)
}

getLatesNews();
