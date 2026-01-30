import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css';
import './styles/responsive.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Products from './Pages/Products.jsx';
import Landing from './Pages/Landing.jsx';
import Details from './Pages/Details.jsx';
import Success from './Pages/Success.jsx';
import Cancel from './Pages/Cancel.jsx';
import NotFound from './Pages/NotFound.jsx';
import Collection from './Pages/Collection.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/products',
        element: <Products/>
      },
      {
        path: '/details/:id',
        element: <Details />
      },
			{
				path: '/collections/:slug',
				element: <Collection />
			},
			{
				path: '/success',
				element: <Success />
			},
			{
				path: '/cancel',
				element: <Cancel />
			},
			{
				path: '*',
				element: <NotFound />
			}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>,
)
