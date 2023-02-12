import {
  //BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Link,
  // unstable_HistoryRouter as HistoryRouter,
  // useLocation
} from 'react-router-dom';

import React from "react";

import './App.css';

import ListView from './views/ListView';
import ItemView from './views/ItemView';
import EditView from './views/EditView';

import { sharepoint } from './utils/util';
import { dummy } from './utils/util';

function App() {
  const [host, setHost] = React.useState(window.location.host);
  let myAPI;
  console.log(host)

  if (host === 'localhost:3000'){
    myAPI = dummy;
  } else {
    myAPI = sharepoint;
  }

  return (
    <div className="container h-100">
      <HashRouter>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Navbar</Link>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/edit">Post</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main className="h-75">
            <Routes>
              <Route index element={<ListView API={myAPI} />} />
              <Route path="/item/:entryId" element={<ItemView API={myAPI} />} />
              <Route path="/edit" element={<EditView API={myAPI} />} />
              <Route path="/edit/:entryId" element={<EditView API={myAPI} />} />
            </Routes>
        </main>
      </HashRouter>
    </div>
  );
}

export default App;
