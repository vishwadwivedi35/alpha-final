import React from "react";
import "../css/index.comp.css";

const ReturnPolicy = () => {
  return (
    <div className="page-content page-content__return-policy">
      <h1 className="heading-primary--main">Return Policy</h1>
      <div className="contact-us__para">
        <p className="heading-primary">
          Welcome to Alpha Muscle Nutrition! We are thrilled to have you as a
          valued customer. If you're not entirely satisfied with your purchase,
          we're here to help with our hassle-free return policy.
        </p>
      </div>

      <h3 className="heading-tertiary">7-Day Return Satisfaction Guarantee:</h3>
      <div className="contact-us__para">
        <p className="heading-primary">
          We stand behind the quality of our products and offer a 7-day
          satisfaction guarantee. If for any reason you are not satisfied with
          your purchase, you may return it within 7 days from the date of
          delivery for a full refund or exchange.
        </p>
      </div>

      <h3 className="heading-tertiary">Conditions for Returns:</h3>
      <div className="contact-us__para">
        <p className="heading-primary">
          To be eligible for a return, your item must be unused or unopened and
          in the same condition that you received it. It must also be in the
          original packaging. You can generate a return for all items within 24
          hours of receiving the product. Please ensure that the product is
          unused and the tags, boxes, and other packaging are intact and you
          have a justifiable reason for the return.
        </p>
      </div>

      <h3 className="heading-tertiary">Initiating a Return:</h3>
      <div className="contact-us__para">
        <p className="heading-primary">
          To initiate a return, please contact our customer service team at{" "}
          <a href="mailto:info@alphamuscle.in">info@alphamuscle.in</a> with your
          order number and the reason for the return. Our dedicated team will
          guide you through the process and provide you with a return
          authorization (RA) number.
        </p>
      </div>

      <h3 className="heading-tertiary">Return Shipping:</h3>
      <div className="contact-us__para">
        <p className="heading-primary">
          Customers are responsible for return shipping costs unless the return
          is due to an error on our part or a defective product. We recommend
          using a trackable shipping service and purchasing shipping insurance
          to ensure that your return is received safely.
        </p>
      </div>

      <h3 className="heading-tertiary">Refunds:</h3>
      <div className="contact-us__para">
        <p className="heading-primary">
          Once your return is received and inspected, we will process your
          refund within 7 business days. Refunds will be issued to the original
          payment method used for the purchase. If you have paid by card, we
          will reverse the payment. In the case of Cash on Delivery or Bank
          Deposits as modes of payment, we will issue a cheque in the registered
          name of the customer.
        </p>
      </div>

      <h3 className="heading-tertiary">Exchanges:</h3>
      <div className="contact-us__para">
        <p className="heading-primary">
          If you would like to exchange your item for a different product or
          variant, please indicate this when contacting our customer service
          team. We will assist you in processing the exchange and ensure that
          you receive your desired item promptly.
        </p>
      </div>

      <h3 className="heading-tertiary">Cancellations & Modifications:</h3>
      <div className="contact-us__para">
        <p className="heading-primary">
          If the order or the item(s) in your order are not shipped,
          cancellation is possible. Click on ‘Orders’ and you will reach your
          order history. Click ‘Cancel’ for the order(s) you wish to cancel. You
          will be notified about the status within 30 minutes. One cancellation
          is allowed in 24 hours. For prepaid orders, the order amount will be
          refunded back to your bank account within 2-5 business days, or as per
          your respective bank timelines. Please call our Customer Helpline
          +91-9109410160 for further support.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
