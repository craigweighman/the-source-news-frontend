import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../../api/api";
import ArticleCard from "../cards/ArticleCard";
import "../style/Articles.css";
import menuicon from "../icons/menu.png";
import sorticon from "../icons/sort.png";
import commenticon from "../icons/comment.png";
import upvoteicon from "../icons/like.png";
import timeicon from "../icons/calendar.png";

class Articles extends Component {
  state = {
    topics: [],
    articles: [],
    query: ""
  };

  render() {
    const { topics, articles } = this.state;
    return (
      <div className="main-home">
        <div className="main-section-head">
          <h2 className="section-title">articles</h2>

          <div className="section-menu dropdown">
            <p className="dropbtn">
              <img src={menuicon} alt="menu" width="28px" height="28px" />
            </p>
            <div className="dropdown-content">
              {topics.map(topic => (
                <Link key={topic.slug} to={`/topics/${topic.slug}/articles`}>
                  <h4>{topic.slug}</h4>
                </Link>
              ))}
            </div>
          </div>

          <div className="section-sort">
            <div className="sort-button" onClick={this.sortByCreated}>
              <img src={sorticon} alt="menu" width="22px" height="22px" />
              <span> </span>
              <img src={timeicon} alt="menu" width="22px" height="22px" />
            </div>
            <div className="sort-button" onClick={this.sortByComments}>
              <img src={sorticon} alt="menu" width="22px" height="22px" />
              <span> </span>
              <img src={commenticon} alt="menu" width="22px" height="22px" />
            </div>
            <div className="sort-button" onClick={this.sortByVotes}>
              <img src={sorticon} alt="menu" width="22px" height="22px" />
              <span> </span>
              <img src={upvoteicon} alt="menu" width="22px" height="22px" />
            </div>
          </div>
          <br />
          <div className="section-main">
            {articles.map(article => (
              <div key={article.article_id}>
                <ArticleCard articles={article} />
              </div>
            ))}
          </div>
          <br />
        </div>
      </div>
    );
  }

  componentDidUpdate = prevState => {
    if (this.state.query !== prevState.query) {
      this.fetchArticles();
    }
  };

  componentDidMount = () => {
    this.fetchTopics();
    this.fetchArticles();
  };

  sortByCreated = () => {
    this.setState({ query: "" });
  };

  sortByComments = () => {
    this.setState({ query: "sort_by=comment_count&order=DESC" });
  };

  sortByVotes = () => {
    this.setState({ query: "sort_by=votes&order=DESC" });
  };

  fetchTopics = () => {
    api.getTopics().then(({ data }) => this.setState({ topics: data.topics }));
  };

  fetchArticles = () => {
    const { topic, username } = this.props;
    const { query } = this.state;
    api
      .getArticles(topic, username, query)
      .then(({ data }) => this.setState({ articles: data.articles }));
  };
}

export default Articles;