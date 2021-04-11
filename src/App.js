import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/home'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Search from './components/search'
import Details from './components/details'
import Profile from './components/profile'
import Login from './components/login'
import homeReducer from './reducers/home-reducer'

const store = createStore(homeReducer)

function App() {

  return (
    <BrowserRouter>
    <Provider store = {store}>
    <div>
      <Route path="/" exact={true}>
        <Home/>
      </Route>
      <Route path="/search" exact={true}>
        <Search/>
      </Route>
      <Route path="/details" exact={true}>
        <Details/>
      </Route>
      <Route path="/profile" exact={true}>
        <Profile/>
      </Route>
      <Route path="/login" exact={true}>
        <Login/>
      </Route>
    </div>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
