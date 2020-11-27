import React, { Component, useEffect } from 'react'
import Card from "./cards";

let Parser = require('rss-parser');
let parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class RSSfeedView extends Component{
    constructor(props) {
        super(props)
        this.state = {
            userFeeds : [props.feed],
            feed : [],
            isLoaded : false
        }
    }



    componentDidMount() {
        console.log('lol')
        this.requestFeeds()
    }

    requestFeeds = async() => {
        this.state.userFeeds.map( (feed) => {
            return( parser.parseURL(CORS_PROXY + feed, (err, parsedFeed) => {
                this.setState(
                    {
                        feed: parsedFeed,
                        isLoaded : true
                    }
                )
            }) )
        })
    }

    checkAvailability = (feed) => {
        if (feed.image !== undefined)
            return true
        else
            return false
    }

    render() {

        const feedy = this.state.feed

        return(
            <>
                <p>{console.log('feedy',feedy)}</p>

                <div className={"container"}>

                    <div className="jumbotron">
                        <div className="container">

                            {this.state.isLoaded ||
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                            }
                            <div className={"row"}>
                                {this.state.isLoaded && (this.checkAvailability(feedy) &&
                                    <div className={"col-4"}>
                                         <img className={"rounded"} height={"auto"} width={"100%"} src={feedy.image.url} />
                                    </div>
                                )}
                                <div className={"col-8"}>
                                    <h1 className="display-4">{feedy.title}</h1>
                                    <a className="lead">{feedy.feedUrl || feedy.link}</a>
                                </div>
                            </div>



                        </div>
                    </div>

                    {this.state.isLoaded && feedy.items.map( (item,index) => {
                        return(
                            <Card key={index} item={item} />
                        )
                    })}
                </div>

            </>
        )
    }

}

export default RSSfeedView
