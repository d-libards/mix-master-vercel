import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const value = 'something';
  return (
    <>
      <Navbar />
      <section className="page">
        {isPageLoading ? (
          <div className="loading" style={{ margin: '0 auto' }} />
        ) : (
          <Outlet context={{ value }} />
        )}
      </section>
    </>
  );
}
export default HomeLayout;
