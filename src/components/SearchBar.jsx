import PropTypes from "prop-types";

export const SearchBar = ({search, handleSearchChange}) => {
    return (
        <>
            <div className="input-group">
                <select id="column" value={search.column} onChange={handleSearchChange} className="form-select-md">
                    <option value="firstName">Ime</option>
                    <option value="lastName">Prezime</option>
                    <option value="pid">OIB</option>
                </select>
                <input
                    id="term"
                    type="text"
                    value={search.term}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    className="form-control-md"
                />
            </div>
        </>
    );
};

SearchBar.propTypes = {
    search: PropTypes.shape({column: PropTypes.string, term: PropTypes.string}).isRequired,
    handleSearchChange: PropTypes.func.isRequired,
};