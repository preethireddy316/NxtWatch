import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { BiListPlus } from "react-icons/bi";

const SideItem=(props)=>{
const {details,activeObj,onChangeActive}=props
const {id,icon,path,name}=details

ChangeObj=()=>{
    onChangeActive(details)
}
return(
    <li>
    <Link to={`/${path}`}>
        <button type="button" onClick={ChangeObj}>
            <{icon}/>
            {name}
        </button>

    </Link>
    </li>
)
}

export default SideItem