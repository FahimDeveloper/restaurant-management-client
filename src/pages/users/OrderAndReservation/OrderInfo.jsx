

const OrderInfo = ({ order, index, handleCancelOrder }) => {
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{order.userName}</td>
            <td>{order.userEmail}</td>
            <td>{order.menuItems.length}</td>
            <td>$45</td>
            <td>{order.status}</td>
            <td><button className="btn-sm rounded-lg btn-secondary">View Details</button></td>
            <td><button onClick={() => handleCancelOrder(order._id)} className="btn-sm rounded-lg btn-error">Cancel order</button></td>
        </tr>
    );
};

export default OrderInfo;