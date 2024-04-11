import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";

function SendMoney() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState();

    return (
        <div>
            <div className="h-screen flex w-1/4 m-auto">
                <div className="flex flex-col justify-between items-center rounded-lg h-1/3 m-auto bg-slate-300 p-4">
                    <Header>Send Money</Header>
                    <div className="flex justify-between w-1/2">
                        <div className="text-xl px-2 bg-teal-500 h-7 w-7 rounded-full">{name[0]}</div>
                        <div className="text-xl font-semibold">{name}</div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">Amount (in Rs)</label>
                        <input onChange={(e)=>{setAmount(e.target.value)}} placeholder="Enter Amount"></input>
                    </div>
                    <button onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount: amount
                        }, {
                            headers:{Authorization: "Bearer " + localStorage.getItem("token")}
                        });
                        console.log(response);
                    }} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-md border-4 text-white py-1 px-2 rounded" type="button" >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SendMoney;