import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import userStore from '../store/user';
import useStore from '../store';

function Layout() {

    const { user, logout } = userStore();
    const { getTotalCartItemsCount } = useStore();

    const totalItemsInCart = getTotalCartItemsCount();

  return (
    <div>
      <header>
        <nav>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart
               {totalItemsInCart}
            </Link>
           {user ? <button
              onClick={logout}
              >
                Logout
            </button> :
           <Link to="login">Login</Link>
           }
 
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
