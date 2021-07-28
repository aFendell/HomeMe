import { HashRouter as Router, Route } from 'react-router-dom'

import './assets/styles/styles.scss'

import { routes } from './routes.js'
import { Footer } from "./cmps/Footer.jsx";
import { Component } from 'react';
import ScrollToTop from './cmps/ScrollToTop';
// import {Header} from  './cmps/Header'


export class App extends Component {  

  render() {
    return (
      <div className="app-screen">
        <Router>
          <ScrollToTop/>
          {/* <Header/> */}
          <main className="main-container main-layout">
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </main>
          <Footer/>
        </Router>
      </div>
    );
  }
}