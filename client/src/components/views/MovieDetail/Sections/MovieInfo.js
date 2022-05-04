import React from 'react'
import { Descriptions, Badge } from 'antd';

function MovieInfo(props) {
    let { movieInfo } = props;

    return (
        <Descriptions>
            <Descriptions.Item label="Title">{movieInfo.original_title}</Descriptions.Item>
            <Descriptions.Item label="Release_date">{movieInfo.release_date}</Descriptions.Item>
            <Descriptions.Item label="Revenue">{movieInfo.revenue}</Descriptions.Item>
            <Descriptions.Item label="Runtime">{movieInfo.runtime}</Descriptions.Item>
            <Descriptions.Item label="Vote_average" span={2}>{movieInfo.vote_average}</Descriptions.Item>
            <Descriptions.Item label="Vote_count">{movieInfo.vote_count}</Descriptions.Item>
            <Descriptions.Item label="Status">{movieInfo.status}</Descriptions.Item>
            <Descriptions.Item label="Popularity">{movieInfo.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo