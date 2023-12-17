import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Filter.scss'; 

interface FilterProps {
  categories: string[];
  onCategoryChange: (selectedCategories: string[]) => void;
  selectedCategory: string | null;
}

const Filter: React.FC<FilterProps> = ({ categories, onCategoryChange, selectedCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    let newSelectedCategories = category === 'all'
      ? (isChecked ? ['all'] : [])
      : isChecked
        ? [...selectedCategories.filter(selectedCategory => selectedCategory !== 'all'), category]
        : selectedCategories.filter(selectedCategory => selectedCategory !== category);

    if (category !== 'all' && newSelectedCategories.length === 0) {
      newSelectedCategories.push('all');
    }

    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);
  };

  useEffect(() => {
    setSelectedCategories(selectedCategory === null || selectedCategory === 'all' ? ['all'] : [selectedCategory]);
  }, [selectedCategory]);

  return (
    <div className="filter-component">
      <button className="filter-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        Filter<FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} />
      </button>
      {isDropdownOpen && (
        <div className="filter-dropdown">
          {categories.map((category) => (
            <div key={category} className="filter-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                />
                {category}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;