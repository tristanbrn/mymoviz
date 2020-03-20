import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'reactstrap';
import Header from './Navbar';
import Movie from './Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function App() {

  const [globalCounterLikes, setGlobalCounterLikes] = useState(0);

  var handleLikeParent = (isLiked)=> {
    setGlobalCounterLikes(globalCounterLikes+1);
    console.log(isLiked);
  }





  const[listWishlist, setListWishlist] = useState([]);

  var handleWishParent = async ()=> {
    var movieWishlist = await fetch('/wishlist');
    var response = await movieWishlist.json();

    setListWishlist(response);
  }





  var handleTrashParent = async (id)=> {
    await fetch(`/wishlist/${id}`, {
      method: 'DELETE'
    });  
    handleWishParent();
  }





  var wishList = listWishlist.map((movie,i) => {
    return(
    <div className="wish-element" key={i}>
      <img width="120px" src={movie.img} alt={movie.title}/>
      <p>{movie.title}</p>
      <button className="trash" onClick={ ()=> handleTrashParent(movie._id) }><FontAwesomeIcon icon={faTrash} /></button>
    </div>
    )
  })






  const [moviesData, setMoviesData] = useState([]);

  useEffect( ()=> {

    async function fetchData() {
      var moviesApi = await fetch('/import');
      var response = await moviesApi.json();

      setMoviesData(response);

    }
    fetchData();
    handleWishParent();

  }, []);






  var moviesList = moviesData.map((movie,i) => {


    let movieImg;
    if(movie.poster_path !== '') {
      movieImg = movie.backdrop_path
    } else {
      movieImg = '/generique.jpg';
    }

    return(<Movie 
        key={i}
        movieName={movie.title} 
        movieDesc={movie.overview.substring(0, 100) + "..."}
        movieImg={'https://image.tmdb.org/t/p/w500'+movieImg}
        countVotes={movie.vote_count}
        globalCountRating={movie.vote_average}
        handleLikeParent={handleLikeParent}
        handleWishParent={handleWishParent}
        handleTrashParent={handleTrashParent}
      />
    )
  });

  

  console.table(moviesData);
 
  return (
    <div>
      <Header globalCounterLikes={globalCounterLikes} wishList={wishList} />
      <Container>
        <Row>
          {moviesList}
        </Row>
      </Container>
    </div>
  );
}
export default App;
