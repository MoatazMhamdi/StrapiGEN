import React from 'react';
import './OverviewPage.css';

const ModelPage = () => {
  return (
    <div className="model-page">
      <h1 className="model-title">Data Model</h1>
      <div className="model-container">
        <div className="entity entity-customer">
          <h2>Customer</h2>
          <ul>
            <li>CustomerID (PK)</li>
            <li>Fname</li>
            <li>Lname</li>
            <li>Address</li>
            <li>Phone</li>
            <li>Email</li>
          </ul>
        </div>
        <div className="relationship-line" />
        <div className="relationship-one-to-many-container">
          <div className="relationship-one-to-many">*</div>
          <div className="relationship-line" />
        </div>
        <div className="entity entity-orderheader">
          <h2>OrderHeader</h2>
          <ul>
            <li>OrderID (PK)</li>
            <li>Order Date</li>
            <li>Order Time</li>
            <li>CustomerID (FK)</li>
          </ul>
        </div>
        <div className="relationship-line" />
        <div className="entity entity-orderline">
          <h2>OrderLine</h2>
          <ul>
            <li>OrderID (PK)</li>
            <li>LineID (PK)</li>
            <li>ProductID</li>
            <li>Quantity</li>
            <li>DeliveryID (FK)</li>
          </ul>
        </div>
        <div className="relationship-line" />
        <div className="entity entity-delivery">
          <h2>Delivery</h2>
          <ul>
            <li>DeliveryID (PK)</li>
            <li>OrderID (FK)</li>
            <li>Type</li>
            <li>Status</li>
            <li>Departure</li>
            <li>Arrival</li>
          </ul>
        </div>
        <div className="relationship-one-to-one">1</div>
        <div className="relationship-line" />
        <div className="entity entity-payment">
          <h2>Payment</h2>
          <ul>
            <li>PaymentID (PK)</li>
            <li>PDate</li>
            <li>OrderID (FK)</li>
          </ul>
        </div>
        <div className="relationship-one-to-one">1</div>
        <div className="relationship-line" />
        <div className="entity entity-ture">
          <h2>Ture</h2>
          <ul>
            <li>OrderID (PK)</li>
            <li>CustomerID (FK)</li>
            <li>Total</li>
          </ul>
        </div>
        <div className="relationship-one-to-many">*</div>
        <div className="relationship-line" />
        <div className="entity entity-product">
          <h2>Product</h2>
          <ul>
            <li>ProductID (PK)</li>
            <li>Name</li>
            <li>Specification</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;                                                           

