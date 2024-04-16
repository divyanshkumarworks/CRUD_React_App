import { lazy, Suspense, useState, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProjectsPage = lazy(() => import('src/pages/projects')); 
export const EmployeePage = lazy(() => import('src/pages/employee'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SignInPage = lazy(() => import('src/pages/signIn'))

// ----------------------------------------------------------------------

export default function Router() {
  const [token, setToken] = useState(false);

  useEffect(()=>{
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token))
    }

    console.log(token)
  },[token])
  

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])


  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'projects', element: <ProjectsPage />}, 
        { path: 'employee', element: <EmployeePage />}
      ],
    },
    {
      path: 'signin',
      element: <SignInPage setToken={setToken} />,
      
    },
    {
      path: 'login',
      element: <LoginPage {...setToken} />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes
}
