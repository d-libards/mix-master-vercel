import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  HomeLayout,
  About,
  Landing,
  Error,
  Newsletter,
  Cocktail,
  SingleErrorPage,
} from './pages';

import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/NewsLetter';
import { AppProvider } from '../context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: landingLoader(queryClient),
        errorElement: <SingleErrorPage />,
        element: <Landing />,
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        errorElement: <SingleErrorPage />,
        action: newsletterAction,
      },
      {
        path: 'cocktail/:id',
        errorElement: <SingleErrorPage />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  );
};
export default App;
