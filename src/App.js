
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Characters';
import Detail from './pages/CharacterDetails';
import Episode from './pages/Episode';
import EpisodeDetail from './pages/EpisodeDetail';
import Location from './pages/Location';
import LocationDetail from './LocationDetail';
import {AiOutlineBars} from 'react-icons/ai'
function App() {
  return (
    <Router>
    

      <nav className="navbar navbar-expand-lg bg-primary d-flex align-items-center justify-content-between">
        <div className='container'>
                 <Link to="/" className='navbar-brand text-decoration-none ms-2 fw-bolder text-white'>Ricky And Morty</Link> 
  <button className="navbar-toggler btn btn-success bg-white" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="">
      <AiOutlineBars/>
    </span>
    </button>
        </div>


  <div className="collapse navbar-collapse me-4 " id="navbarNav">
    <ul className="navbar-nav p-2">
  
      <li className="nav-item active pe-2">
      <Link  className='text-decoration-none text-white font-weight-bolder text-sm  fw-bold' to="/">Characters</Link>
      </li>
      <li className="nav-item pe-2">
      <Link className='text-decoration-none text-white  font-weight-bolder fw-bold' to="/episode">Episode</Link>
      </li>
      <li className="nav-item pe-2">
      <Link  className='text-decoration-none text-white font-weight-bolder fw-bold'to ="/location">Location</Link>
      </li>
      
    </ul>
  </div>
</nav>


      <div>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/character/:id' element={<Detail />} />
          <Route path='/episode' element={<Episode />} />
          <Route path='/episode/:id' element={<EpisodeDetail />} />
          <Route path='/location' element={<Location/>}/>
          <Route path='location/:id' element={<LocationDetail/>}/>
        </Routes>
      </div>
    </Router>
  );
}





export default App;
