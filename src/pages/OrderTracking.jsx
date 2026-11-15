import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import OrderStatus, { statuses } from "../components/common/OrderStatus";
import { useOrders } from "../context/OrderContext";
import { money } from "../utils/pricing";
export default function OrderTracking() {
  const { orderId } = useParams(),
    { orders, updateStatus } = useOrders(),
    order = orders.find((x) => x.id === orderId);
  if (!order)
    return (
      <EmptyState
        title="Order not found"
        description="Orders are saved on this device only."
      />
    );
  return (
    <>
      <PageHeader
        title="Order Tracking"
        subtitle="Review your order details and status."
      />
      <section className="container section pt-0">
        <div className="order-card">
          <div className="order-top">
            <div>
              <span className="eyebrow">ORDER NUMBER</span>
              <h3>{order.id}</h3>
              <p>Placed {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className="status-badge">{statuses[order.status]}</span>
          </div>
          <OrderStatus status={order.status} />
          <div className="status-control">
            <strong>Update order status</strong>
            <p>
              Status changes are saved on this device. This is not live delivery
              tracking.
            </p>
            <select
              className="form-select"
              value={order.status}
              onChange={(e) => updateStatus(order.id, Number(e.target.value))}
            >
              {statuses.map((s, i) => (
                <option key={s} value={i}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="order-details">
            <div>
              <h4>Delivery Details</h4>
              <p>
                {order.customer.name}
                <br />
                {order.customer.street}, {order.customer.city}
                <br />
                {order.customer.building}
                <br />
                {order.customer.phone}
              </p>
              <p>Payment: {order.paymentMethod}</p>
            </div>
            <div>
              <h4>Items</h4>
              {order.items.map((x) => (
                <div className="summary-line" key={x.cartItemId}>
                  <span>
                    {x.quantity} × {x.name}
                  </span>
                  <span>
                    {money(
                      (x.price +
                        x.selectedExtras.reduce((s, e) => s + e.price, 0)) *
                        x.quantity,
                    )}
                  </span>
                </div>
              ))}
              <hr />
              <div className="summary-line total">
                <strong>Total</strong>
                <strong>{money(order.pricing.total)}</strong>
              </div>
            </div>
          </div>
          <Link to="/menu" className="btn btn-primary mt-4">
            Back to Menu
          </Link>
        </div>
      </section>
    </>
  );
}
