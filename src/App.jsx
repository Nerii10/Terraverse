//Frameworks
import { useState } from 'react'


//Pages
import Navbar from './components/Nav/Navbar'
import Home from './pages/Home/Home'


//Styles
import './App.css'
import Bestiary from './pages/Bestiary/Bestiary'
import Items from './pages/Items/Items'

function App() {

  const [CurrentPage, setCurrentPage] = useState("Home")

  function RenderPage() {
    switch (CurrentPage) {
      case "Home":
        return <Home></Home>
      case "Bestiary":
        return <Bestiary></Bestiary>
      case "Items":
        return <Items></Items>
      case "Biomes":
        return <h1>Biomy</h1>
      case "Wordle":
        return <h1>Wordle</h1>
      default:
        return <h1>Nie znaleziono strony</h1>
    }
  }


  return (
    <>
      <Navbar setCurrentPage={setCurrentPage}></Navbar>

   
    <div style={{ backgroundColor: 'var(--secondBackground)', width:'100%', display:'flex', justifyContent:'center', flexDirection:"column", alignItems:'center'}}>

        <RenderPage></RenderPage>
        
      </div>

      <footer className="Footer">
                <p>© 2025 Terraverse — created by <a href="https://github.com/nerii10">nerii10</a></p>
                <p>
                <a href="#">Report an issue</a> | <a href="#">Contact</a> | <a href="#">Privacy Policy</a>
                </p>
      </footer>
    </>
  )
}

export default App
