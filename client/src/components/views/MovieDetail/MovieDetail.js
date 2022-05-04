import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Auth from '../../../hoc/auth';

import MainImage from '../commons/MainImage';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import FavoriteButton from './Sections/FavoriteButton';

function MovieDetail(props) {
    let { movieId } = useParams();
    const [movie, setMovie] = useState([]);
    const [casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        let endpointCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response);
            })

        fetch(endpointCast)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast);
            })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!actorToggle);
    }

    return (
        <>
            <div>

                {/* Header */}

                {movie.backdrop_path &&
                    <MainImage
                        image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
                        title={movie.original_title}
                        text={movie.overview}
                    />}

                {/* Body */}
                <div style={{ width: '85%', margin: '1rem auto' }}>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <FavoriteButton movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />

                    </div>

                    {/* Movie Info */}
                    {movie &&
                        <MovieInfo movieInfo={movie} />}

                    <br />

                    {/* Actors Grid */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>

                        <button onClick={toggleActorView}> Toogle Actor View </button>

                    </div>

                    {actorToggle &&
                        <Row gutter={[16, 16]}>

                            {casts && casts.map((cast, index) => (

                                <React.Fragment key={index} >
                                    <GridCards
                                        image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        castName={cast.name}
                                    />
                                </React.Fragment>
                            ))}

                        </Row>}

                </div>

            </div>
        </>
    )
}

export default Auth(MovieDetail, null);