import { Link } from "react-router-dom";

import arrowright from '../../../assets/arrow-narrow-right.svg';
import bg1 from '../../../assets/test.png'
import bg2 from '../../../assets/bg2.png'
import chart from '../../../assets/yield.png'

export default () => {

    return(
        <div className="w-full flex items-center flex-col">
            <div className="w-full font-normal flex justify-center items-center flex flex-col pb-[28rem] relative overflow-hidden max-w-[1600px] px-7">
                <h1 className="mt-28 md:text-7xl text-4xl max-w-[800px] text-center text-white">High returns, with the best investors</h1>
                <Link to="/" className="text-green-500 flex items-center">Explore our yields <img src={arrowright} className="brand ml-2 w-5"/></Link>
                <img src={bg1} className="absolute lg:-bottom-[27rem] md:-bottom-[17rem] md:-bottom-[10rem] -bottom-[12rem] lg:left-60 md:left-20 -left-12 lg:w-[90%] md:w-[70rem] min-w-[40rem] rotate-[10deg] " />
            </div>
            <div className="w-full font-normal flex lg:flex-nowrap flex-wrap justify-center relative overflow-hidden max-w-[1600px] py-40 lg:px-14 px-7">
                <div className="lg:w-1/2 w-full flex flex-col text-center items-center md:text-start md:items-start">
                    <h2 className="md:text-7xl text-4xl text-white leading-[1.1]">Discover the best yields of the market</h2>
                    <p className="lg:mb-0 mb-20 mt-4 md:w-5/6 leading-6 text-sm text-pro-100 text-pro-100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                </div>
                <div className="lg:w-1/2 w-full flex items-center justify-end">
                    <div className="lg:w-96 w-full border border-gray-500 rounded-md p-5 flex flex-col">
                        <div className="flex items-center justify-between">
                            <p className="text-green-500 font-medium">Agressive Bullish</p>
                            <p className="text-white">High Risk</p>
                        </div>
                        <img src={chart} className="w-full mt-4"/>
                        <div className="flex items-end justify-between mt-8">
                            <p className="text-white">3,257 Clients</p>
                            <Link to="/" className="py-2 px-4 rounded-md text-black bg-green-500 font-bold">Request</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex-col font-normal flex lg:pb-[46rem] md:pb-[70rem] pb-[55rem]  items-center flex relative overflow-hidden max-w-[1600px] pt-12 px-7 lg:px-14">
                <h2 className="md:text-7xl text-4xl text-center text-white lg:w-[800px]">Be a trader and earn profits no risk</h2>
                <Link to="/" className="text-green-500 flex items-center">Be a Trader <img src={arrowright} className="brand ml-2 w-5"/></Link>
                <img src={bg2} className="absolute lg:-bottom-[14rem] md:bottom-[20rem] bottom-[30rem] lg:w-[80%] w-[80rem] rotate-[10deg] " />
            </div>
        </div>
    )
}


/** THIS IS FOR EXPLORE PLANS
 *         <div className="w-full h-screen flex flex-col items-center justify-center">
            <p>This is home, here are one plan for you</p>
            <div className="w-96 border rounded-xl p-4 flex flex-col bg-white text-black">
                <p className="text-3xl">Silver</p>
                <p>10,000$</p>
                <p>Price: 10$</p>
                <Link to='/pay' className="mt-20 h-10 rounded-xl w-full bg-green-500 font-bold text-sm flex items-center justify-center">Get Funded</Link>
            </div>
        </div>
 */