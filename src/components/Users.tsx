const Users  = ({user}:any) => {
    // console.log("jab "+user);
    
    return (
        <>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-900">
            {user.firstName}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-900">
            {user.lastName}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-900">
              {user.email}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {user.phoneNumber}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-900">
            {user.branch.name}
          </span>
        </td>
        </>
    )
}

export default Users;