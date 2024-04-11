import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

function Dashboard() {
    return (
        <div className="flex flex-col">
            <Appbar heading={"Payments App"} firstName={"Faiz"}/>
            <Balance balanceAmount={"1000"}/>
            <Users />
        </div>
    )
}

export default Dashboard;