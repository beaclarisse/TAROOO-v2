import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-autocomplete";
// import "../../App.css";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    let navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/ShopProduct");
        }
    };

    const handleSelect = (value) => {
        setKeyword(value);
    };

    const getSuggestions = async (value) => {
        const response = await fetch(`/api/v1/products?keyword=${value}`);
        const data = await response.json();
        const suggestions = data.products.map((product) => product.name);
        setSuggestions(suggestions);
    };

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                {/* <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                /> */}
                <Autocomplete
                    id="search_field"
                    items={suggestions}
                    getItemValue={(item) => item}
                    renderItem={(item, isHighlighted) => (
                        <div key={item} style={{ background: isHighlighted ? 'black' : 'white', fontFamily: 'Amazon Ember', fontSize: '20px', color: isHighlighted ? '#9D00FF' : 'black' }}>
                            {item}
                        </div>
                    )}
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                        getSuggestions(e.target.value);
                    }}
                    onSelect={handleSelect}
                    inputProps={{
                        className: 'form-control',
                        placeholder: 'Enter Product Name ...',
                        style: { width: '500px' }, // set width to 300 pixels
                    }}
                //   wrapperStyle={{ position: 'relative' }}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;