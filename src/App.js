import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/home'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import SearchResult from './components/search-result'
import Anime from './components/anime'
import Profile from './components/profile'
import Login from './components/login'
import SignUp from './components/sign-up'
import SearchBar from './components/search-bar'
import searchReducer from './reducers/search-reducer'

const combinedReducer = combineReducers({
  searchReducer
})

const store = createStore(combinedReducer)

function App() {

  return (
    <BrowserRouter>
    <Provider store = {store}>
    <div className="App">
      <Route path={["/", "/search/anime"]} exact={true}>
        <SearchBar/>
      </Route>
      <Route path={["/", "/search/anime"]} exact={true}>
        <Home/>
      </Route>
      <Route path="/search/anime:text(\\?text=.*)?" exact={false}>
        <SearchResult/>
      </Route>
      <Route path="/anime/:animeId" exact={true}>
        <Anime/>
      </Route>
      <Route path="/profile" exact={true}>
        <Profile/>
      </Route>
      <Route path="/login" exact={true}>
        <Login/>
      </Route>
      <Route path="/signup" exact={true}>
        <SignUp/>
      </Route>
    </div>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
