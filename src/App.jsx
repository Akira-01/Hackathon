import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);

    console.log("This is my initializer")
    
    
    const movies =[
      {id: 0, title:"Avengers: Infinity War", overview:"The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe"},
      {id: 1, title:"Avengers", overview:"This is my second overview"},
    
    ]
    
    
  
  
  
   var movieRows =[]
    movies.forEach ((movie) => {
    console.log(movie.id)
    const movieRow =<table key={movie.id}>
      <tbody>
        <tr>
          <td>
            <img alt="poster" src=""/>
          </td>
          <td>
            {movie.title}
          </td>
        </tr>
      </tbody>
    </table>
    movieRows.push(movieRow)
  })

  this.state = {rows: movieRows}
} 
  
  render() {
    return (

      <div className='App' >

        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="movie-camera (2).svg" />
              </td>
              <td width="8" />
              <td>
                <h1>Movie DB Searcher</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: '99%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} placeholder="Enter search term" />


      {this.state.rows}
      
      </div>


    )
  }
}

export default App
