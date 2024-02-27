import  { useState } from 'react';
import Form from './components/Form';
// import './App.css'; // Import CSS file for styling

const App = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFormSubmit = (formData) => {
    setData([...data, formData]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = sortKey
    ? filteredData.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      })
    : filteredData;

  return (
    <div className="app-container">
      <h1 id="CRUD">CRUD Interface with React</h1>
      <Form onSubmit={handleFormSubmit} />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search"
        className="search-input"
      />
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <SortButton onClick={() => handleSort('name')} sortOrder={sortKey === 'name' ? sortOrder : null}>
                Name
              </SortButton>
            </th>
            <th>
              <SortButton onClick={() => handleSort('address')} sortOrder={sortKey === 'address' ? sortOrder : null}>
                Address
              </SortButton>
            </th>
            <th>
              <SortButton onClick={() => handleSort('mobileNumber')} sortOrder={sortKey === 'mobileNumber' ? sortOrder : null}>
                Mobile Number
              </SortButton>
            </th>
            <th>
              <SortButton onClick={() => handleSort('email')} sortOrder={sortKey === 'email' ? sortOrder : null}>
                Email
              </SortButton>
            </th>
            <th>
              <SortButton onClick={() => handleSort('message')} sortOrder={sortKey === 'message' ? sortOrder : null}>
                Message
              </SortButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SortButton = ({ onClick, sortOrder, children }) => (
  <button onClick={onClick} className="sort-button">
    {children} {sortOrder && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
  </button>
);

export default App;
