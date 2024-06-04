import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ManagePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchasesResponse = await axios.get('https://web-com-admin-backend.vercel.app/api/admins/purchases');
        const subscriptionResponse = await axios.get('https://web-com-admin-backend.vercel.app/api/admins/subscription-status');

        // Combine data from both responses
        const combinedData = purchasesResponse.data.map(purchase => {
          const matchingSubscription = subscriptionResponse.data.find(sub => sub.purchase_id.toString() === purchase._id.toString());
          return {
            ...purchase,
            subscriptionStatus: matchingSubscription || { status: false, renewDate: null }
          };
        });

        // Ordenar as compras com base na data de renovação
        combinedData.sort((a, b) => {
          // Use new Date() para converter as strings de data em objetos Date
          return new Date(b.subscriptionStatus.renewDate) - new Date(a.subscriptionStatus.renewDate);
        });

        setPurchases(combinedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-center mb-8">Acompanhamento de Subscrições - Administração de Vendas e Clientes</h2>
      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              {/* Purchase data */}
              <th className="py-3 text-center text-xs font-medium uppercase tracking-wider">Plano ID</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Plano</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Preço</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Moeda</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Freq. Pagto</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Data Renov.</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Terms Renov.</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Campanha</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">User Name</th>
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">Email</th>
              
              <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">...</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {purchases.map((purchase, index) => (
              <tr key={purchase._id} className={index % 2 === 0 ? 'bg-gray-800 text-white' : 'bg-gray-500 text-gray-800'}>
                <td className="py-4 text-sm text-center whitespace-nowrap">{purchase.plan_id}</td>
                <td className="px-2 py-4 text-sm whitespace-nowrap">{purchase.plan}</td>
                <td className="px-2 py-4 text-sm text-center whitespace-nowrap">{purchase.price}</td>
                <td className="px-2 py-4 text-sm text-center whitespace-nowrap">{purchase.currency}</td>
                <td className="px-2 py-4 text-sm text-center whitespace-nowrap">{purchase.frequency}</td>
                <td className="px-2 py-4 text-sm text-center whitespace-nowrap">
                  {purchase.subscriptionStatus.renewDate ? format(new Date(purchase.subscriptionStatus.renewDate), 'dd/MM/yyyy') : 'N/A'}
                </td>
                <td className="px-2 py-4 text-sm text-center whitespace-nowrap">{purchase.termsAccepted ? 'Sim' : 'Não'}</td>
                <td className={`px-2 py-4 text-sm text-center whitespace-nowrap ${purchase.subscriptionStatus.status ? 'text-green-500' : 'text-red-500'}`}>
                  {purchase.subscriptionStatus.status ? 'Ativa' : 'Inativa'}
                </td>
                <td className="px-2 py-4 text-sm text-center whitespace-nowrap">{purchase.mostPopular ? 'Sim' : 'Não'}</td>
                <td className="px-2 py-4 text-sm whitespace-nowrap">{purchase.userName}</td>
                <td className="px-2 py-4 text-sm whitespace-nowrap">{purchase.email}</td>
                
                <td className="px-2 py-4 text-sm text-center whitespace-nowrap">
                  <Link to={`${purchase._id}`} className="text-blue-500 hover:text-blue-700">Detalhes</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePurchases;
