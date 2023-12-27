import React, { useState } from 'react';
import './Categories.css';

const Categories = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { name: 'Kadın', isNew: false },
        { name: 'Erkek', isNew: false },
        { name: 'Anne & Çocuk', isNew: false },
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
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
              {category.isNew && <span className="new-tag">Yeni</span>}
            </div>
          ))}
        </div>
      );
};

export default Categories;
