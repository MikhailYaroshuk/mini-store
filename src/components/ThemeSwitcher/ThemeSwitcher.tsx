import { useTheme } from './ThemeContext';
import './ThemeSwitcher.scss';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
		<div className="switcher-wrapper">
			<span>Switch to {theme === 'dark' ? "light" : "dark"}</span>
			<label className="theme-switcher">
				<input 
					type="checkbox" 
					checked={theme === 'dark'} 
					onChange={toggleTheme} 
				/>
				<span className="slider"/>
			</label>
		</div>
  );
};

export default ThemeSwitcher;
