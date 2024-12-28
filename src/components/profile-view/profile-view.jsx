import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";

/* import { Link } from "react-router-dom";
import { Form }from "react-router-dom"; */
import "./profile-view.scss";
import { UserInfo } from './user-info';
import { FavoriteMovies} from './favorite-movies';
import { UpdateUser } from './update-user';

export const ProfileView = ({ localUser, movies, token, removeFavoriteMovie}) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState(null);
    const [username, setUsername] =useState(storedUser.Username);
    const [password, setPassword] = useState(storedUser.Password);
    const [email, setEmail] = useState(storedUser.Email);
    const [birthday, setBirthday] = useState(storedUser.Birthday);
    const favoriteMovies = user?.FavoriteMovies  ? movies.filter(m => user.FavoriteMovies.includes(m.id)) : [];

    const formData = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    const handleSubmit = (event) => {
        event.preventDefault();
            fetch(`https://movie-api33-c32ceac54882.herokuapp.com/users/${user.Username}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` }
                  })
                  .then((response) => {
                    if (response.ok) {
                        alert("Update successful");
                        window.location.reload();
        
                        return response.json()
                    }
                     alert("Update failed");
                    })
                    .then((user) => {
                      if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                        setUser(user)
                      }    
                    })
                    .catch((error) => {
                      console.error(error);
                    });
    }; 

    const handleUpdate = (e) => {
        switch(e.target.type) {
            case "text" : 
                setUsername(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "date":
                setBirthday(e.target.value);
                default:
        }
    };   
   
const handleDeleteAccount = () => {
        fetch (`https://movie-api33-c32ceac54882.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
              }
          }).then ((response) => {
            if (response.ok) {
              alert("Account deleted successfully.");
              localStorage.clear();
              window.location.reload();
            } else {
              alert("Something went wrong.");
              }
            });
          };

    const fetchUserData = () => {
        if (!token) return;
  
        fetch("https://movie-api33-c32ceac54882.herokuapp.com/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((data) => {
            const usersFromApi = data.find((u) => u.username === localUser.Username);
                setUser(usersFromApi);
                setUsername(usersFromApi.Username);
                setPassword(usersFromApi.Password);
                setEmail(usersFromApi.Email);
                setBirthday(usersFromApi.Birthday);
                localStorage.setItem('user', JSON.stringify(usersFromApi));
              })
              .catch((error) => {
                console.error(error);
            });
        };

        useEffect(() =>{
            if (storedUser) {
                setUser(storedUser);
                setUsername(storedUser.Username);
                setPassword(storedUser.Password);
                setEmail(storedUser.Email);
                setBirthday(storedUser.Birthday);
            } else {
                fetchUserData();
            }
        }, []);
        
return (
    <Container>
        <Row>
            <Col xs={12} sm={4}>
                <Card>
                    <Card.Body>
                        <UserInfo  name={ username} email={ email} />
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <UpdateUser 
                        formData={formData} 
                        handleSubmit={ handleSubmit} 
                        handleUpdate={handleUpdate} 
                        handleDeleteAccount={handleDeleteAccount}
                        />
                    </Card.Body>
                </Card>
            </Col>

            <Col xs={12}>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className="mb-5" xs={12}  md={12}>
                        {
                        favoriteMovies && (
                            <FavoriteMovies 
                                user={user} 
                                favoriteMovies={favoriteMovies} 
                                removeFavoriteMovie={removeFavoriteMovie}
                            />)
                        }
                        </Col>
                    </Row>
                </Card.Body>
                </Card>
            </Col>
        </Row>       
    </Container>
)
}

ProfileView.propTypes = {
    localUser: PropTypes.object,
    movies: PropTypes.array,
    token: PropTypes.string
  };
