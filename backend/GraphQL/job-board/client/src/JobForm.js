import React, { Component } from "react";

import { createJobs } from "./requests";

export class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    event.preventDefault();
    const companyId = "HJRa-DOuG";
    const { title, description } = this.state;

    createJobs({ companyId, title, description }).then((data) => {
      this.props.history.push(`/jobs/${data.id}`);
    });

    console.log("should post a new job:", this.state);
  }

  render() {
    const { title, description } = this.state;
    return (
      <div>
        <h1 className="title">New Job</h1>
        <div className="box">
          <form>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="input"
                  style={{ height: "10em" }}
                  name="description"
                  value={description}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  className="button is-link"
                  onClick={this.handleClick.bind(this)}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
