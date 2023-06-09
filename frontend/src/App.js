import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'


import './assets/styles/styles.scss'


import { store } from './store/store'

import { About } from './views/about'
import { Home } from './views/home'
import { ToyDetails } from './views/toy-details'
import { ToyIndex } from './views/toy-index'
import { UserProfile } from './views/user-profile'
import { ToyDashboard } from './views/toy-dashboard';

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserMsg } from './cmps/user-msg'
import { ToyEdit } from './views/toy-edit'


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='app main-layout'>
          <AppHeader />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/toy' element={<ToyIndex />} />
              <Route path='/toy/details/:toyId' element={<ToyDetails />} />
              <Route path='/toy/edit' element={<ToyEdit />} />
              <Route path='/toy/edit/:toyId' element={<ToyEdit />} />
              <Route path='/userProfile/:userId' element={<UserProfile />} />
              <Route path='/dashboard' element={<ToyDashboard />} />
            </Routes>
          </main>
          <AppFooter />
          <UserMsg />
        </section>
      </Router>
    </Provider >
  )
}