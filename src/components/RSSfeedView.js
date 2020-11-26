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

    render() {

        const feedy = this.state.feed

        return(
            <>
                <p>{console.log('feedy',feedy)}</p>

                <div className={"container"}>
                    {/*{this.state.isLoaded && <img className={"rounded mx-auto d-block"} src={feedy.image.url} height={"500px"}/>}*/}

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
