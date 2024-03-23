import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  articles = []
  constructor(){
    super();
    this.state = {
      articles: this.articles
    }

  


  }
  
  async componentDidMount() {
    const API_KEY = import.meta.env.VITE_API;
    const API = "https://newsapi.org/v2/top-headlines?country=us&apiKey="+API_KEY
    const data = await fetch(API);
    const dataJson = await data.json()
    // console.log(dataJson);
    this.setState({articles:dataJson.articles})
  }




  render() {
    return (
      <div className='container  my-3'>
        <h1>Top news today</h1>
        <div className="row">

        {this.state.articles.map((elemnet,indix)=>{
          return <div key={indix+elemnet.url} className="col-md-4">
            <NewsItem  title={elemnet.title.slice(0,35)} dec={elemnet.description.slice(0,88)} NewsImage={elemnet.urlToImage} NewsUrl={elemnet.url} />
           </div>
        })}
        </div>


        
      </div>
    )
  }
}

export default News
