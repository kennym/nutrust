import { Link } from 'react-router-dom'
import logo from '../assets/brand.svg';
  
const Navbar = (props:any) => {
  
  return (
    <>
      <nav className='fixed left-0 top-0 w-full h-14 border border-transparent border-b-gray-500 flex justify-between items-center px-14 font-normal bg-gray-800 text-sm text-gray-100 z-50'>
        <div className="flex items-center">
          <img onClick={() => window.location.href='/'} src={logo} alt="NuTrustX Logo PNG" className="brand w-8 mr-12 cursor-pointer"/>
          <Link to='/products' className=' mr-12'>Products</Link>
          <Link to='/challenges' className=' mr-12'>Become a Trader</Link>
        </div>
        <div className="flex items-center">
            {
              !props.user__ &&
              <>
                <Link to='/register'>Sign In</Link>
                <Link to='/register' className='py-2 px-7 bg-green-500'>Be Trader</Link>
              </>
            }
            {
              props.user__ &&
              <p>Account(Handle)</p>
            }
        </div>
      </nav>
    </>
  );
};
export default Navbar;


/**
 * <Link to='/plans' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">Challenges</Link>
          <Link to='/faqs' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">FAQs</Link>
          <Link to='/how' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">How it Works</Link>
 */