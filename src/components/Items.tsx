export default (props:any) => {

    const { plan:any, handleChange:Function } = props;

    const handleClick = () => {
        props.handleChange();
    };

    return (
        <div id={props.plan.id} onClick={handleClick} className="flex items-center justify-between py-4 border border-transparent border-b-gray-800 hover:border-b-green-500 cursor-pointer">
            <p className="text-sm">Star Trader (${props.plan.plan.account__balance})</p>
            <p className="text-xs ml-2 text-pro-100">#{props.plan.id}</p>
        </div>
    )
}