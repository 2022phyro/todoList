import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from '../router'
import ClassErrorBoundary from './ClassErrorBoundary'

function App() {
  return (
    <ClassErrorBoundary>
      <RouterProvider router={router} />
    </ClassErrorBoundary>
  )
}

export default App