import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";


export const MainView = () => {
   
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user.user);
  const token =useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
  
    fetch("https://movie-api33-c32ceac54882.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            image: movie.ImagePath,
            title: movie.Title,
            description: movie.Description,
            genre: {
              name: movie.Genre.Name,
              description: movie.Genre.Description,
            },
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio,
              birth: movie.Director.Birth,
              death: movie.Director.Death,
            },
            featured: movie.Featured,
          };
        });
        dispatch(setMovies(moviesFromApi));
      });
  }, [token, dispatch]);


  const addFavoriteMovie = async (movieId) => {
    fetch("https://movie-api33-c32ceac54882.herokuapp.com/users/" + user.Username + "/movies/" + movieId, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`},
    }).then((response) => response.json())
    .then((data) => {
      console.log("Movie added to favorites", data);
      alert("Movie added to favorites");
      dispatch(setUser(data));
      localStorage.setItem('user', JSON.stringify(data))
    })
  }
  
  const removeFavoriteMovie = async (movieId) => {
    fetch("https://movie-api33-c32ceac54882.herokuapp.com/users/" + user.Username + "/movies/" + movieId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`},
    }).then((response) => response.json())
    .then((data) => {
      console.log("Movie removed from favorites", data);
      alert("Movie removed from favorites");
      dispatch(setUser(data));
      localStorage.setItem('user', JSON.stringify(data))
    })
  }

  
    return(
      <BrowserRouter>
        <Row>
          <NavigationBar />
        </Row>
          <Row className="justify-content-md-center">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
    
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView />
                      </Col>
                    )}
                  </>
    
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to ="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView
                          addFavoriteMovie={addFavoriteMovie}
                          removeFavoriteMovie={removeFavoriteMovie}
                        />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? 
                      <Navigate to="/login" replace />
                 : <MoviesList /> }
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={8}>
                      <ProfileView
                        localUser={user}
                        movies={movies}
                        token={token}
                      />
                    </Col>
                  )}
                </>
              }
            />
             <Route
                    path="/movies/:movieId"
                    element={
                      <MovieView
                        addFavoriteMovie={addFavoriteMovie}
                        removeFavoriteMovie={removeFavoriteMovie}
                      />
                    }
                />
          </Routes>
        </Row>
      </BrowserRouter>
    );
  }