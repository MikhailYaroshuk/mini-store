import { useEffect, useState } from 'react';
import './Breadcrumbs.scss';

interface BreadcrumbsProps {
  selectedCategories: string[] | null;
  onSelectCategory: (category: string | null) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ selectedCategories, onSelectCategory }) => {
	const [lastSelectedCategory, setLastSelectedCategory] = useState('');

	const handleBreadcrumbClick = (category: string) => {
		setLastSelectedCategory(category);
    onSelectCategory(category === 'all' ? null : category);
  };

	useEffect(() => {
		setLastSelectedCategory('');
	}, [selectedCategories])
	
  return (
		<div className="breadcrumbs">
			{(lastSelectedCategory || !selectedCategories || selectedCategories.includes('all')) ? (
				lastSelectedCategory !== 'all' ? (
					<>
						<button className="breadcrumb" onClick={() => handleBreadcrumbClick('all')}>All</button>
						<div key={lastSelectedCategory}>
							<button
								className="breadcrumb"
								onClick={() => handleBreadcrumbClick(lastSelectedCategory)}
							>
								{lastSelectedCategory}
							</button>
						</div>
					</>
				) : (<button className="breadcrumb" onClick={() => handleBreadcrumbClick('all')}>All</button>)
			) : (
				<>
					<button className="breadcrumb" onClick={() => handleBreadcrumbClick('all')}>All</button>
					{selectedCategories.map((category) => (
						<div key={category}>
							{category !== selectedCategories[0] && <span>, </span>}
							<button
								className="breadcrumb"
								onClick={() => handleBreadcrumbClick(category)}
							>
								{category}
							</button>
						</div>
					))}
				</>
			)}
		</div>
  );
};

export default Breadcrumbs;
