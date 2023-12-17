import './SearchInput.scss';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
