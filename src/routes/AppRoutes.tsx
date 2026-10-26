import { Route, Routes } from 'react-router-dom'
import AdminRoute from './AdminRoute'
import AdminPage from '../pages/admin/AdminPage'
import BrowsePage from '../pages/browse/BrowsePage'
import GenreDetailPage from '../pages/genres/GenreDetailPage'
import GenresPage from '../pages/genres/GenresPage'
import HomePage from '../pages/home/HomePage'
import HowItWorksPage from '../pages/HowItWorksPage'
import LoginPage from '../pages/auth/LoginPage'
import ManhwaDetailPage from '../pages/manhwa/ManhwaDetailPage'
import NotFoundPage from '../pages/NotFoundPage'
import ReaderPage from '../pages/reader/ReaderPage'
import SearchPage from '../pages/search/SearchPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explorar" element={<BrowsePage />} />
      <Route path="/buscar" element={<SearchPage />} />
      <Route path="/generos" element={<GenresPage />} />
      <Route path="/generos/:genreSlug" element={<GenreDetailPage />} />
      <Route path="/manhwa/:slug" element={<ManhwaDetailPage />} />
      <Route
        path="/manhwa/:slug/capitulo/:chapterSlug"
        element={<ReaderPage />}
      />
      <Route path="/lector" element={<ReaderPage />} />
      <Route path="/como-funciona" element={<HowItWorksPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
