import Wrapper from '../assets/wrappers/SearchForm';
import { Form, useNavigation } from 'react-router-dom';

function SearchForm({ searchTerm }) {
  const navigation = useNavigation();
  const isSearching = navigation.status === 'submitting';
  return (
    <Wrapper>
      <Form className="form">
        <input
          type="search"
          name="search"
          className="form-input"
          defaultValue={searchTerm}
        />
        <button type="submit" disabled={isSearching} className="btn">
          {isSearching ? 'searching...' : 'search'}
        </button>
      </Form>
    </Wrapper>
  );
}
export default SearchForm;
