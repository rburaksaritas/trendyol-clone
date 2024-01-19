import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = () => {

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    console.log(categoryName.toLocaleLowerCase('tr-TR'));
    navigate(`/search/${categoryName.toLocaleLowerCase('tr-TR')}`); // Adjust the URL as needed
  };

  const categories = [
    { name: 'Kadın', isNew: false },
    { name: 'Erkek', isNew: false },
    { name: 'Anne Çocuk', isNew: false },
    { name: 'Ev & Yaşam', isNew: false },
    { name: 'Süpermarket', isNew: false },
    { name: 'Kozmetik', isNew: false },
    { name: 'Ayakkabı & Çanta', isNew: false },
    { name: 'Elektronik', isNew: false },
    { name: 'İş Yerine Özel', isNew: true },
    { name: 'Çok Satanlar', isNew: true },
    { name: 'Flaş Ürünler', isNew: true }
  ];

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-item ${selectedCategory === category.name ? 'selected' : ''}`}
          onClick={() => handleCategoryClick(category.name)}
        >
          {category.name}
          {category.isNew && <span className="new-tag">Yeni</span>}
        </div>
      ))}
    </div>
  );
};

export default Categories;
