import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import * as api from "../api/api";
import posticon from "./icons/post.png";

export default class PostComment extends React.Component {
  state = {
    isLoading: true,
    body: "",
    user: "",
    addedComment: ""
  };

  render() {
    const { isLoading, body, addedComment } = this.state;
    if (isLoading) return <p className="tc helvetica black-70">Loading...</p>;
    if (addedComment.length !== 0)
      return (
        <p className="tc helvetica black-70">{`${
          addedComment.body
        } was successfully added`}</p>
      );
    else
      return (
        <div>
          <Form onSubmit={this.addNewComment}>
            <FormGroup>
              <Label for="body">body</Label>
              <div className="input-wrap">
                <Input
                  id="body"
                  value={body}
                  onChange={this.handleChange}
                  type="textarea"
                  name="text"
                  style={{ backgroundColor: "lightgray" }}
                />
              </div>
            </FormGroup>
            <button>
              <img src={posticon} alt="post icon" width="28px" height="28px" />
            </button>
          </Form>
        </div>
      );
  }

  componentDidMount = () => {
    this.setState({ isLoading: false });
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  addNewComment = event => {
    event.preventDefault();
    const { body } = this.state;
    const { article_id, user } = this.props;
    const newComment = { body, username: user };
    api.addComment(article_id, newComment).then(({ data }) =>
      this.setState({
        addedComment: data
      })
    );
  };
}
