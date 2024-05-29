import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const EditAdminModal = ({ admin, onClose, onSave }) => {
  const [adminData, setAdminData] = useState({ ...admin });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(adminData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Editar Administrador</h2>
        <input
          type="text"
          name="adminName"
          value={adminData.adminName}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded"
          placeholder="Nome"
        />
        <input
          type="email"
          name="email"
          value={adminData.email}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={adminData.password}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded"
          placeholder="Senha"
        />
        <input
          type="text"
          name="role"
          value={adminData.role}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded"
          placeholder="Role"
        />
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Salvar</button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
};

EditAdminModal.propTypes = {
  admin: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    adminName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const DeleteAdminModal = ({ admin, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Excluir Administrador</h2>
        <p>Deseja realmente excluir o administrador {admin.adminName}?</p>
        <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Excluir</button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
};

DeleteAdminModal.propTypes = {
  admin: PropTypes.shape({
    adminName: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


const ManageCrew = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins/admins');
        const sortedAdmins = response.data.sort((a, b) => a.adminName.localeCompare(b.adminName));
        setAdmins(sortedAdmins);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter a lista de administradores:', error);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAdmin(null);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleEditAdmin = async (updatedAdminData) => {
    try {
      await axios.put(`http://localhost:5000/api/admins/admins/${selectedAdmin._id}`, updatedAdminData);
      const updatedAdmins = admins.map(admin =>
        admin._id === selectedAdmin._id ? { ...admin, ...updatedAdminData } : admin
      );
      setAdmins(updatedAdmins);
      console.log('Admin atualizado com sucesso:', updatedAdmins);
      closeModal();
    } catch (error) {
      console.error('Erro ao editar administrador:', error);
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admins/admins/${selectedAdmin._id}`);
      const updatedAdmins = admins.filter(admin => admin._id !== selectedAdmin._id);
      setAdmins(updatedAdmins);
      console.log('Admin excluído com sucesso. Novos admins:', updatedAdmins);
      closeModal();
    } catch (error) {
      console.error('Erro ao excluir administrador:', error);
    }
  };
  
  const adminList = admins.filter(admin => admin.role === 'admin');
  const masterList = admins.filter(admin => admin.role === 'master');

  return (
    <div>
      <h1 className='font-thin mb-6 p-6 text-gray-200'>Gerenciador de Equipe</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="flex border-t-2 border-b-2 pb-16 border-gray-200">
          <div className="w-1/2 m-6">
            <h1 className='font-thin mb-6 p-6 text-gray-200'>Adms</h1>
            <table className="w-full bg-gray-200 text-center">
              <thead>
                <tr className="bg-black text-gray-200">
                  <th className="px-2 py-2 text-center whitespace-nowrap">Nome</th>
                  <th className="px-2 py-2 text-center whitespace-nowrap">Email</th>
                  <th className="px-2 py-2 text-center whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((admin) => (
                  <tr key={admin._id} className="bg-black text-white">
                    <td className="px-2 py-2 font-light text-center whitespace-nowrap">{admin.adminName}</td>
                    <td className="px-2 py-2 font-light text-center whitespace-nowrap">{admin.email}</td>
                    <td className="px-2 py-2 font-light text-center whitespace-nowrap">
                      {/* Botões de ação */}
                      <button className="mr-2 text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(admin)}>Editar</button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(admin)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/2 m-6">
            <h1 className='font-thin mb-6 p-6 text-gray-200'>Masters</h1>
            <table className="w-full bg-black text-center">
              <thead>
                <tr className="bg-black text-gray-200">
                  <th className="px-2 py-2 text-center whitespace-nowrap">Nome</th>
                  <th className="px-2 py-2 text-center whitespace-nowrap">Email</th>
                  <th className="px-2 py-2 text-center whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {masterList.map((admin) => (
                  <tr key={admin._id} className="bg-black text-white">
                    <td className="px-2 py-2 font-light text-center whitespace-nowrap">{admin.adminName}</td>
                    <td className="px-2 py-2 font-light text-center whitespace-nowrap">{admin.email}</td>
                    <td className="px-2 py-2 font-light text-center whitespace-nowrap">
                      {/* Botões de ação */}
                      <button className="mr-2 text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(admin)}>Editar</button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(admin)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Janela pop-up edit */}
      {isEditModalOpen && (
        <EditAdminModal
          admin={selectedAdmin}
          onClose={closeModal}
          onSave={handleEditAdmin}
        />
      )}
      {/* Janela pop-up delete */}
      {isDeleteModalOpen && (
        <DeleteAdminModal
          admin={selectedAdmin}
          onClose={closeModal}
          onDelete={handleDeleteAdmin}
        />
      )}
    </div>
  );
};

export default ManageCrew;
  