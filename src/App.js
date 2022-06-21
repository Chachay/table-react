import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // unstable_HistoryRouter as HistoryRouter,
  // useLocation
} from 'react-router-dom';

import './App.css';

import ListView from './views/ListView';
import ItemView from './views/ItemView';
import EditView from './views/EditView';

import { sharepoint } from './util';

function App() {
  return (
    <div className="container h-100">
      <BrowserRouter>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to={`${sharepoint.basePath}`}>Navbar</Link>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to={`${sharepoint.basePath}/edit`}>Post</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main className="h-75">
            <Routes>
              <Route path={`${sharepoint.basePath}`} element={<ListView API={sharepoint} />} />
              <Route path={`${sharepoint.basePath}/index.aspx`} element={<ListView API={sharepoint} />} />
              <Route path={`${sharepoint.basePath}/item/:entryId`} element={<ItemView API={sharepoint} />} />
              <Route path={`${sharepoint.basePath}/edit`} element={<EditView API={sharepoint} />} />
              <Route path={`${sharepoint.basePath}/edit/:entryId`} element={<EditView API={sharepoint} />} />
            </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
