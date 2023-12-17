import { useState } from 'react';
import SearchInput from '../SearchInput';
import './Menu.scss';

interface MenuProps {
  onSearch: (query: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (query: string) => {
    onSearch(query);
  };

  return (
		<div className="container">
			<div className="menu-wrapper">
				<SearchInput onSearch={handleSearch} />
				<nav className="adaptive-menu">
					<div className="menu-icon" onClick={toggleMenu}>
						<div className={isOpen ? 'menu-icon-line open' : 'menu-icon-line'} />
						<div className={isOpen ? 'menu-icon-line open' : 'menu-icon-line'} />
						<div className={isOpen ? 'menu-icon-line open' : 'menu-icon-line'} />
					</div>
					<ul className={`menu-list ${isOpen ? 'open' : ''}`}>
						<li><a href="#">Profile</a></li>
						<li><a href="#">Settings</a></li>
						<li><a href="#">Cart</a></li>
						<li><a href="#">About</a></li>
						<li><a href="#">Favorite</a></li>
					</ul>
				</nav>
			</div>
		</div>
  );
};

export default Menu;
