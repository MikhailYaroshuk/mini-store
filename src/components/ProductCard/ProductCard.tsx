import { Product } from '../../types/product';
import './ProductCard.scss';

const ProductCard: React.FC<Product & { onCardClick: () => void }> = ({ id, title, price, image, rating, onCardClick }) => {
  return (
    <div className="product-card" key={id} onClick={onCardClick}>
      <div className="image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <div className="footer-details">
          <p className="product-price">${price}</p>
          <p className='product-rating'>{rating.count} sold ⭐ {rating.rate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
