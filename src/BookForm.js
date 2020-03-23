import React, { Component } from "react";

import {connect} from "react-redux";
import { postBook, resetErrors } from "./redux/actions/index";

class BookForm extends Component {
  state={
    title:"",
    color:"",
    authors: [this.props.author.id]
  }
  ChangeHandler = e =>
  this.setState({ [e.target.name]: e.target.value });

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.closeModal);
  };
  render() {
    const { errors } = this.props;

  return (
    <div className="mt-5 p-2">
      <form onSubmit={this.submitBook}>
        {!!errors.length && (
          <div className="alert alert-danger" role="alert">
            {errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Title</span>
          </div>
          <input type="text" className="form-control" name="title" onChange={this.ChangeHandler} value={this.state.title}/>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Color</span>
          </div>
          {/* <input type="text" className="form-control" name="color" onChange={this.ChangeHandler} value={this.state.color} /> */}
          <select name="color"className="form-control" onChange={this.ChangeHandler}>
              <option value="">Choose..</option>
              <option value="yellow">Yellow</option>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
              <option value="blue">Blue</option>
              <option value="grey">Grey</option>
            </select>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
}
const mapStateToProps = state => {
  return {
    errors: state.errorsState.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook, author,closeModal) =>
      dispatch(postBook(newBook,author, closeModal)),
    resetErrors: () => dispatch(resetErrors())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(BookForm);
