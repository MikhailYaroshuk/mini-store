interface LoadingIndicatorProps {
  isLoading: boolean;
  hasProducts: boolean;
}

const Loader: React.FC<LoadingIndicatorProps> = ({ isLoading, hasProducts }) => {
  return (
    isLoading 
      ? <p>Loading more products...</p>
      : !hasProducts 
        ? <span>No results found</span>
        : null
  );
};

export default Loader;
