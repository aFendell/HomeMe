import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/styles/styles.scss'

import { routes } from './routes.js'
import { Footer } from './cmps/Footer.jsx';
import { Component } from 'react';
import ScrollToTop from './cmps/ScrollToTop';
import {Header} from  './cmps/Header'


export class App extends Component{


  Header1 = (location) => {
    // console.log(location.location)
    return <div className={location.location === '/' ? "home" : "appp"}><Header/> </div>
  }
  Header2 = () => {
    return <div  className="krapppp main-layout"> <Header /></div>
  }
  
  
  render() {
    
    return (
      <div className="app-screen">
        <Router>
          <ScrollToTop />
          {/* <Header/> */}
          <Switch>
            <Route exact path={['/stay/:stayId', '/user', '/login', '/about']} render={() => <this.Header2 />} />
            <Route path={['/', '/stay']} render={(path) =>  <this.Header1 location={path.location.pathname}/>} />
          </Switch>
          <main className="main-container main-layout">
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}



// Header1 = () => {
//   return <div className="appp main-layout"> <Header/> </div>
// }

// DynamicCmp = (routes) => {
//   switch (routes.url) {
//     case '/':
//       return <this.Header1 />
//     case '/stay':
//       return <this.Header1 />
//     case '/stay/:stayId':
//       return <this.Header2 />
//     case '/stay/:user':
//       return <this.Header2 />
//     case '/stay/:login':
//       return <this.Header2 />
//       default:
//         return console.error('error Header')
//   }
// }
