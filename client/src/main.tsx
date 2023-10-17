import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './shared/contexts/AuthContext';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/theme/index.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faHeart, faTag, faStar, faGem, faCartShopping, faBars, 
  faUserTag, faTimes, faBell, faUser, faAngleRight, faAngleLeft, faSearch, 
  faList, faTags, faClock, faUserAlt, faStore, faSackDollar, faReceipt, faRightFromBracket, faTools} 
from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(faHome, faHeart, faTag, faStar, faGem, faCartShopping, faBars, faUserTag, faTimes, 
  faBell, faUser, faTwitter, faYoutube, faInstagram, faAngleRight, faAngleLeft, faSearch, faList,
  faTags, faClock, faUserAlt, faStore, faSackDollar, faReceipt, faRightFromBracket, faTools);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)

