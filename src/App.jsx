import React, { Component } from 'react';
// import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'



class App extends Component {
  constructor(props) {
    super(props);

    this.state ={}

  //   console.log("This is my initializer")
    
    
  //   const movies =[
  //     {id: 0, poster_src:"https://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  //      title:"Avengers: Infinity War", overview:"The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe"},
  //     {id: 1, poster_src:"https://image.tmdb.org/t/p/w185_and_h278_bestv2/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
  //      title:"Avengers", overview:"This is my second overview"},
    
  //   ]
  //   var movieRows =[]
  //   movies.forEach ((movie) => {
  //   console.log(movie.id)
  //   const movieRow = <MovieRow movie={movie} />
  //   movieRows.push(movieRow)
  // })

  // this.state = {rows: movieRows}
  this.performSearch()
} 
  
 performSearch(){
   console.log("Perform search using moviedb")
   const urlString = "https://api.themoviedb.org/3/search/movie?query=woman&api_key=c083c206a293bfed7565624bdf2ca4f8" 
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        // console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })
          this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data")
      }
    })
  } 


render() {
    return (

      <div>

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
