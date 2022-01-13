import React from "react";
import Table from 'react-bootstrap/Table'
import { difference, getWordDictionary, intersection } from "./functions";
export class TwoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wordDict: {}, wordDict2: {},value: '', value2: '',differentWords:[], intersectionWords:[], keys: [], values: [], keys2: [], values2: [], showValues: false, showIntersection: false, showDifference: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleChange2(event) {
    this.setState({value2: event.target.value});
  }
  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    var wordDict = await getWordDictionary(this.state.value);
    var wordDict2 = await getWordDictionary(this.state.value2);
    var keys = Object.keys(wordDict.dictionary);
    var values = Object.values(wordDict.dictionary);
    var keys2 = Object.keys(wordDict2.dictionary);
    var values2 = Object.values(wordDict2.dictionary);
    this.setState({wordDict, wordDict2 ,keys, values, keys2, values2})
  }

  getIntersection() {
    var intersectionWords = intersection(this.state.wordDict, this.state.wordDict2);
    console.log(intersectionWords)
    this.setState({intersectionWords, showIntersection:true, showValues: false, showDifference: false})
  }

   getDiff() {
    var differentWords = difference(this.state.wordDict, this.state.wordDict2);
    console.log(differentWords)
    this.setState({differentWords, showIntersection:false, showValues: false, showDifference: true})
  }
 
  render() {
    return (
      <div className="mt-3">
        <h3>Please enter the URLs for the websites</h3>
        <form onSubmit={this.handleSubmit}>
           <div class="form-group">
              <label for="url1">URL 1</label>

            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
          </div>    
          <div class="form-group">
              <label for="url2">URL 2</label>

            <input type="text" class="form-control" value={this.state.value2} onChange={this.handleChange2} />
          </div>  
          <br/>
          <input class="btn btn-primary" type="submit" value="Submit" />
        </form>
        <p>{this.state.dict}</p>
        {this.state.keys.length !== 0 && 
        <div className="mb-3">
            <button class="btn btn-primary mr-3" onClick={() => this.setState({showValues: true,showIntersection:false, showDifference: false})}>Show Values</button>
            <button class="btn btn-primary m-3" onClick={() => this.getDiff()}>Get Difference</button>
            <button class="btn btn-primary m-3" onClick={() => this.getIntersection()}>Get Intersection</button>
        </div>}
        {this.state.showValues && 
        <div>
          <div class="d-flex flex-row">
            <div>
      <span>URL 1</span>
      <Table striped bordered hover>
        <thead>
        <tr>
            <th>Word</th>
            <th>Occurances</th>
          </tr>
          </thead>
          <tbody>
          {this.state.keys.map((key, index) => <tr key={key}><td>{key}</td><td>{this.state.values[index]}</td></tr>) }
      </tbody>
      </Table>
      </div>
      <div className="m-3"></div>
      <div>
      <span>URL 2</span>
      <Table striped bordered hover>
        <thead>
        <tr>
            <th>Word</th>
            <th>Occurances</th>
          </tr>
          </thead>
          <tbody>
          {this.state.keys2.map((key, index) => <tr key={key}><td>{key}</td><td>{this.state.values2[index]}</td></tr>) }
      </tbody>
      </Table>
      </div>
      </div>
      </div>
  }
  {this.state.showDifference && 
  <div>
    <p>The difference between Sets A and B is the Set of elements present in A but not in B. It is represented as A -B. </p>
    <Table striped bordered hover>
        <thead>
        <tr>
            <th>Word</th>
          </tr>
          </thead>
          <tbody>
          {this.state.differentWords.map((key, index) => <tr key={key}><td>{key}</td></tr>) }
      </tbody>
      </Table>
  </div>
  
  }
  {this.state.showIntersection && 
  <div>
    <p>The intersection shows what items are shared between categories</p>
    <Table striped bordered hover>
        <thead>
        <tr>
            <th>Word</th>
          </tr>
          </thead>
          <tbody>
          {this.state.intersectionWords.map((key, index) => <tr key={key}><td>{key}</td></tr>) }
      </tbody>
      </Table>
  </div>
  }
      </div>
      
    );
  }
}