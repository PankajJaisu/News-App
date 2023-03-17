import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class news extends Component {
   
  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'general',
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
    
  }

  constructor(props){
    super(props);
    console.log("Constuctor here");
    this.state = {
      articles:[],
      loading:false,
      page:1,
      totalResults:0,
    }
    document.title = `${this.props.category} - SayHey News`
  }
  
  async componentDidMount()
  {
  console.log("in cdm");
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.access_token}&page=1&pageSize=${this.props.pageSize}`
  this.setState({loading:true})
  let data = await fetch(url);
  console.log("data"+data)
  let parsedData = await data.json()
  console.log("Parse Data",parsedData)
  
  this.setState({articles:parsedData.articles,
                totalResults:parsedData.totalResults,
                loading:false})
}
  

fetchMoreData = async() => {
 this.setState({page:this.state.page + 1})
 console.log(this.state.page);
 console.log("in cdm");
 let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.access_token}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
 this.setState({loading:true})
 let data = await fetch(url);
 console.log("data"+data)
 let parsedData = await data.json()
 console.log("Parse Data",parsedData)
 
 this.setState({articles:this.state.articles.concat(parsedData.articles),
               totalResults:parsedData.totalResults,
               loading:false})
};

  handlePrevButton = async()=>{
    console.log("Next")
    console.log("Count:",this.state.page)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.access_token}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    console.log("data"+data)
    let parsedData = await data.json()
    console.log("Parse Data",parsedData)
    this.setState({
      page:this.state.page - 1,
      articles:parsedData.articles,
      loading:false,
    })
  }
  handleNextButton = async()=>{
  console.log(this.state.page + 1)
  console.log(Math.ceil(this.state.totalResults/12))
  if(this.state.page-1 > Math.ceil(this.state.totalResults/12)){

  }
  console.log("Next")
  console.log("Count:",this.state.page)
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.access_token}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
  this.setState({loading:true})
  let data = await fetch(url);
  console.log("data"+data)
  let parsedData = await data.json()
  console.log("Parse Data",parsedData)
  console.log("totalResults",this.totalResults)
  console.log("pageSize",this.props.pageSize)
  console.log("div:",Math.ceil(this.state.totalResults/this.props.pageSize))
  this.setState({
      page:this.state.page + 1,
      articles:parsedData.articles,
      loading:false
    })
 
  }
  render() {
    return (
     
    <div className="container my-3">
    <h1 style={{margin:"30px 100px"}}>SayHey  Top - {this.props.category} headlines</h1>
    {/* {this.state.loading && <Spinner/>} */}
    <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore= {this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className="row">
        {this.state.articles.map((element)=>{
        return <div className="col-md-4" key={element.url}>
          <NewsItem  description={element.description} title={element.title} imageUrl={element.urlToImage} news_url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
          
        </div>       
        })}
        
      </div>  
    </InfiniteScroll>
    {/* <div className="container my-5 d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className='btn btn-dark' onClick={this.handlePrevButton} >&larr; Previous</button>
      <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNextButton} >Next &rarr;</button>
    </div> */}

    </div>
    )
  }
}
