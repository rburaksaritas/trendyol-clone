import React from 'react';
import './Cards.css';

const cardData = [
    // mock data for now, 
    // will fetch from db.
    {
      id: 1,
      imageUrl: "https://cdn.dsmcdn.com/ty998/pimWidgetApi/mobile_20230912104127_2317167KozmetikMobile202309111703.jpg",
      title: "Kozmetik Ürünleri"
    },
    {
      id: 2,
      imageUrl: "https://cdn.dsmcdn.com/ty1095/pimWidgetApi/mobile_20231219123352_2358947KadinMobile202312191523.jpg",
      title: "Bershka - Mağazayı İncele"
    },
    {
      id: 3,
      imageUrl: "https://cdn.dsmcdn.com/ty1000/pimWidgetApi/mobile_20230918145002_2311010ErkekMobile202309141701.jpg",
      title: "Mango - Mağazayı İncele"
    },
    {
      id: 4,
      imageUrl: "https://cdn.dsmcdn.com/ty1051/pimWidgetApi/mobile_20231117115004_GANTNewBanner.jpg",
      title: "Gant - Yeni Mağaza"
    },
    {
      id: 5,
      imageUrl: "https://cdn.dsmcdn.com/ty1039/pimWidgetApi/mobile_20231111115506_2333877AyakkabiCantaMobile202310041504.jpg",
      title: "En Tarz Çantalar"
    },
    {
      id: 6,
      imageUrl: "https://cdn.dsmcdn.com/ty995/pimWidgetApi/mobile_20230905150623_2326796AyakkabiCantaMobile202309051601.jpg",
      title: "Bot ve Çizmeler"
    }
  ];
  

const Cards = () => {
  return (
    <div className="cards-container">
      {cardData.map((card, index) => (
        <div key={index} className="card" onClick={() => console.log('Card clicked!', card)}>
          <img src={card.imageUrl} alt={card.title} className="card-image" />
          <div className="card-title">{card.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
