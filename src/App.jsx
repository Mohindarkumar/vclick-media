import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/HomePage'

// v1 ships as a single-page scrolling site (see build brief §5).
// react-router-dom is wired up now so a future /portfolio deep-dive page
// or /privacy, /terms legal pages can be added without restructuring.
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* TODO: future routes, e.g. <Route path="/portfolio" element={<PortfolioPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
