import { useEffect, useState } from "react";
import axios from "axios";
import SendMoney from "../pages/SendMoney";
import { useNavigate } from "react-router-dom";

function Users() {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter);
            setUsers(response.data.user);
        }
        fetchData();
    },[filter])

    return (
        <div className="flex flex-col mx-10 text-xl">
            <div className="font-bold">Users</div>
            <input value={filter} onChange={(e)=>setFilter(e.target.value)} className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 my-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Search users..." />
            <div>{users.map(user => <User user={user} key={user._id}/>)}</div>
        </div>
    )
}

function User({user}) {
    const navigate = useNavigate();

    return (
        <div className="flex my-3">
            <div className="text-xl px-2 pt-1 bg-slate-400 h-10 w-10 rounded-full">{user.firstName[0]}{user.lastName[0]}</div>
            <div className="text-lg font-bold pt-1 mx-4">{user.firstName} {user.lastName}</div>
            <button onClick={()=>{navigate("/send?id="+user._id+"&name="+user.firstName)}} className="text-lg ml-auto shadow bg-slate-900 hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold px-4 rounded" type="button">
                Send Money
            </button>
        </div>
    )
}

export default Users;