import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import AdminLayout from './layouts/admin'
import PublicLayout from './pages/admin/public'
import Home from './pages/public'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
