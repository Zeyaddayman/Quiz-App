/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function RestartBtn(props) {
    return (
        <Link to={'/'} className='restart-btn block w-fit px-8 py-3 rounded text-white transition hover:opacity-70 mx-auto my-0'>
            {props.text}
        </Link>
    )
}

export default RestartBtn;