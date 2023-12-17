import { useEffect, useState } from 'react';
import Products from './components/Products';
import axios from 'axios';
import Breadcrumbs from './components/Breadcrumbs';
import Filter from './components/Filter';
import Menu from './components/Menu';
import { ThemeProvider, useTheme } from './components/ThemeSwitcher/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import '/src/styles/themes.scss';
import './App.scss';

  const ThemedApp: React.FC = () => {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const onCategoryChange = (categories: string[]) => {
      setSelectedCategories(categories)
      setSelectedCategory(null)
    };
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products/categories');
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      fetchCategories();
    }, []);
  
    return (
      <div className={`app ${theme}`}>
        <Menu onSearch={setSearchQuery} />
        <div className="container">
          <div className="filter-wrapper">
            <Breadcrumbs 
              selectedCategories={selectedCategories} 
              onSelectCategory={setSelectedCategory} 
            />
            <div className='right-side'>
              <ThemeSwitcher />
              <Filter 
                categories={['all', ...categories]} 
                onCategoryChange={onCategoryChange}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>
        <Products 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedCategories={selectedCategories}
        />
      </div>
    );
  };
  
  const App: React.FC = () => {
    return (
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    );
  };
  
  export default App;