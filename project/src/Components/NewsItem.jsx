import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewsItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, dec, NewsImage, NewsUrl } = this.props;

    const hasEmptyProps = !title || !dec || !NewsUrl;
    const defaultImage = !NewsImage ? "https://picsum.photos/id/237/200/300" : NewsImage;



    // Truncate title and description based on limits
    const truncatedTitle = title && title.length > 40 ? title.slice(0, 40) + '...' : title;
    const truncatedDec = dec && dec.length > 80 ? dec.slice(0, 80) + '...' : dec;

    return (
      <div className="card mb-5">
      <img width={200} height={300} src={defaultImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          {hasEmptyProps ? "Default Title" : truncatedTitle}
        </h5>
        <p className="card-text">
          {hasEmptyProps ? "Default Description" : truncatedDec}
        </p>
        <Link to={`/news/${NewsUrl}`} className="btn btn-primary">
        Read more
      </Link>
        {/* <a href={`news/id=${NewsUrl}`} target="_blank" className="btn btn-primary">Read more</a> */}
      </div>
    </div>
    
    );
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
