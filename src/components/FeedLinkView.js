import React, {useEffect} from 'react'
import RSSfeedView from "./RSSfeedView"

import {useParams} from 'react-router-dom'

const FeedLinkView = (props) => {

    // const {feedLink} = useParams()
    const feedLink = props.location.state.url
    console.log('url',feedLink)


    useEffect(() => {
         console.log('feedlink',feedLink)
    },[])

    return(
        <RSSfeedView feed={feedLink} />
    )
}

export default FeedLinkView
