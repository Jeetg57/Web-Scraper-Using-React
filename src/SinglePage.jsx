import React from "react";
import Table from 'react-bootstrap/Table'
import { getWordDictionary } from "./functions";
export class SinglePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', keys: [], values: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    var wordDict = await getWordDictionary(this.state.value);
    var keys = Object.keys(wordDict.dictionary);
    var values = Object.values(wordDict.dictionary);
    this.setState({keys, values})
  }

  render() {
    return (
      <div className="mt-3">
        <h3>Please enter the URL for the website</h3>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
              <label for="url1">URL</label>

            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
          </div>    
          <input className="btn btn-primary mt-3" type="submit" value="Submit" />
        </form>
        {this.state.keys.length > 0 && <Table striped bordered hover>
        <thead>
        <tr>
            <th>Word</th>
            <th>Occurances</th>
          </tr>
          </thead>
          <tbody>
          {this.state.keys.map((key, index) => <tr key={key}><td>{key}</td><td>{this.state.values[index]}</td></tr>) }
      </tbody>
      </Table>}
      
      </div>
    );
  }
}