
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminHome = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="text-center">
        <h1 className="buynow-card-title mb-8"> - Remind Adm - </h1>
        <div>
          <Link to="/admin/register">
            <button className='w-full p-4 my-4'>Criar Novo Usuário</button>
          </Link>
        </div>
        <div>
          <Link to="/admin/crew">
            <button className='w-full p-4 my-4'>Gerenciar Equipe</button>
          </Link>
        </div>
        <div>
          <Link to="/admin/purchases">
            <button className='w-full p-4 my-4'>Vendas & Clientes</button>
          </Link>
        </div>
      </div>
      <div className="fixed bottom-2 w-full">
        <button className='w-auto p-4 mx-4 mb-12' onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminHome;
