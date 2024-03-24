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
      countries: {
        us: 'United States',
        gb: 'United Kingdom',
        ca: 'Canada',
        au: 'Australia',
        de: 'Germany',
        fr: 'France',
        jp: 'Japan',
        in: 'India',
        cn: 'China',
        it: 'Italy',
        ru: 'Russia',
        br: 'Brazil',
        kr: 'South Korea',
        es: 'Spain',
        nl: 'Netherlands',
      },
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

    // Filter out the removed articles
    const filteredArticles = dataJson.articles.filter(article => article.title !== "[Removed]");
    // console.log(filteredArticles.length);
    this.setState({
      articles: filteredArticles,
      totalResults: dataJson.totalResults,
    });
  }

  handlePageChange = (newPage) => {
    this.setState({ page: newPage }, () => {
      this.fetchArticles();
    });
    // this.setState({ page: newPage }, () => {
    //   this.fetchArticles();
    //   window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top when changing page

    // });
  };

  handleCategoryChange = (category) => {
    this.setState({ category, page: 1 }, () => {
      this.fetchArticles();
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top when changing category
    });
  };

  handleCountryChange = (country) => {
    this.setState({ country }, () => {
      this.fetchArticles();
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top when changing country
    });
  };

  render() {
    const { articles, page, pageSize, totalResults, filters, category, country, countries } = this.state;
    const totalPages = Math.ceil(totalResults / pageSize);

    return (
      <div className="container my-3">
        <h1 className="text-center mb-4">Top news today</h1>
        {/* Filter and Category selection */}
        <div className="row">
          {/* Filter and Category selection */}
          <div className="col-md-4 mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <select id="category" onChange={(e) => this.handleCategoryChange(e.target.value)} value={category} className="form-select">
              <option value="">All Categories</option>
              {filters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="country" className="form-label">Country:</label>
            <select id="country" onChange={(e) => this.handleCountryChange(e.target.value)} value={country} className="form-select">
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* News articles or message for no articles found */}
        {articles.length > 0 ? (
          <div className="row">
            {articles.map((element, index) => (
              <div key={index + element.url} className="col-md-4">
                <NewsItem title={element.title} dec={element.description} NewsImage={element.urlToImage} NewsUrl={element.url} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No articles found for the selected category and country.</div>
        )}

        {/* Pagination */}
        <nav className="mt-5">
          <ul className="pagination justify-content-center">
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
