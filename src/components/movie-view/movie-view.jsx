import React from 'react';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} height="300"/>
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre-name">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-genre-description">
            <span className="label">Genre:</span>
            <span className="value">{movie.Genre.Description}</span>
        </div>
        <div className="movie-director-name">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="movie-director-bio">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Bio}</span>
        </div>
        
        <button onClick={() => { onBackClick(null); }}>Back</button>
       </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
  
}
export default MovieView;