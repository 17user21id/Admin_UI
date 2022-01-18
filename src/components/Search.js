import React, { useState } from "react";

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <input
            type="text"
            className="form-control"
            style={{ width: "500px",height:'40px',marginLeft:'20px' }}
            placeholder="Search by name email or role"
            value={search}
            onChange={e => onInputChange(e.target.value)}
        />
    );
};

export default Search;