import React, { Component } from 'react'




class NewsItem extends Component {
  

  render() {
    let {title,dec,NewsImage,NewsUrl} = this.props;
    const hasEmptyProps = !title || !dec || !NewsUrl;

    // Check if NewsImage is null, empty, or undefined
    const defaultImage = !NewsImage ? "https://picsum.photos/id/237/200/300" : NewsImage;
    return (
        <div className="card m-5" style={{width: "18rem"}}>
            <img width={400} height={200} src={defaultImage} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{hasEmptyProps ? "Default Title" : title}...</h5>
                <p className="card-text">{hasEmptyProps ? "Default Description" : dec}...</p>
                <a href={`news/id=${NewsUrl}`} target='_blank' className="btn btn-primary">read more</a>
            </div>
            </div>

    )
  }
}
// Default props definition
NewsItem.defaultProps = {
  title: "",
  dec: "",
  NewsImage: "",
  NewsUrl: ""
};

export default NewsItem;