import React from 'react';
import Navbar from './components/Navbar';
import Categories from './components/Categories';

function App() {
  const isLoggedIn = false; // This would be determined by authentication logic
  const cartItemCount = 1; // This would be determined by the state of the cart

  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <Navbar isLoggedIn={isLoggedIn} cartItemCount={cartItemCount} />
          <Categories></Categories>
          {/* The rest of your app's components go here */}
        </div>
      </header>
    </div>
  );
}

export default App;
