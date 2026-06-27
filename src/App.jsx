import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop'
import CustomCursor from './components/ui/CustomCursor'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'

function App() {
  return (
    <BrowserRouter>
      {/* Custom cursor is mounted once, outside route tree, so it persists
          across page transitions without unmounting / remounting. */}
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        {/* Future routes: /privacy, /terms, /portfolio/:id */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
