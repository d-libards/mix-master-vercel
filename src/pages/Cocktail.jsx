import { useLoaderData, Link, Navigate, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from '../../context';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const response = await axios.get(`${singleCocktailUrl}${id}`);

      return response.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };
function Cocktail() {
  const { search } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktailQuery(id));

  if (!data || data.drinks === null) return <Navigate to="/" />;

  const singleDrink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith('strIngredient') && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  const handlePreviousSearch = () => {
    navigate(`/?search=${search}`);
  };

  return (
    <Wrapper>
      <header>
        <div className="btn-container">
          <Link to="/" className="btn">
            back home
          </Link>
          {search && (
            <button
              className="btn"
              style={{ background: 'var(--grey-500)' }}
              onClick={handlePreviousSearch}
            >
              previous search
            </button>
          )}
        </div>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {validIngredients.map((ingredient, index) => {
              return (
                <span key={index} className="ing">
                  {ingredient}
                  {index < validIngredients.length - 1 ? ', ' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
export default Cocktail;
