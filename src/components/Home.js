import React, {useState, useEffect} from 'react'
import {URLS} from "../shared/URLS";
import {Link} from "react-router-dom";

const Home = () => {

    const [feedLink, setFeedLink] = useState({})
    const [userFeeds, setUserFeeds] = useState([])

    useEffect(() => {
        fetchUrls()
    },[])

    const fetchUrls = async () => {
        const response = await fetch('https://vast-ocean-32435.herokuapp.com/api/urlz/')
        const urls = await response.json()

        setUserFeeds(urls)
    }

    const handleChange = (e) => {
        const value = e.target.value

        setFeedLink({
            urlz : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let url = 'https://vast-ocean-32435.herokuapp.com/api/urlz-create/'

        await fetch(url,{
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(feedLink)
        })

        console.log(JSON.stringify(feedLink))

        fetchUrls()
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

                {userFeeds.map( (feed) => {
                    return(
                        <div key={feed.id} className={"container"}>
                            <Link to={{
                                pathname : '/FeedLinkView',
                                state:{
                                    url: feed.urlz
                                }
                            }}><h1>{feed.urlz}</h1></Link>


                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home
