import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import  { MovieCard } from '../movie-card/movie-card'
import PropTypes  from "prop-types";

export const FavoriteMovies = ({ user, favoriteMovies }) => {
    return (
            <Row>
                 <Col xs={12}>
                    <h4>Favorite Movies</h4>
                </Col>
                {favoriteMovies.map((movie) => {
                    return (
                        <Col xs={12} md={6} lg={3} key={movie.id} className="fav-movie">
                            <Link to={`/movies/${movie.id}`}/>
                                <MovieCard 
                                    movie={movie} 
                                    isFavorite={user.FavoriteMovies.includes(movie.id)} 
                                    />
                        </Col> 
                    );
                })}
            </Row>
    );
}

FavoriteMovies.propTypes = {
    favoriteMovies: PropTypes.array.isRequired,
    localUser: PropTypes.object,
    };
