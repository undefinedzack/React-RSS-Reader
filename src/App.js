import {useState, useEffect} from 'react'
import Card from './components/cards'

import { BrowserRouter as Router, Switch} from 'react-router-dom'

import RSSfeedView from "./components/RSSfeedView";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import FeedLinkView from "./components/FeedLinkView";

let Parser = require('rss-parser');
let parser = new Parser();


function App() {

    return (
        <>
            <Router>
                <NavigationBar />

                <Switch>
                    <Home />
                    <FeedLinkView fe />
                </Switch>


            </Router>
        </>
    )
}

export default App;
