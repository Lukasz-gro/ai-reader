import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from '@/shared/interface/web/react/routes'

function App() {
  const routing = useRoutes(routes)

  return (
    <main>
      {routing}
    </main>
  )
}

export { App }
