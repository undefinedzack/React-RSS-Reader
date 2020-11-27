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

    const deleteURL = async (feed) => {
        await fetch(`https://vast-ocean-32435.herokuapp.com/api/urlz-delete/${feed.id}/`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        fetchUrls()
    }

    return (
        <>
            <div className={"container"}>
                <form className={"my-5"} onSubmit={handleSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-auto my-1">
                            <label htmlFor="rssLink" className={"col-form-label col-form-label-lg"}>RSS Link</label>
                        </div>
                        <div className="col-sm-9 my-1">
                            <input type="text" className="form-control" id="rssLink"
                                   aria-describedby="rssLinkHelp" onChange={handleChange}/>
                        </div>
                        <div className="col-auto my-1">
                            <button type="submit" className="btn btn-info">Add Feed</button>
                        </div>
                    </div>

                </form>

                {userFeeds.map( (feed) => {
                    return(
                        <div key={feed.id} className={"container"}>
                            <div className={"row"}>
                                <div className={"col-10"}>
                                    <Link to={{
                                        pathname : '/FeedLinkView',
                                        state:{
                                            url: feed.urlz
                                        }
                                    }}><h1>{feed.urlz}</h1>
                                    </Link>
                                </div>
                                <div className={"col-2"}>
                                    <button onClick={ () => {deleteURL(feed)} } className="btn badge badge-pill badge-info">X</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home
