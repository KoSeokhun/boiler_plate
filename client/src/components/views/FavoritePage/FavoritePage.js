import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Auth from '../../../hoc/auth';
import './FavoritePage.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoritedMovie();
    }, []);

    const fetchFavoritedMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites);
                } else {
                    alert('좋아하는 영화 정보를 불러오는데 실패했습니다.')
                }
            })
    }

    const onClickDeleteHandler = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoritedMovie();
                } else {
                    alert('영화를 좋아요 목록에서 삭제하는데 실패했습니다.')
                }
            })
    }

    const renderCards = favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePoster ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePoster}`}
                        alt={`${IMAGE_BASE_URL}w500${favorite.moviePoster}`} /> : "no image"}
            </div>
        )

        return <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunningTime}</td>
            <td><button onClick={() => onClickDeleteHandler(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>
    })


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> My Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove From Favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default Auth(FavoritePage, true);