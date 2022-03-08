import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PageHolder } from 'components/PageHolder'
import { NotFound } from 'pages/NotFound'

const LazyLoadedPortfolio = lazy(() => import('pages/Portfolio'))

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageHolder />}>
              <LazyLoadedPortfolio />
            </Suspense>
          }
        />
        <Route element={NotFound} />
      </Routes>
    </BrowserRouter>
  )
}
