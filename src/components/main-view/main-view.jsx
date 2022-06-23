import React from 'react';
import  MovieCard  from '../movie-card/movie-card';
import  MovieView  from '../movie-view/movie-view';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [
            { _id: 1, Title: 'Encanto', 
            Description: 'A Colombian teenage girl has to face the frustration of being the only member of her family without magical powers.', 
            ImagePath: 'https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg', 
            Genre: ' Animated', 
            Director: ' Jared Bush'},
            { _id: 2, Title: 'Indiana Jones: Raiders of the Lost Ark', 
            Description: 'In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitlers Nazis can obtain its awesome powers.', 
            ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjA0ODEzMTc1Nl5BMl5BanBnXkFtZTcwODM2MjAxNA@@._V1_FMjpg_UX1021_.jpg', 
            Genre: ' Adventure', 
            Director: ' Steven Spielberg'},
            { _id: 3, Title: 'Legally Blond', 
            Description: 'Elle Woods, a fashionable sorority queen, is dumped by her boyfriend. She decides to follow him to law school. While she is there, she figures out that there is more to her than just looks.', 
            ImagePath: 'https://m.media-amazon.com/images/M/MV5BNTEyNjUwMTkxMV5BMl5BanBnXkFtZTcwNjk0NDk0NA@@._V1_FMjpg_UX682_.jpg', 
            Genre: ' Comedy', 
            Director: ' Robert Luketic'}
          ],
          selectedMovie: null
        }
      }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
    }
}

export default MainView;