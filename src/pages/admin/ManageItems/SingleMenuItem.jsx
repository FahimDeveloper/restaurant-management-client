import { Link } from "react-router-dom";


const SingleMenuItem = ({ item, index, handleDeleteMenuItem }) => {
    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
            <td>{item.available_item}</td>
            <td>12-03-2023</td>
            <td>
                <div className="flex gap-2 items-center justify-center">
                    <Link to={`update_item/${item._id}`}><button className="btn btn-sm btn-secondary">update</button></Link>
                    <button onClick={() => handleDeleteMenuItem(item._id)} className="btn btn-sm btn-error">delete</button>
                </div>
            </td>
        </tr>
    );
};

export default SingleMenuItem;