import React from "react";
import {SinglePage} from "./SinglePage"
import {TwoPage} from "./TwoPages"
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {singlePage: false, twoPage: false};
  }

  render() {
    return (
      <div >
          <h1>Welcome</h1>
          <p>This program enables one to check the words from a website and count the number of items. Click on 'Compare two pages' to compare the words between two pages and also find the words that are different and also the words that are the same between the two pages</p>
        <div class="btn-group" role="group" aria-label="...">
          <button class="btn btn-secondary" onClick={() => this.setState({singlePage: true, twoPage:false})}>Single Page</button>
          <button class="btn btn-secondary"  onClick={() => this.setState({singlePage: false, twoPage:true})}>Compare Two Pages</button>
        </div>
        {this.state.singlePage && <SinglePage/>}
        {this.state.twoPage && <TwoPage/>}
      </div>
    );
  }
}