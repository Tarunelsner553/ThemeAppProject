import React, { useEffect, useState } from 'react';

const BillingInfo = () => {
  const [hasActivePayment, setHasActivePayment] = useState(null);
  const [appSubscriptions, setAppSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillingInfo = async () => {
      try {
        const response = await fetch('/api/billing');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { hasActivePayment, appSubscriptions } = await response.json();
        setHasActivePayment(hasActivePayment);
        setAppSubscriptions(appSubscriptions);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBillingInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Billing Information</h1>
      <p>Has Active Payment: {hasActivePayment ? 'Yes' : 'No'}</p>
      <h2>App Subscriptions:</h2>
      <ul>
        {appSubscriptions.map((subscription, index) => (
          <li key={index}>{subscription}</li>
        ))}
      </ul>
    </div>
  );
};

export default BillingInfo;
