function Input({children, inputType, onChange}) {
    return(
        <div className="w-4/5">
            <label className="block mb-2 text-sm font-medium text-gray-900">{children}</label>
            <input type={inputType} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
        </div>
    )
}

export default Input;