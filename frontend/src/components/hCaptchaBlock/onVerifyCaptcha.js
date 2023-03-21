import React, { Component } from "react";
import "./App.css";
class App extends Component {
  onVerifyCaptcha(token) {
    console.log("Verified: " + token)
  }
  render() {
    return (
      <div className="App">
        <h1>Sign Up Today!</h1>
        <form>
          <input type="text" placeholder="Enter your email!" />
          <hCaptcha sitekey="00000000–0000–0000–0000–000000000000" onVerify={this.onVerifyCaptcha} />
          <button type="submit">Sign Up!</button>
        </form>
      </div>
    );
  }
}
export default App;