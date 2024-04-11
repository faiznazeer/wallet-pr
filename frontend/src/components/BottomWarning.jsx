import { Link } from "react-router-dom";

function BottomWarning({text, link, to}) {
    return (
        <div className="flex">
            <div>{text}</div>
            <Link className="pl-1 underline" to={to}>{link}</Link>
        </div>
        
    )
}

export default BottomWarning;