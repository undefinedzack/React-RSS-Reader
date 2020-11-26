import React, {useState, useEffect} from 'react'
import {URLS} from "../shared/URLS";
import {BrowserRouter as Router, Link} from "react-router-dom";
import RSSfeedView from "./RSSfeedView";

const Home = () => {

    const [feedLink, setFeedLink] = useState('')
    const [userFeeds, setUserFeeds] = useState([...URLS])

    const handleChange = (e) => {
        const value = e.target.value

        setFeedLink(value)
        console.log(feedLink)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setUserFeeds([...userFeeds, feedLink])
        console.log(userFeeds)
    }

    return (
        <>
            <div className={"container"}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rssLink">RSS Link</label>
                        <input type="text" className="form-control" id="rssLink"
                               aria-describedby="rssLinkHelp" onChange={handleChange}/>
                        <button type="submit" className="btn btn-primary">Add Feed</button>
                    </div>
                </form>

                {userFeeds.map( (feed, index) => {
                    return(
                        <div key={index} className={"container"}>
                            {/*<Link to={`/FeedLinkView/${feed}`}><h1>{feed}</h1></Link>*/}
                            <Link to={{
                                pathname : '/FeedLinkView',
                                state:{
                                    url: feed
                                }
                            }}><h1>{feed}</h1></Link>


                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home
