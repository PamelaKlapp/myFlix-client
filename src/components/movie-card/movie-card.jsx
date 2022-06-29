import React from 'react';
import PropTypes from 'prop-types';


export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string,
      Description: propTypes.string
    }),
    Director: propTypes.shape({
      Name: propTypes.string,
      Bio: propTypes.string
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
export default MovieCard;