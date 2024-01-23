import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import ProductsPage from './ProductsPage';
import Navbar from './Navbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<>
    <Navbar/>
    <ProductsPage/></>
    )
  },
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;