import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import "./News.css"
import Spinner from './Spinner';
import Proptypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const capitalizefirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const [articles, setArticles] = useState([])
    const [articles1, setArticles1] = useState([])
    // const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const updatenews = async () => {
        props.setProgress(20)
        // const url = `https://newsdata.io/api/1/news?apikey=pub_18242e7349536a2edfb2eb015c5dd367f54d9&country=${props.country}&category=${props.category !== "general" ? props.category : "world"}&language=en`
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=00d3eb49536f4bb4b9f81ef2a92c652d&pageSize=9&page=3`
        setLoading({ loading: true })
        let data = await fetch(url);
        props.setProgress(50)
        let parsedData = await data.json()
        props.setProgress(70)
        // setResults(parsedData.results)
        setArticles1(parsedData.articles)
        setPage(page)
        // setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    const updatenewsmain = async () => {
        props.setProgress(20)
        // const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category}/${props.country}.json`
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=00d3eb49536f4bb4b9f81ef2a92c652d&pageSize=9&page=${page}`
        setLoading({ loading: true })
        let data = await fetch(url);
        props.setProgress(50)
        let parsedData = await data.json()
        props.setProgress(70)
        setArticles(parsedData.articles)
        setPage(page)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
        // document.getElementById("cardContainer").style.width="100%"
    }
    useEffect(() => {
        updatenews();
        updatenewsmain();
        document.title = `${capitalizefirst(props.category)}- NewsBite`
    }, [])
    const handleprevclick = () => {
        document.getElementById("scrollnewscardContainer").scrollLeft -= 320
    }
    const handlenextclick = () => {
        document.getElementById("scrollnewscardContainer").scrollLeft += 320
    }
    const fetchMoreData =async () => {
        setPage(page+1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=00d3eb49536f4bb4b9f81ef2a92c652d&pageSize=9&page=${page}`
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }
    return (
        <>
            <div className='Container'>
                <div className="newsContainer">
                    <h2 className='heading' style={{ marginTop: "20%" }}>NewsBite-Top {capitalizefirst(props.category)} Headlines</h2>
                </div>
                <div className="scroll">
                    <div className="btn" id='prevbtn' onClick={handleprevclick}>&larr;</div>
                    <div className='scrollnewscardContainer' id='scrollnewscardContainer'>
                        {articles1.map((element) => {
                            return <div className="scrollsinglecards">
                                <Newsitem width={"100%"} title={element.title ? element.title : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    <div className="btn" id='nextbtn' onClick={handlenextclick}>&rarr;</div>
                </div>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==totalResults}
                    loader={<Spinner/>}
                >
                    <div className="mainComponent">
                        <h3 className='heading'>In the {capitalizefirst(props.category)} World</h3>
                        <div className='newscardContainer'>
                            {articles.map((element) => {
                                return <Newsitem width={"30%"} key={element.url} title={element.title ? element.title + "..." : ""} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general"
}
News.propTypes = {
    country: Proptypes.string,
    pageSize: Proptypes.number,
    category: Proptypes.string,
}

export default News
