import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../../api/api";
import ArticleCard from "../cards/ArticleCard";
import UserCommentCard from "../cards/UserCommentCard";
import "../style/Articles.css";
import menuicon from "../icons/menu.png";
import sorticon from "../icons/sort.png";
import commenticon from "../icons/comment.png";
import upvoteicon from "../icons/like.png";
import timeicon from "../icons/calendar.png";
import loadingicon from "../icons/loading.png";

class ArticlesByUser extends Component {
  state = {
    isLoading: true,
    users: [],
    articles: [],
    comments: [],
    query: "",
    createdDesc: true,
    commentsDesc: false,
    votesDesc: false
  };

  render() {
    const { user, username } = this.props;
    const { isLoading, users, articles, comments } = this.state;

    if (isLoading)
      return (
        <div className="main-alert-home">
          <div className="main-alert-head">
            <h2 className="section-loading">
              <img
                src={loadingicon}
                alt="loading icon"
                width="40px"
                height="40px"
              />
            </h2>
          </div>
        </div>
      );

    return (
      <div className="main-home">
        <div className="main-section-head">
          <h2 className="section-title">{username}</h2>
          <div className="section-menu dropdown">
            <p className="dropbtn">
              <img src={menuicon} alt="menu" width="28px" height="28px" />
            </p>
            <div className="dropdown-content">
              {users.map(user => (
                <Link
                  key={user.username}
                  to={`/users/${user.username}/articles`}
                >
                  <h4>{user.username}</h4>
                </Link>
              ))}
            </div>
          </div>
          <div className="section-sort">
            <div
              className="sort-button"
              onClick={this.sortByCreated}
              title="sort by date created"
            >
              <img src={sorticon} alt="sort icon" width="22px" height="22px" />
              <span> </span>
              <img
                src={timeicon}
                alt="created at icon"
                width="22px"
                height="22px"
              />
            </div>
            <div
              className="sort-button"
              onClick={this.sortByComments}
              title="sort by comment count"
            >
              <img src={sorticon} alt="sort icon" width="22px" height="22px" />
              <span> </span>
              <img
                src={commenticon}
                alt="comments icon"
                width="22px"
                height="22px"
              />
            </div>
            <div
              className="sort-button"
              onClick={this.sortByVotes}
              title="sort by vote count"
            >
              <img src={sorticon} alt="sort icon" width="22px" height="22px" />
              <span> </span>
              <img
                src={upvoteicon}
                alt="votes icon"
                width="22px"
                height="22px"
              />
            </div>
          </div>
        </div>

        <div className="main-section-head">
          <h2 className="section-title">articles</h2>
        </div>

        <div className="main-section-head">
          <div className="section-main">
            {articles.map(article => (
              <div key={article.article_id}>
                <ArticleCard articles={article} />
              </div>
            ))}
          </div>
        </div>

        <div className="main-section-head">
          <h2 className="section-title">comments</h2>
        </div>

        <div className="main-section-head">
          <div className="section-main">
            {comments
              .filter(comment => comment.username === user)
              .map(comment => (
                <div key={comment.comment_id}>
                  <UserCommentCard comments={comment} user={user} />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate = (prevProps, prevState) => {
    const changeProps = this.props.topic !== prevProps.topic;
    const changeState = this.state.query !== prevState.query;
    if (changeProps || changeState) {
      this.fetchArticles();
    }
  };

  componentDidMount = () => {
    this.fetchUsers();
    this.fetchArticles();
    this.fetchComments();
    this.setState({ isLoading: false });
  };

  sortByCreated = () => {
    const { createdDesc } = this.state;
    if (createdDesc) {
      const query = "sort_by=created_at&order=ASC";
      this.setState({ query, createdDesc: false });
    } else {
      const query = "";
      this.setState({ query, createdDesc: true });
    }
  };

  sortByComments = () => {
    const { commentsDesc } = this.state;
    if (commentsDesc) {
      const query = "sort_by=comment_count&order=ASC";
      this.setState({ query, commentsDesc: false });
    } else {
      const query = "sort_by=comment_count&order=DESC";
      this.setState({ query, commentsDesc: true });
    }
  };

  sortByVotes = () => {
    const { votesDesc } = this.state;
    if (votesDesc) {
      const query = "sort_by=votes&order=ASC";
      this.setState({ query, votesDesc: false });
    } else {
      const query = "sort_by=votes&order=DESC";
      this.setState({ query, votesDesc: true });
    }
  };

  fetchUsers = () => {
    api.getUsers().then(({ data }) => this.setState({ users: data.users }));
  };

  fetchArticles = () => {
    const { topic, username } = this.props;
    const { query } = this.state;
    api
      .getArticles(topic, username, query)
      .then(({ data }) => this.setState({ articles: data.articles }));
  };

  fetchComments = () => {
    api
      .getAllComments()
      .then(({ data }) => this.setState({ comments: data.comments }));
  };
}

export default ArticlesByUser;
