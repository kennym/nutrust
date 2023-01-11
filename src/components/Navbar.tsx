import { Link } from 'react-router-dom'
import logo from '../assets/brand.svg';
  
const Navbar = (props) => {
  
  return (
    <>
      <nav className="z-50 fixed left-0 top-0 border border-transparent border-b-gray-700 w-full h-14 flex justify-between items-center px-5 backdrop-blur-3xl">
        <div className="flex items-center">
          <img className="w-6 brand" src={logo} alt="Heelly"/>
          <Link to='/' className="text-[10px] px-[0.4rem] py-[0.1rem] text-white border border-gray-200 rounded-md ml-2 font-normal select-none">BETA</Link>
        </div>
        <div className="flex items-center">
            {
              !props.user__ &&
              <Link to='/login' className="duration-150 px-2.5 py-2 border text-sm rounded hover:text-white border-gray-200 hover:border-white mr-2.5">Login</Link>
            }
            {
              props.user__ &&
              <button onClick={props.logout} className="duration-150 px-2.5 py-2 border text-sm rounded hover:text-white border-gray-200 hover:border-white mr-2.5">Logout</button>
            }
            <Link to='/plans' className="px-2.5 py-2 bg-violet-500 text-white text-sm rounded hover:bg-violet-600 duration-150">Get Funded</Link>
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