import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      pageSize: 9, // Number of articles per page
      totalResults: 0,
      category: '',
      country: 'us', // Default country
      filters: ['business', 'entertainment', 'health', 'science', 'sports', 'technology'], // Available categories
    };
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  async fetchArticles() {
    const { page, pageSize, category, country } = this.state;
    const API_KEY = import.meta.env.VITE_API;
    const API = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;

    const data = await fetch(API);
    const dataJson = await data.json();
    this.setState({
      articles: dataJson.articles,
      totalResults: dataJson.totalResults,
    });
  }

  handlePageChange = (newPage) => {
    this.setState({ page: newPage }, () => {
      this.fetchArticles();
    });
  };

  handleCategoryChange = (category) => {
    this.setState({ category, page: 1 }, () => {
      this.fetchArticles();
    });
  };

  render() {
    const { articles, page, pageSize, totalResults, filters, category } = this.state;
    const totalPages = Math.ceil(totalResults / pageSize);

    return (
      <div className="container my-3">
        <h1>Top news today</h1>
        {/* Filter and Category selection */}
        <div className="mb-3">
          <select onChange={(e) => this.handleCategoryChange(e.target.value)} value={category}>
            <option value="">All Categories</option>
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          {articles.map((element, index) => {
            return (
              <div key={index + element.url} className="col-md-4">
                <NewsItem title={element.title} dec={element.description} NewsImage={element.urlToImage} NewsUrl={element.url} />
              </div>
            );
          })}
        </div>
        {/* Pagination */}
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${i + 1 === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => this.handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default News;
