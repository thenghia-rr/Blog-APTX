import Header from './Header';
import Footer from './Footer';
import PropsTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  )
}

MainLayout.propTypes = {
    children: PropsTypes.any
}
export default MainLayout