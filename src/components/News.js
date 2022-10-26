import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  articles = [];
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    // console.log(this.articles)
    document.title = `${this.capitalise(this.props.category)} ~ Tazza Khabar`;
  }
  async updatenews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apikey=${this.props.apikey}&page=${
      this.state.page 
    }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedata = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      page:this.state.page+1,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updatenews();
  }
  // handlepreviousclick = async () => {
  //   this.updatenews();
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  // };

  // handlenextclick = async () => {
  //   if (
  //     this.state.page + 1 >
  //     Math.floor(this.state.totalResults / this.props.pageSize)
  //   ) {
  //     console.log("cant go to the next page as no content to show");
  //   } else {
  //     this.updatenews();
  //     this.setState({
  //       page: this.state.page + 1,
  //     });
  //   }
  // };

  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apikey=${this.props.apikey}&page=${
      this.state.page-1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      page:this.state.page+1,
      loading: false,
    });
  }

  render() {
    return (
        <>
        <h2 className="text-center " style={{marginTop:"100px"}}>
          Tazza Khabar ~ Top {this.capitalise(this.props.category)} HeadLines
        </h2>
        {/* loading to next page */}
        {this.state.loading&&<Spinner/>}
        {/* infinite scroll */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults }
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {
              this.state.articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4">
                    <Newsitem
                      title={element.title}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : "Description not found"
                      }
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      sourceName={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          </div>  
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark btn-lg"
            onClick={this.handlepreviousclick}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page ===
              Math.floor(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark btn-lg"
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div>*/}
      </>
    );
  }
}

export default News;
