// components/StatsChart.jsx
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4caf50", "#ff9800", "#f44336"];

export default function StatsChart() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const countByStatus = (status) =>
    students.filter((student) => student.status === status).length;

  const data = [
    { name: "Tayyor", value: countByStatus("Tayyor") },
    { name: "Jarayonda", value: countByStatus("Jarayonda") },
    { name: "Rad etilgan", value: countByStatus("Rad etilgan") },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-10 p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Arizalar Holati Statistikasi</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
