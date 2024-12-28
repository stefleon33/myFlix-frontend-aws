import React from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";
import { Button, Card, Row, Col } from 'react-bootstrap';
import { useSelector } from "react-redux";



export const MovieView = ({ addFavoriteMovie, removeFavoriteMovie }) => {
    const { movieId } = useParams();
    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state) => state.user.user);


    const movie = movies.find((b) => b.id === movieId);

    const isFavorite = user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.id);

      return (
        <Card className="card mb-3">
            <Card.Body>
                <Row className="row g-0">
                    <Col md={4}>
                        <img 
                            src={movie.image} 
                            className="img img-fluid rounded-start" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                            alt={movie.title} 
                        />
                    </Col>
                    <Col md={8}>
                        <div className="card-body">
                            <h3 className="card-title text-center">{movie.title}</h3>
                            <div>
                                <span className="card-text fw-bold">Description: </span>
                                <span>{movie.description}</span>
                            </div>
                            <div>
                                <span className="card-text fw-bold">Genre: </span>
                                <span>{movie.genre.name}</span>
                            </div>
                            <div>
                                <span className="card-text fw-bold">Genre Description: </span>
                                <span>{movie.genre.description}</span>
                            </div>
                            <div>
                                <span className="card-text fw-bold">Director: </span>
                                <span>{movie.director.name}</span>
                            </div>
                            <div>
                                <span className="card-text fw-bold">Bio: </span>
                                <span>{movie.director.bio}</span>
                            </div>
                            <div>
                                <span className="card-text fw-bold">Birth: </span>
                                <span>{movie.director.birth}</span>
                            </div>
                            <div>
                                <span className="card-text fw-bold">Death: </span>
                                <span>{movie.director.death}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        {isFavorite ? (
                        <Button
                            className="favorites-button"
                            style={{ cursor: 'pointer' }}
                            onClick={() => removeFavoriteMovie(movie.id)}
                        >
                        Remove from my favorites list!
                        </Button>
                        ) : (
                        <Button
                            className="favorites-button"
                            style={{ cursor: 'pointer' }}
                            onClick={() => addFavoriteMovie(movie.id)}
                        >
                            Add to my favorites list!
                        </Button>
                    )}
                        <Link to={`/`}>
                            <Button 
                                className="back-button" 
                                style={{ cursor: "pointer" }}
                            >
                                Back
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
