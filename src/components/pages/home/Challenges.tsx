import { Link } from "react-router-dom";

import arrowright from '../../../assets/arrow-narrow-right.svg';
import bg1 from '../../../assets/test.png'
import deco1 from '../../../assets/target-05.svg'
import deco2 from '../../../assets/fingerprint-01.svg'
import deco3 from '../../../assets/currency-bitcoin-circle.svg'

export default () => {

    const create__payment = (challenge:Number) => {
        const queryString = `?challenge=${challenge}`;
        window.location.href = `/gateway${queryString}`;
    }

    return(
        <div className="w-full flex items-center flex-col">
            <div className="w-full font-normal flex justify-center items-center flex flex-col pb-[28rem] relative overflow-hidden max-w-[1400px] px-7">
                <h1 className="mt-28 md:text-7xl text-4xl max-w-[800px] text-center text-white">Grow with a high quality team</h1>
                <Link to="/" className="text-green-500 flex items-center">Be a NuTrustX Trader <img src={arrowright} className="brand ml-2 w-5"/></Link>
                <img src={bg1} className="absolute lg:-bottom-[27rem] md:-bottom-[17rem] md:-bottom-[10rem] -bottom-[12rem] lg:left-60 md:left-20 -left-12 lg:w-[90%] md:w-[70rem] min-w-[40rem] rotate-[10deg] " />
            </div>
            <div className="w-full lg:flex-nowrap flex-wrap font-normal flex justify-center flex relative overflow-hidden max-w-[1400px] pt-60 pb-[10rem] lg:px-14 px-7">
                <div className="lg:w-1/2 w-full flex flex-col relative lg:items-start items-center lg:text-start text-center">
                    <h2 className="md:text-6xl text-4xl text-white leading-[1.1] lg:absolute lg:w-[calc(100%_+_100px)] ">Descubre las etapas para convertirte en un trader de nuestra compañía</h2>
                </div>
                <div className="lg:w-1/2 pb-96 w-full flex items-center justify-end relative lg:mt-0 mt-12">
                    <div className="w-[1px] branch h-[36rem] bg-white absolute top-0 left-1/2 transform-x-1/2"></div>
                    
                    <div className="w-10 h-10 bg-gray-700 absolute top-20 left-[calc(50%_-_1.15rem)] rounded-3xl transform-x-1/2 flex justify-center items-center">
                        <img src={deco1} alt="" className="w-8 brand" />
                    </div>

                    <div className="w-10 h-10 bg-gray-700 absolute top-60 left-[calc(50%_-_1.15rem)] rounded-3xl transform-x-1/2 flex justify-center items-center">
                        <img src={deco2} alt="" className="w-8 brand" />
                    </div>

                    <div className="w-10 h-10 bg-gray-700 absolute top-[25rem] left-[calc(50%_-_1.15rem)] rounded-3xl transform-x-1/2 flex justify-center items-center">
                        <img src={deco3} alt="" className="w-8 brand" />
                    </div>
                    
                    <div className="w-1/2 h-full text-end flex flex-col items-end lg:px-8 pr-8 relative">
                        <p className="text-white text-lg top-[15.25rem] absolute">KYC & Contract</p>
                        <p className="text-xs text-pro-100 leading-4 absolute top-[17rem]">The Verification is the second and the last step towards becoming a NuTrustX Trader. Once you pass the Verification stage and your results are verified, you will be offered to trade for our Proprietary Trading Firm.</p>
                    </div>
                    <div className="w-1/2 h-full lg:px-8 pl-8 relative">
                        <p className="text-white text-lg top-[5.25rem] absolute">Evaluation</p>
                        <p className="text-xs text-pro-100 leading-4 absolute top-[7rem]">The Challenge is the first step of the Evaluation Process. You need to succeed here to advance into the Verification stage. Prove your trading skills and discipline in observing the Trading Objectives.</p>
                        
                        <p className="text-white text-lg top-[25.25rem] absolute">Get Funded</p>
                        <p className="text-xs text-pro-100 leading-4 absolute top-[27rem] ">You are becoming a trader of the NuTrustX Proprietary Trading Firm. Trade responsibly and consistently and receive up to 90% of your profits. If you consistently generate profits on your FTMO Account, we can scale your account according to our Scaling Plan.</p>
                    </div>
                </div>
            </div>
            <div className="w-full font-normal flex justify-center items-center flex flex-col lg:pb-[28rem] pb-[40rem] relative overflow-hidden max-w-[1400px] px-7 lg:px-14">
                <h1 className="mt-28 md:text-7xl text-4xl max-w-[800px] text-center text-white">Make your profits even better</h1>
                <div className="w-full rounded-lg flex lg:flex-row flex-col items-center justify-center lg:justify-between mt-20">
                    
                    <div className="lg:w-1/3 w-full max-w-[400px] rounded-md bg-gray-800 flex flex-col text-white items-center">
                        <div className="w-full rounded-t-md h-8 bg-gray-600"></div>
                        <p className="mt-4 text-sm">For new promises</p>
                        <p className="mt-8 text-2xl">Star Trader</p>
                        <span className="text-5xl">$10,000.00</span>
                        <p className="mt-4 text-gray-200">10 Minimum Days</p>
                        <p className="mt-2 text-gray-200">$5,000 Maximum Loss</p>
                        <p className="mt-2 text-gray-200">$2,500 Maximum Daily Loss</p>
                        <p className="mt-2 text-gray-200">$5,000 Maximum Loss</p>
                        <p className="mt-2 text-gray-200">$2,500 Maximum Daily Loss</p>
                        <div className="w-full px-7 mt-12 flex pb-7">
                            <Link to="/gateway?challenge=star" className="py-2 rounded-md text-black font-bold flex justify-center w-full bg-green-500">Select</Link>
                        </div>
                    </div>
                    <div className="lg:w-1/3 w-full max-w-[400px] mt-12 lg:mt-0 lg:mx-8 rounded-md bg-gray-800 flex flex-col text-white items-center">
                        <div className="w-full rounded-t-md h-8 bg-gray-600"></div>
                        <p className="mt-4 text-sm">For new promises</p>
                        <p className="mt-8 text-2xl">Pro Trader</p>
                        <span className="text-5xl">$10,000.00</span>
                        <p className="mt-4 text-gray-200">10 Minimum Days</p>
                        <p className="mt-2 text-gray-200">$5,000 Maximum Loss</p>
                        <p className="mt-2 text-gray-200">$2,500 Maximum Daily Loss</p>
                        <p className="mt-2 text-gray-200">$5,000 Maximum Loss</p>
                        <p className="mt-2 text-gray-200">$2,500 Maximum Daily Loss</p>
                        <div className="w-full px-7 mt-12 flex pb-7">
                            <Link to="/gateway?challenge=pro" className="py-2 rounded-md text-black font-bold flex justify-center w-full bg-green-500">Select</Link>
                        </div>
                    </div>
                    <div className="lg:w-1/3 w-full max-w-[400px] mt-12 lg:mt-0 rounded-md bg-gray-800 flex flex-col text-white items-center">
                        <div className="w-full rounded-t-md h-8 bg-gray-600"></div>
                        <p className="mt-4 text-sm">For new promises</p>
                        <p className="mt-8 text-2xl">Expert Trader</p>
                        <span className="text-5xl">$10,000.00</span>
                        <p className="mt-4 text-gray-200">10 Minimum Days</p>
                        <p className="mt-2 text-gray-200">$5,000 Maximum Loss</p>
                        <p className="mt-2 text-gray-200">$2,500 Maximum Daily Loss</p>
                        <p className="mt-2 text-gray-200">$5,000 Maximum Loss</p>
                        <p className="mt-2 text-gray-200">$2,500 Maximum Daily Loss</p>
                        <div className="w-full px-7 mt-12 flex pb-7">
                            <Link to="/gateway?challenge=expert" className="py-2 rounded-md text-black font-bold flex justify-center w-full bg-green-500">Select</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}