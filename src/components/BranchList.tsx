const BranchList = ({branch}: any) => {
    return (
        <>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {branch.name}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-900">
                {branch.address}
            </span>
            </td>
        </>
    )
}

export default BranchList