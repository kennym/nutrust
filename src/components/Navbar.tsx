import { Link } from 'react-router-dom'
import logo from '../assets/brand.svg';
import arrow from '../assets/arrow-right.png';
import mobile from '../assets/menu-05.svg';

const Navbar = (props:any) => {

  const { user__, auth, logout } = props;

  const handleLogout = async () => {
    logout(auth).then(() => {
        console.log('Desloguea3')
    }).catch((error:any) => {
        console.log('error papu')
    })
  }
  
  return (
    <nav className='fixed left-0 top-0 w-full h-14 border border-transparent border-b-gray-500 flex justify-center bg-gray-800 text-sm text-gray-100 z-50'>
      <div className="max-w-[1600px] w-full flex items-center justify-between px-7 md:px-14 font-normal">
        <div className="flex items-center">
          <img onClick={() => window.location.href='/'} src={logo} alt="NuTrustX Logo PNG" className="brand w-8 mr-12 cursor-pointer"/>
          <Link to='/products' className='mr-12 hidden md:block'>Products</Link>
          <Link to='/challenges' className='mr-12 hidden md:block'>Become a Trader</Link>
        </div>
        <div className="flex items-center hidden md:block">
            {
              (Object.keys(user__).length == 0) &&
              <>
                <Link to='/login'>Sign In</Link>
                <Link to='/signup' className='py-2 font-semibold px-4 rounded-md ml-10 bg-green-500 text-black'>Be Trader</Link>
              </>
            }
            {
              (Object.keys(user__).length != 0) &&
              <div className="flex items-center cursor-pointer">
                <button onClick={handleLogout} className='px-4 py-2.5 bg-green-500 text-black font-bold mr-8'>Logout</button>
                <div className="w-8 h-8 rounded-3xl bg-green-500"></div>
                <p className='mx-3'>Account</p>
                <img src={arrow} alt="" className=''/>
              </div>
            }
        </div>
        <div className="flex items-center block md:hidden">
            <img src={mobile} alt="" className='invert cursor-pointer' />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;


/**
 * <Link to='/plans' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">Challenges</Link>
          <Link to='/faqs' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">FAQs</Link>
          <Link to='/how' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">How it Works</Link>
 */