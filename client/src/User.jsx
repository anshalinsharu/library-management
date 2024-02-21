
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";
const User = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [authorFilter, setAuthorFilter] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/displaybooks');
            setBooks(response.data);
            setFilteredBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleFilter = () => {
        const filtered = books.filter(book => {
            return (
                (authorFilter === '' || book.author.toLowerCase().includes(authorFilter.toLowerCase())) &&
                (subjectFilter === '' || book.subject.toLowerCase().includes(subjectFilter.toLowerCase()))
            );
        });
        setFilteredBooks(filtered);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                    <label htmlFor="author" className="block mb-2">Filter by Author</label>
                    <input
                        type="text"
                        id="author"
                        placeholder="Author"
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="border border-gray-300 rounded-l px-4 py-2 w-full"
                    />
                </div>
                <div className="w-1/2 ml-2">
                    <label htmlFor="subject" className="block mb-2">Filter by Subject</label>
                    <input
                        type="text"
                        id="subject"
                        placeholder="Subject" 
                        value={subjectFilter}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                        className="border border-gray-300 rounded-r px-4 py-2 w-full"
                    />
                </div>
            </div>
            <button onClick={handleFilter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Apply Filters
            </button>
            <table className="table-auto w-full mt-4">
                <thead>
                <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Author</th>
                    <th className="px-4 py-2">Subject</th>
                    <th className="px-4 py-2">Publish Date</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map((book, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{book.title}</td>
                        <td className="border px-4 py-2">{book.author}</td>
                        <td className="border px-4 py-2">{book.subject}</td>
                        <td className="border px-4 py-2">{moment(book.publishdate).format("DD-MM-YYYY")}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;