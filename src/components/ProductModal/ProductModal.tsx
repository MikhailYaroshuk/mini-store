import ReactDOM from 'react-dom';
import { Product } from '../../types/product';
import { useEffect } from 'react';
import { useTheme } from '../ThemeSwitcher/ThemeContext';
import './ProductModal.scss';

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null ;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const { theme } = useTheme();

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) modalRoot.className = theme;
  }, [theme]);

  const modalContent = isOpen && product ? (
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{product.title}</h2>
        <div className="image-container">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <div className="product-details">
          <div className="footer-details">
            <div className="product-description">{product.description}</div>
            <p className="product-price">${product.price}</p>
            <p className='product-rating'>{product.rating.count} sold ⭐ {product.rating.rate}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default ProductModal;