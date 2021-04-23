import './App.css';
import {BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import Home from './components/home'
import SearchResult from './components/search-result'
import AnimeDetail from './components/anime-detail'
import Profile from './components/profile'
import Login from './components/login'
import SignUp from './components/sign-up'
import NavBar from './components/nav-bar'
import SearchBar from './components/search-bar'
import searchReducer from './reducers/search-reducer'
import sessionReducer from './reducers/session-reducer'

const combinedReducer = combineReducers({
  searchReducer,
  sessionReducer
})

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['sessionReducer']
}

const persistedReducer = persistReducer(rootPersistConfig, combinedReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

function App() {

  return (
    <BrowserRouter>
    <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
    <div className="App">

      <Route path={["/", "/search/anime"]} exact={true}>
        <NavBar/>
        <SearchBar/>
      </Route>

      <Route path="/" exact={true}>
        <Home/>
      </Route>

      <Route path="/search/anime" exact={true}>
        <SearchResult/>
      </Route>

      <Route path="/anime/:animeId" exact={true}>
        <NavBar/>
        <AnimeDetail/>
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
    </PersistGate>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
