import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard';
import ProductModal from '../ProductModal';
import { Product } from '../../types/product';
import Loader from '../Loader';
import './Products.scss';

interface ProductsProps {
  searchQuery: string;
  selectedCategory: string | null;
  selectedCategories: string[];
}

const Products: React.FC<ProductsProps> = ({ searchQuery, selectedCategories, selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const filteredProducts = useMemo(() => 
  searchQuery
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products,
  [products, searchQuery]
);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setProducts([]);
  
    try {
      if (!selectedCategories.length || selectedCategories.includes('all')) {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        setProducts(response.data);
      } else if (selectedCategory) {
          const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`)
          setProducts(response.data)
        } else {
          let allProducts: Product[] = [];
          for (const category of selectedCategories) {
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
            allProducts = allProducts.concat(response.data);
          }
          setProducts(allProducts);
        }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  
    setLoading(false);
  }, [selectedCategories, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

	const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
		<>
			<ProductModal 
				isOpen={!!selectedProduct}
				onClose={closeModal} 
				product={selectedProduct}
			/>
			<div className="container">
				<div className="products-container">
					{filteredProducts.length ? (filteredProducts.map((product) => (
						<ProductCard
							key={product.id}
							{...product}
							onCardClick={() => openModal(product)}
						/>
					))) : (
            <Loader isLoading={loading} hasProducts={!!filteredProducts.length} />
          )}
				</div>
			</div>
		</>
  );
};

export default Products;