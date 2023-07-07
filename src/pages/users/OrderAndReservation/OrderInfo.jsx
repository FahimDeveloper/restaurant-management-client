

const OrderInfo = ({ order, index, handleCancelOrder, handleViewOrder }) => {
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{order.userName}</td>
            <td>{order.userEmail}</td>
            <td>{order.menuItems.length}</td>
            <td>${order.totalPrice}</td>
            <td>{order.status}</td>
            <td><label htmlFor="my_modal_4" onClick={() => handleViewOrder(order._id)} className="btn btn-sm rounded-lg btn-secondary">View Details</label></td>
            <td><button disabled={order.status == 'preparing' || order.status == 'ready to serve' || order.status == 'served' ? true : false} onClick={() => handleCancelOrder(order._id)} className="btn-sm rounded-lg btn-error disabled">Cancel order</button></td>
        </tr>
    );
};

export default OrderInfo;