import React from "react";
// Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// The MovieCard function component 
export const MovieCard = ({ movie }) => {
    return (
      <Card className="h-100">
        <Card.Img 
          variant = "top" 
          src={movie.image}
          // Bootstrap utility classes for horizontal and vertical centering
          className="mx-auto my-auto"
          />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="primary" href={`/movies/${encodeURIComponent(movie.id)}`}>Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  };
  
  // Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        birth: PropTypes.string,
        death: PropTypes.string
         }),
      genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string
      }),
      featured: PropTypes.bool,
      id: PropTypes.string
    }).isRequired,
};