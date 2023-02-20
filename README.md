# myMov-client

Client-side application for the the custom Movie API (more info at https://github.com/RocinRykor/Movie-API

### Deployment:
Live Version of the site hosted at https://rocin-mymov.netlify.app/

### Dependencies:
- bootstrap 5.2.3
- prop-types 15.8.1
- react 18.2.0
- react-bootstrap 2.7.1
- react-dom 18.2.0
- react-icons 4.7.1
- react-router 6.8.1
- react-router-dom 6.8.1
- redux 4.2.1

Dev Dependencies
- @parcel/transformer-sass 2.8.3
- parcel 2.8.3
- process 0.11.10"

### Features:
#### Implemented:
Main view
- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

Single Movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites
- Display a list of related or similar movies

Login view
- Allows users to log in with a username and password

Signup view
- Allows new users to register (username, password, email, date of birth)

Profile view
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

#### Planned:
Actors view
- Allows users to view information about different actors

Genre view
- Returns data about a genre, with a name and description
- Displays example movies

Director view
- Returns data about a director (name, bio, birth year, death year)
- Displays example movies from the director

Single Movie view (optional features)
- Allow users to see which actors star in which movies
- Allow users to view more information about different movies, such as the release date and the movie rating
- Allow users to access different movie information, such as genre description and director bio, without leaving the view (e.g., tooltips)
- Allow users to share a movie

Main view (optional features)
- Allow users to sort movies based on different criteria

Profile, Single Movie, and Main views (optional features)
- Allow users to create a “To Watch” list in addition to their “Favorite Movies” list
