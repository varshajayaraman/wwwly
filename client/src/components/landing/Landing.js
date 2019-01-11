import React, { Component } from "react";
import "./Landing.css";
import { createShortUrl } from "../../APIHelper";
import constants from "../../config/constants";
class Landing extends Component {
  constructor() {
    super();
    this.state = {
      showShortenUrl: false,
      shortenUrl: "",
      originalUrl: "",
      baseUrl: "",
      clickSubmit: true,
      showError: false,
      apiError: "",
      showApiError: false,
      showLoading: false,
      exUrl:
        "https://www.amazon.com/Apple-iPhone-GSM-Unlocked-5-8/dp/B075QMZH2L",
      exShortUrl: constants.baseUrl
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit() {
    //document.getElementById("inputLine").style.borderColor="red";
    this.setState({ clickSubmit: true, showApiError: false });
    if (this.state.clickSubmit && this.state.originalUrl) {
      this.setState({ showLoading: true, showShortenUrl: false });
      let reqObj = {
        originalUrl: this.state.originalUrl,
        shortBaseUrl: constants.baseUrl
      };
      
      createShortUrl(reqObj)
        .then(json => {
          setTimeout(() => {
            this.setState({
              showError: false,
              showLoading: false,
              showShortenUrl: true,
              shortenUrl: reqObj.shortBaseUrl+json.data.urlCode
            });
          }, 0);

        })
        .catch(error => {
          this.setState({
            showLoading: false,
            showApiError: true,
            apiError: "Server Error"
          });
        });
    } else {
      this.setState({ showShortenUrl: false, showError: true });
    }
  }
  renderButton() {
    if (!this.state.showLoading) {
      return (
        <button
          className="btnSubmit"
          name="action"
          onClick={this.handleSubmit}>
          Submit
          </button>
      );
    } 
  }
  
  render() {
    return (
      <div className="landing">
        <div>
          <h5> Original Url</h5>
        </div>
        <div>
          Ex:{" "}
          <a target="_blank" href={this.state.exUrl}>
            {this.state.exUrl}
          </a>
        </div>
        <input
          className=" text-line"
          name="originalUrl"
          field="originalUrl"
          borderColor= "red"
          placeholder="Paste your link.."
          value={this.state.originalUrl}
          onChange={this.handleUserInput.bind(this)}
        />

                
        {this.renderButton()}
        {this.state.showApiError && (
          <div className="shorten-error">{this.state.apiError}</div>
        )}
        
        <div className="shorten-imp">
          The Shortened URL will appear Below.
        </div>

        {this.state.showShortenUrl && (
          <div className="shorten-title">
            Shortened Url is {` `}
            <a target="_blank" href={this.state.shortenUrl}>
              {this.state.shortenUrl}
            </a>
          </div>
        )}

        {this.state.showError && (
          <div className="formError">Original Url is required</div>
        )}
      </div>
    );
  }
}

export default Landing;
