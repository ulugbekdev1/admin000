import React, { useState, useEffect } from 'react';

const Xizmatlar = () => {
  const [xizmatlar, setXizmatlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchXizmatlar = async () => {
      try {
        const response = await fetch('http://localhost:3000/services'); 
        const data = await response.json();
        setXizmatlar(data);
      } catch (error) {
        console.error('Xizmatlarni olishda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchXizmatlar();
  }, []);

  const totalPages = Math.ceil(xizmatlar.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = xizmatlar.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="p-6 text-center">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4"></h2>
      <ol className="list-decimal list-inside space-y-2 mb-6">
        {currentItems.map((item, index) => (
          <li key={item.id} className="text-gray-700">
            {indexOfFirstItem + index + 1}. {item.name}
          </li>
        ))}
      </ol>

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

export default Xizmatlar;
