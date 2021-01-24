import React from 'react';
import './App.scss';
import Gallery from '../Gallery';

class App extends React.Component {
  static propTypes = {
  };
  
  constructor() {
    super();
    this.state = {
      tag: 'art',
      search: 'art',
      timeout: null
    };
  }

  componentWillUnmount(){
    if(this.state.timeout) clearTimeout(this.state.timeout);
  }

  handleSearchInput = (event)=>{

    const val = event.target.value;
    this.setState({search: val});

    if (this.state.timeout) clearTimeout(this.state.timeout);

    const timeout = setTimeout(()=>{
      this.setState({tag: val});
    },500);

    this.setState({timeout});
  }

  render() {
    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <input className="app-input" onChange={event => this.handleSearchInput(event)} value={this.state.search}/>
        </div>
        <Gallery tag={this.state.tag}/>
      </div>
    );
  }
}

export default App;
