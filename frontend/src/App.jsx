import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setisDelete] = useState(false);
    const [deleteItem, setdeleteItem] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        department: "",
    });
    const [editId, setEditId] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    // console.log(apiUrl);
    
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await axios.get(`${apiUrl}/api/employees`);
        setEmployees(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`${apiUrl}/api/employees/${editId}`, formData);
            setEditId(null);
        } else {
            await axios.post(`${apiUrl}/api/newemployees`, formData);
        }
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            age: "",
            department: "",
        });
        closeModal();
        fetchEmployees();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            age: "",
            department: "",
        });
        setEditId(null);
    };

    const handleEdit = (employee) => {
        setEditId(employee.id);
        setFormData({
            fullName: employee.fullName,
            email: employee.email,
            phone: employee.phone,
            age: employee.age,
            department: employee.department,
        });
        openModal();
    };

    const openDeleteModel = (employee) => {
        setisDelete(true);
        setdeleteItem(employee);
    };

    const confirmDelete = () => {
        handleDelete(deleteItem.id);
        setisDelete(false);
    };
    const closeDeleteModal = () => {
        setisDelete(false);
    };
    const handleDelete = async (id) => {
        await axios.delete(`${apiUrl}/api/employees/${id}`);
        fetchEmployees();
    };

    return (
        <div className="w-full">
            <div className=" mx-4 md:mx-10">
                <h1 className="text-center text-xl md:text-2xl text-blue-900 font-extrabold">
                    MySQL DataBase
                    <span className="text-yellow-500 text-2xl md:text-3xl">
                        {" "}
                        'CRUD'{" "}
                    </span>
                    Operation Application
                </h1>

                <div className="flex justify-between w-full mt-4">
                    <h1 className="text-blue-500 font-bold text-xl md:text-2xl mt-4">
                        All Employees
                    </h1>
                    <button
                        className="bg-blue-800 px-3 py-2 sm:px-4 sm:py-2 md:mr-10 rounded-md text-white"
                        onClick={openModal}
                    >
                        Add New Employee
                    </button>
                </div>

                <table className="bg-blue-100 min-w-full table-auto border-collapse border border-blue-500 mt-4 text-sm md:text-base">
                    <thead>
                        <tr className="bg-blue-200">
                            <th className="w-2 border border-blue-500 px-2 sm:px-4 py-2">
                                Sr/No.
                            </th>
                            <th className="border border-blue-500 px-2 sm:px-4 py-2">
                                Full Name
                            </th>
                            <th className="border border-blue-500 px-2 sm:px-4 py-2">
                                Email
                            </th>
                            <th className="border border-blue-500 px-2 sm:px-4 py-2">
                                Phone
                            </th>
                            <th className="border border-blue-500 px-2 sm:px-4 py-2">
                                Age
                            </th>
                            <th className="border border-blue-500 px-2 sm:px-4 py-2">
                                Department
                            </th>
                            <th className="border border-blue-500 px-2 sm:px-4 py-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr
                                key={employee.id}
                                className="border-t border-blue-500"
                            >
                                <td className="bg-blue-200 border border-blue-500 px-2 sm:px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border border-blue-500 px-2 sm:px-4 py-2">
                                    {employee.fullName}
                                </td>
                                <td className="border border-blue-500 px-2 sm:px-4 py-2">
                                    {employee.email}
                                </td>
                                <td className="border border-blue-500 px-2 sm:px-4 py-2">
                                    {employee.phone}
                                </td>
                                <td className="border border-blue-500 px-2 sm:px-4 py-2">
                                    {employee.age}
                                </td>
                                <td className="border border-blue-500 px-2 sm:px-4 py-2">
                                    {employee.department}
                                </td>
                                <td className="flex justify-center items-center px-2 sm:px-4 py-2">
                                    <button
                                        className="bg-blue-500 px-2 sm:px-4 py-2 m-1 rounded-md text-white"
                                        onClick={() => handleEdit(employee)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 px-2 sm:px-4 py-2 m-1 rounded-md text-white"
                                        onClick={() =>
                                            openDeleteModel(employee)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-lg w-11/12 sm:w-96">
                            <h2 className="text-xl sm:text-2xl mb-4">
                                {editId ? "Edit Employee" : "Add New Employee"}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fullName: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-md"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-md"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-md"
                                />
                                <input
                                    type="number"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            age: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-md"
                                />
                                <input
                                    type="text"
                                    placeholder="Department"
                                    value={formData.department}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            department: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-md"
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="bg-gray-500 px-3 sm:px-4 py-2 rounded-md text-white"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 px-3 sm:px-4 py-2 rounded-md text-white"
                                    >
                                        {editId
                                            ? "Update Employee"
                                            : "Add Employee"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {isDelete && (
                    <div className=" fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="w-1/2 bg-white p-6 rounded-md shadow-lg ">
                            <h2 className="text-xl sm:text-2xl mb-4">
                                Delete This Item
                            </h2>
                            <table className="min-w-full table-auto border-collapse border border-gray-400 mt-4">
                                <tbody>
                                    <tr className="bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2 font-bold">
                                            Name
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {deleteItem.fullName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-bold">
                                            Email
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {deleteItem.email}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2 font-bold">
                                            Phone
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {deleteItem.phone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-bold">
                                            Age
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {deleteItem.age}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2 font-bold">
                                            Department
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {deleteItem.department}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-gray-500 px-3 sm:px-4 py-2 rounded-md text-white"
                                    onClick={closeDeleteModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-600 px-3 sm:px-4 py-2 rounded-md text-white"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
