
import React from "react";
import { Link, useParams } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import OrderStatus, {
  statuses,
} from "../components/common/OrderStatus";

import { useOrders } from "../context/OrderContext";
import { money } from "../utils/pricing";

export default function OrderTracking() {
  const { orderId } = useParams();
  const { orders, updateStatus } = useOrders();

  // Find the selected order
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <>
        <PageHeader
          title="Order Tracking"
          subtitle="Check the details of your order."
        />

        <div className="container section pt-0">
          <EmptyState
            title="Order not found"
            description="We couldn't find this order. Orders are saved only on the device where they were created."
          />

          <div className="center mt-4">
            <Link to="/menu" className="btn btn-primary">
              Explore Menu
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Calculate the total number of ordered items
  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <PageHeader
        title="Order Tracking"
        subtitle="View your order information and current status."
      />

      <section className="container section pt-0">
        <div className="order-card">
          <div className="order-top">
            <div>
              <span className="eyebrow">ORDER NUMBER</span>

              <h3>{order.id}</h3>

              <p>
                Placed{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span className="status-badge">
              {statuses[order.status]}
            </span>
          </div>

          <OrderStatus status={order.status} />

          <div className="status-control">
            <strong>Update order status</strong>

            <p>
              You can manually change the order status below.
              Changes are saved on this device only.
              This is not live delivery tracking.
            </p>

            <select
              className="form-select"
              value={order.status}
              onChange={(e) =>
                updateStatus(
                  order.id,
                  Number(e.target.value)
                )
              }
            >
              {statuses.map((status, index) => (
                <option key={status} value={index}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="order-details">
            <div>
              <h4>Delivery Details</h4>

              <p>
                <strong>Name:</strong>{" "}
                {order.customer.name}
                <br />

                <strong>Address:</strong>{" "}
                {order.customer.street},{" "}
                {order.customer.city}
                <br />

                {order.customer.building && (
                  <>
                    <strong>Building:</strong>{" "}
                    {order.customer.building}
                    <br />
                  </>
                )}

                <strong>Phone:</strong>{" "}
                {order.customer.phone}
                <br />

                <strong>Email:</strong>{" "}
                {order.customer.email}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.paymentMethod}
              </p>
            </div>

            <div>
              <h4>
                Items ({totalItems}{" "}
                {totalItems === 1 ? "item" : "items"})
              </h4>

              {order.items.map((item) => (
                <div
                  className="summary-line"
                  key={item.cartItemId}
                >
                  <span>
                    {item.quantity} × {item.name}
                  </span>

                  <span>
                    {money(
                      (
                        item.price +
                        item.selectedExtras.reduce(
                          (total, extra) =>
                            total + extra.price,
                          0
                        )
                      ) * item.quantity
                    )}
                  </span>
                </div>
              ))}

              <hr />

              <div className="summary-line total">
                <strong>Total</strong>

                <strong>
                  {money(order.pricing.total)}
                </strong>
              </div>
            </div>
          </div>

          <Link
            to="/menu"
            className="btn btn-primary mt-4"
          >
            Back to Menu
          </Link>
        </div>
      </section>
    </>
  );
}
