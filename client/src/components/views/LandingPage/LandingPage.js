import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Auth from '../../../hoc/auth';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [mainMovieImage, setMainMovieImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        //     axios.get(endpoint)
        //         .then(response => {
        //             console.log(response);
        //             setMovies(response.results)
        //             setMainMovieImage(response.results[0])
        //         })
        // }, [])

        fetchMovies(endpoint);
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setMovies([...movies, ...response.results])
                setMainMovieImage(mainMovieImage || response.results[0])
                setCurrentPage(response.page)
            })
    };

    const loadMoreMovies = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;

        fetchMovies(endpoint);
    }

    return (
        <>
            <div style={{ width: '100%', margin: '0' }}>

                {/* Main Page */}
                {mainMovieImage &&
                    <MainImage
                        image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
                        title={mainMovieImage.original_title}
                        text={mainMovieImage.overview}
                    />}

                <div style={{ width: '85%', margin: '1rem auto' }}>

                    <h2>Movies by latest</h2>
                    <hr />

                    {/* Movie Grid Cards */}
                    <Row gutter={[16, 16]}>

                        {movies && movies.map((movie, index) => (

                            <React.Fragment key={index} >
                                <GridCards
                                    LandingPage
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))}

                    </Row>

                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreMovies}>Load More</button>
                </div>

            </div>
        </>
    )
}

export default Auth(LandingPage, null);