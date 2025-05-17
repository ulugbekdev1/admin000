import React, { useState, useEffect } from 'react';

const Hodimqoshish = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');  
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Hodimlarni olishda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="p-4 text-center">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Ism Familiya</th>
              <th>Lavozim</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee, index) => (
              <tr key={employee.id}>
                <th>{indexOfFirstItem + index + 1}</th>
                <td>{employee.name}</td>
                <td>{employee.job || '-'}</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* Paginatsiya */}
     <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === index + 1
                ? "bg-white border-2 border-blue-950 text-blue-950 font-bold"
                : "bg-blue-950 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hodimqoshish;
