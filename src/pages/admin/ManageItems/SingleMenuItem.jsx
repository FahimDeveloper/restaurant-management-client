import { Link } from "react-router-dom";


const SingleMenuItem = ({ item, index }) => {
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
            <td><Link to={`update_item/${item._id}`}><button className="btn btn-sm btn-secondary">update</button></Link></td>
            <td><button className="btn btn-sm btn-error">delete</button></td>
        </tr>
    );
};

export default SingleMenuItem;