import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const PurchaseDetails = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const purchaseResponse = await axios.get(`https://web-com-admin-backend.vercel.app/api/admins/purchases/${id}`);
        const subscriptionResponse = await axios.get('https://web-com-admin-backend.vercel.app/api/admins/subscription-status');

        const matchingSubscription = subscriptionResponse.data.find(sub => sub.purchase_id.toString() === purchaseResponse.data._id.toString());

        setPurchase({
          ...purchaseResponse.data,
          subscriptionStatus: matchingSubscription || { status: false, renewDate: null }
        });

        if (matchingSubscription) {
          const paymentResponse = await axios.get(`https://web-com-admin-backend.vercel.app/api/admins/payments/${matchingSubscription.payment_id}`);
          setPayment(paymentResponse.data);
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Purchase Details</h2>
      {purchase && (
        <div>
          <p><strong>Plano ID:</strong> {purchase.plan_id}</p>
          <p><strong>Plano:</strong> {purchase.plan}</p>
          <p><strong>Preço:</strong> {purchase.price}</p>
          <p><strong>Moeda:</strong> {purchase.currency}</p>
          <p><strong>Frequência Pagto:</strong> {purchase.frequency}</p>
          <p><strong>Campanha:</strong> {purchase.mostPopular ? 'Sim' : 'Não'}</p>
          <p><strong>User Name:</strong> {purchase.userName}</p>
          <p><strong>Email:</strong> {purchase.email}</p>
          <p><strong>Terms Renovação:</strong> {purchase.termsAccepted ? 'Sim' : 'Não'}</p>
          <p><strong>Status:</strong> <span className={purchase.subscriptionStatus.status ? 'text-green-500' : 'text-red-500'}>{purchase.subscriptionStatus.status ? 'Ativa' : 'Inativa'}</span></p>
          <p><strong>Data Renovação:</strong> {purchase.subscriptionStatus.renewDate ? format(new Date(purchase.subscriptionStatus.renewDate), 'dd/MM/yyyy') : 'N/A'}</p>
        </div>
      )}
      {payment && (
        <div>
          <h3 className="text-xl font-bold mt-4 mb-2">Payment Details</h3>
          <p><strong>Payment ID:</strong> {payment._id}</p>
          <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
          {payment.paymentMethod === 'Cartão de Crédito' && (
            <>
              <p><strong>Credit Card Brand:</strong> {payment.creditCardBrand}</p>
              <p><strong>Credit Card Number:</strong> **** **** **** {payment.creditCardNumber.slice(-4)}</p>
              <p><strong>Credit Card Expiry:</strong> {payment.creditCardExpiry}</p>
              <p><strong>Credit Card CVS:</strong> *** </p>
              <p><strong>Client Name:</strong> {payment.clientName}</p>
              <p><strong>Client CPF:</strong> {payment.clienteCpf}</p>
              <p><strong>Terms Accepted:</strong> {payment.creditCardTermsAccepted ? 'Sim' : 'Não'}</p>
            </>
          )}
          {payment.paymentMethod === 'PayPall' && (
            <>
              <p><strong>PayPal Email:</strong> {payment.payPallEmail}</p>
              <p><strong>PayPal Password:</strong> ************ </p>
              <p><strong>Terms Accepted:</strong> {payment.payPallTermsAccepted ? 'Sim' : 'Não'}</p>
            </>
          )}
          {payment.paymentMethod === 'Pague com Amazon' && (
            <>
              <p><strong>Amazon Email:</strong> {payment.amazonEmail}</p>
              <p><strong>Amazon Password:</strong>  ************ </p>
              <p><strong>Terms Accepted:</strong> {payment.amazonTermsAccepted ? 'Sim' : 'Não'}</p>
            </>
          )}
          {payment.paymentMethod === 'Débito Automático' && (
            <>
              <p><strong>Bank Name:</strong> {payment.bankName}</p>
              <p><strong>Bank Account Number:</strong> {payment.bankAccountNumber}</p>
              <p><strong>Bank Routing Number:</strong> {payment.bankRoutingNumber}</p>
              <p><strong>Bank Account Agency Number:</strong> {payment.bankAccountAgencyNumber}</p>
              <p><strong>Terms Accepted:</strong> {payment.bankTransferTermsAccepted ? 'Sim' : 'Não'}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PurchaseDetails;
