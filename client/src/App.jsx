import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GlobalContext from './context/GlobalContext';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from './layout/MainLayout';
import MainPage from './pages/MainPage/MainPage';
import ShowPage from './pages/ShowPage/ShowPage';
import OwnersPage from './pages/OwnersPage/OwnersPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';





function App() {

  const [houses, setHouses] = useState([])
  const [searchedCity, setSearchedCity] = useState('')





  return (
    <>
      <GlobalContext.Provider value={{ houses, setHouses, searchedCity, setSearchedCity }}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/:id" element={<ShowPage />} />
              <Route path='/owners' element={<OwnersPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>

    </>
  )
}

export default App
