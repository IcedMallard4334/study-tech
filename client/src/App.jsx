import './App.css'
import Login from './pages/Auth/Login'
import HomePage from './pages/Dashboard/HomePage'
import NavBar from './pages/Navigation/NavBar'

function App() {
  return (
    <>
      <NavBar active="home" />
      <HomePage />
    </>
  )
}

export default App