import Header from './Header';
import Footer from './Footer';
import PropsTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <div className="w-full dark:bg-dark-backgr">
        <Header />
        {children}
        <Footer />
    </div>
  )
}

MainLayout.propTypes = {
    children: PropsTypes.any
}
export default MainLayout