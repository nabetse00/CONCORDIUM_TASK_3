import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import Root from './App'
import './index.css'

//Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/errorPage';
//import { AccountPage } from './pages/AccountPage';
//import { ContractPage } from './pages/btrPage';
import loadable from '@loadable/component';

// component lazy loading

const Account = loadable(() => import('./pages/AccountPage'),
  {
    resolveComponent: (components) => components.AccountPage
  });
const Contract = loadable(() => import('./pages/btrPage'),
  {
    resolveComponent: (components) => components.ContractPage
  });

// Root route
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route
          path="account/"
          element={<Account />}
        />
        <Route
          path="contract/"
          element={<Contract />}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
