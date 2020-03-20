import React, {useState} from 'react';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faStar } from '@fortawesome/free-solid-svg-icons'

  const Movie = (props) => {

    /// Evènements click notes
    const [myNote, setMyNote] = useState(0);
    const [myNoteOver, setMyNoteOver] = useState(0);
    const [myVote, setMyVote] = useState(false);
    var handleMyNoteDown = () => {
        if(myNote > 0) {
            setMyNote(myNote-1);
        }
        if(myNote === 1){
            setMyVote(false);
        }
    }
    var handleMyNoteUp = () => {
        if(myNote < 10) {
            setMyNote(myNote+1);
            setMyVote(true);
        }
    }
    var handleMyNoteClickStars = (count) => {
            setMyNote(count);
            setMyVote(true);
    }

    var handleOverStars = (count) => {
        setMyNoteOver(count);
        //console.log(myNoteOver);
    }

    /// Ma note en étoiles
    var myRating = [];
    for(let i=0;i<10;i++) {
        let color = {};
        if(i < myNote || i < myNoteOver) {
            color = {color:'#ffc862'};
        }
        let count = i + 1;
        myRating.push(<FontAwesomeIcon key={i} style={color} onClick={() => handleMyNoteClickStars(count)} onMouseEnter={() => handleOverStars(count)} onMouseLeave={() => handleOverStars(count)} icon={faStar} />);
    }

    /// Compteur de votes
    var allVotes = props.countVotes;
    if(myVote === true) {
        allVotes = allVotes + 1;
    }

    /// Calcul de la moyenne des notes
    var averageRating;
    if(myNote > 0) {
        averageRating = Math.round((props.countVotes * props.globalCountRating + myNote) / (props.countVotes + 1));
    } else {
        averageRating = props.globalCountRating;
    }

    /// La note globale en étoile
    var globalCountRating = [];
    for(let i=0;i<10;i++) {
        let color = {};
        if(i < averageRating) {
            color = {color:'#ffc862'};
        }
        globalCountRating.push(<FontAwesomeIcon key={i} style={color} icon={faStar} />);
    }

    /// Evènements du compteur de likes
    const [likeMovie, setLikeMovie] = useState(false);

    var handleLikeClick = ()=> {
        setLikeMovie(!likeMovie);
        props.handleLikeParent(likeMovie); 
        console.log(likeMovie);
    }
    

    var handleWishClick = async (title,img)=> { 

        await fetch('/wishlist', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `title=${title}&img=${img}`
        });

        props.handleWishParent(); 
    }


    /// Changement de couleur
    var colorLikeButton;
    if(likeMovie) {
        colorLikeButton = { backgroundColor: "#ff5826" };
    } else {
        colorLikeButton = { backgroundColor: "#bdbdbd" };
    }

    var colorWishButton;
    if(props.isWished) {
        colorWishButton = { backgroundColor: "#6fd289" };
    } else {
        colorWishButton = { backgroundColor: "#bdbdbd" };
    }

    /// Inline styles
    var movieCard = {
        margin: '1em 0'
    };

    return (
        <Col xl="4" md="6" xs="12" style={movieCard}>
            <article className="movie-element">
                <button className="like" onClick={ ()=> handleLikeClick() } style={colorLikeButton}><FontAwesomeIcon icon={faHeart} color="white" /></button>

                <button className="wishlist" onClick={ ()=> handleWishClick(props.movieName, props.movieImg) } style={colorWishButton}><FontAwesomeIcon icon={faBookmark} color="white" /></button>

                <img width="100%" src={props.movieImg} alt={props.movieName}/>
                <div className="movie-text">             
                    <h1>{props.movieName}</h1>
                    <p>{props.movieDesc}</p>       
                    <div>
                        <span>Mon avis {myRating}</span>
                        <button className="plus" onClick={ ()=>handleMyNoteDown() }>-</button>
                        <button className="moins" onClick={ ()=>handleMyNoteUp() }>+</button>
                    </div>
                    <div>Moyenne {globalCountRating} ({allVotes})</div>
                </div>
            </article>
        </Col>
    );
  }

  export default Movie;