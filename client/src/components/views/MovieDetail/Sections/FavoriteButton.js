import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd';

function FavoriteButton(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.original_title;
    const moviePoster = props.movieInfo.backdrop_path;
    const movieRunningTime = props.movieInfo.runtime;

    const [favoriteNumber, setFavoriteNumber] = useState('0');
    const [favorited, setFavorited] = useState(false);

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePoster,
        movieRunningTime
        // movieRunnignTime은 movieRunningTime: movieRunningTime과 동일하다.
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('favoriteNumber 정보를 가져오는데 실패했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('좋아요 여부 정보를 가져오는데 실패했습니다.')
                }
            })

    }, [])

    const onClickFavorite = () => {
        if (favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber - 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에서 정보를 삭제하는데 실패했습니다.')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber + 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에 정보를 추가하는데 실패했습니다.')
                    }
                })
        }
    }

    return (
        <>
            <Button onClick={onClickFavorite}>{favorited ? "좋아요 취소" : "좋아요"} {favoriteNumber}</Button>
        </>
    )
}

export default FavoriteButton