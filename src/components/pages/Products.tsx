import { Link } from "react-router-dom"
import bg1 from '../../assets/test.png'
import arrowright from '../../assets/arrow-narrow-right.svg'

export default (props:any) => {
    return(
        <div className="w-full flex items-center flex-col">
            <div className="w-full font-normal flex items-center flex flex-col min-h-screen h-[60rem] relative overflow-hidden max-w-[1400px] ">
                <h1 className="mt-28 text-4xl max-w-[700px] text-center text-white">Actualmente no está disponible la inversión al público</h1>
                <Link to="/" className="text-green-500 flex items-center z-10">I'm a Trader <img src={arrowright} className="brand ml-2 w-5"/></Link>
                <img src={bg1} className="absolute -bottom-[10rem] left-60 w-[90%] rotate-[10deg] " />
            </div>
        </div>
    )
}