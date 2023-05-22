// import logo from './logo.svg';

import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/css/main.css';

import { store } from './store/store';

import { About } from './views/about'
import { Home } from './views/home'
import { ToyDetails } from './views/toy-details'
import { ToyIndex } from './views/toy-index'
import { UserProfile } from './views/user-profile'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserMsg } from './cmps/user-msg'


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='app'>
          <AppHeader />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/toy' element={<ToyIndex />} />
              <Route path='/toy/details' element={<ToyDetails />} />
              <Route path='/userProfile/:userId' element={<UserProfile />} />
            </Routes>
          </main>
          <AppFooter />
          <UserMsg />
        </section>
      </Router>
    </Provider >
  )
}