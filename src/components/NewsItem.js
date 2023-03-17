import React, { Component } from 'react'

export default class newsItem extends Component {
  render() {
   let {title,description,imageUrl,news_url,author,publishedAt,source} = this.props;
    return (
      <div>
     <div className="card">
      <img src={!imageUrl?"https://images.hindustantimes.com/img/2022/09/19/1600x900/0277d6ee-3867-11ed-8cba-ba7ad76ffd07_1663625123176.png":imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {publishedAt}</small></p>
        
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-success" style={{zIndex:"1",left:'90%'}}>
          {source}
        </span>
      
        <a href={news_url} target="_blank" className="btn btn-dark">Read More</a>
      </div>
    </div>
    
    </div>
    )
  }
}
