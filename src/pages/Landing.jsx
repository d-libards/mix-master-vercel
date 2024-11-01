import { useLoaderData } from 'react-router-dom';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from '../../context';
import { useEffect } from 'react';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function searchCocktailsQuery(searchTerm) {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      searchTerm = searchTerm || 'all';

      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get('search');
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    return { searchTerm };
  };

function Landing() {
  const { setSearch } = useGlobalContext();
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
}
export default Landing;
