function Balance({balanceAmount}) {
    return(
        <div className="my-6 mx-10 text-xl">
            <span className="font-bold">Your Balance </span>${balanceAmount}
        </div>
    )
}

export default Balance;