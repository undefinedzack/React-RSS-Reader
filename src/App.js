import {useState, useEffect} from 'react'
import Card from './components/cards'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

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
                    <Route path={'/'} exact><Home /></Route>
                    {/*<Route path={'/FeedLinkView/:feedLink'} children={<FeedLinkView />} />*/}
                    <Route path={'/FeedLinkView'} exact component={FeedLinkView} />
                </Switch>


            </Router>
        </>
    )
}

export default App;
