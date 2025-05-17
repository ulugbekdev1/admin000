import { useState, useEffect } from "react";

export default function Jariza() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    faculty: "",
    phone: "",
    serviceType: "",
    createdAt: "",
    status: "Xodim biriktirilmagan",
    employers: "",
  });
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    fetchStudents();
    fetchEmployees();
    fetchServices();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:3000/students");
    const data = await res.json();
    setStudents(data);
  };

  const fetchEmployees = async () => {
    const request = await fetch("http://localhost:3000/employees");
    const response = await request.json();
    setEmployees(response);
  };

  const fetchServices = async () => {
    const res = await fetch("http://localhost:3000/services");
    const data = await res.json();
    setServices(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      if (name === "employers") {
        newFormData.status = value ? "Xodim biriktirilgan" : "Xodim biriktirilmagan";
      }
      return newFormData;
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
  
    if (editId !== null) {
     
      await fetch(`http://localhost:3000/students/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat("uz-UZ", {
        timeZone: "Asia/Tashkent",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(now);
  
      const newStudent = {
        ...formData,
        createdAt: formattedDate,
      };
  
      await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
    }
  
    setFormData({
      fullName: "",
      faculty: "",
      phone: "",
      serviceType: "",
      status: "Xodim biriktirilmagan",
      employers: "",
    });
    setEditId(null);
    document.getElementById("add_modal").close();
    fetchStudents();
  };
  

  const handleDelete = async (id) => {
    if (confirm("Rostdan ham o‘chirmoqchimisiz?")) {
      await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
      });
      fetchStudents();
    }
  };

  const handleEdit = (student) => {
    setFormData({ ...student });
    setEditId(student.id);
    document.getElementById("add_modal").showModal();
  };


  const filteredStudents = filterStatus
    ? students.filter((s) => s.status === filterStatus)
    : students;

  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto mt-4 font-normal">
      <div className="flex justify-between items-center">
        <button
          className="btn bg-blue-950 text-white mb-4"
          onClick={() => {
            setFormData({
              fullName: "",
              faculty: "",
              phone: "",
              serviceType: "",
              createdAt: "",
              status: "Xodim biriktirilmagan",
              employers: "",
            });
            setEditId(null);
            document.getElementById("add_modal").showModal();
          }}
        >
          Yangi ariza qo‘shish
        </button>

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="select border-blue-950 font-medium"
        >
          <option value="">Holat bo‘yicha filtrlash</option>
          <option value="Tayyor">Tayyor arizalar</option>
          <option value="Jarayonda">Jarayondagi arizalar</option>
          <option value="Rad etilgan">Rad etilgan arizalar</option>
        </select>
      </div>

      <table className="table table-sm">
  <thead>
    <tr className="text-xs text-black">
      <th></th>
      <th>F.I.SH</th>
      <th>Fakulteti</th>
      <th>Telefon raqami</th>
      <th>Xizmat turi</th>
      <th>Yaratilgan vaqti</th>
      <th>Holati</th>
      <th>Xodim</th>
      <th>Amallar</th>
    </tr>
  </thead>
  <tbody>
    {currentStudents.map((student, i) => (
      <tr key={student.id} className={`${i % 2 === 0 ? "bg-base-200" : ""} text-xs`}>
        <th>{indexOfFirstStudent + i + 1}</th>
        <td>{student.fullName}</td>
        <td>{student.faculty}</td>
        <td>{student.phone}</td>
        <td>{student.serviceType}</td>
        <td>{student.createdAt}</td>
        <td>
          <select
            name="status"
            value={student.status}
            className="select select-xs w-full"
            onChange={async (e) => {
              const selectedStatus = e.target.value;
              await fetch(`http://localhost:3000/students/${student.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  status: selectedStatus,
                }),
              });
              fetchStudents();
            }}
          >
            <option value="">Holat tanlanmagan</option>
            <option value="Tayyor">Tayyor</option>
            <option value="Jarayonda">Jarayonda</option>
            <option value="Rad etilgan">Rad etilgan</option>
          </select>
        </td>
        <td>
          <select
            name="employers"
            value={student.employers || ""}
            className="select select-xs w-full"
            onChange={async (e) => {
              const selectedEmployerId = e.target.value;
              await fetch(`http://localhost:3000/students/${student.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  employers: selectedEmployerId,
                  status: selectedEmployerId
                    ? "Xodim biriktirilgan"
                    : "Xodim biriktirilmagan",
                }),
              });
              fetchStudents();
            }}
          >
            <option value="">xodim biriktirilmagan</option>
            {employees.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </td>
        <td className="space-x-2 flex items-center justify-center">
          <button
            className="btn btn-xs border-blue-950"
            onClick={() => handleEdit(student)}
          >
            Tahrirlash
          </button>
          <button
            className="btn btn-xs bg-blue-950 text-white"
            onClick={() => handleDelete(student.id)}
          >
            O‘chirish
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* Paginatsiya */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
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

      {/* Modal */}
      <dialog id="add_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {editId !== null ? "Arizani tahrirlash" : "Yangi ariza"}
          </h3>
          <form className="space-y-3" onSubmit={handleAdd}>
            <input
              type="text"
              name="fullName"
              placeholder="F.I.SH"
              className="input input-bordered w-full"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="faculty"
              placeholder="Fakultet/Guruh"
              className="input input-bordered w-full"
              value={formData.faculty}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Telefon raqam"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <select
              name="serviceType"
              className="select select-bordered w-full"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">Xizmat turini tanlang</option>
              {services.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="status"
              className="input input-bordered w-full"
              value={formData.status}
              disabled
            />
            <div className="modal-action">
              <button type="submit" className="btn bg-blue-950 text-white">
                {editId !== null ? "Saqlash" : "Qo‘shish"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("add_modal").close()}
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
