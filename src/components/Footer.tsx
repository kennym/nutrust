import { Link } from 'react-router-dom'
import logo from '../assets/brand.svg';
  
const Footer = (props:any) => {
  
  return (
    <>
      <footer className='absolute bottom-0 w-full border border-transparent border-b-gray-500 flex justify-center
      items-center font-normal bg-gray-800 text-sm text-gray-100 z-50'>
        <div className="w-full flex-col px-14 py-6 max-w-[1400px] flex text-pro-100 text-sm h-full">
          <div className="w-full flex">
            <div className="w-1/5 h-full">
              <img src={logo} alt="NuTrustX .png" className='w-8 invert'/>
            </div>
            <div className="ml-40 flex flex-col">
              <Link to="/" className='text-white'>Topic</Link>
              <Link to="/" className='mt-4'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
            </div>
            <div className="ml-40 flex flex-col">
              <Link to="/" className='text-white'>Topic</Link>
              <Link to="/" className='mt-4'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
            </div>
            <div className="ml-40 flex flex-col">
              <Link to="/" className='text-white'>Topic</Link>
              <Link to="/" className='mt-4'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
            </div>
            <div className="ml-40 flex flex-col">
              <Link to="/" className='text-white'>Topic</Link>
              <Link to="/" className='mt-4'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
              <Link to="/" className='mt-2'>SubTopic</Link>
            </div>
          </div>
          <div className="w-full border border-transparent border-t-gray-500 mt-6 pt-4 flex flex-col">
            <Link to="/">Copyright</Link>
            <Link to="/">NuTrustX LLC</Link>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;


/**
 * <Link to='/plans' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">Challenges</Link>
          <Link to='/faqs' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">FAQs</Link>
          <Link to='/how' className="ml-7 text-sm hover:text-gray-300 duration-150 hidden md:block">How it Works</Link>
 */