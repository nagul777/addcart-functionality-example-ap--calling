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
          <ul className='bg-slate-900 text-white space-x-6 text-center p-[30px_0px] text-xl font-medium'>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart 
              <span className='p-[0px_5px] rounded-full bg-orange-500 ml-2'>{totalItemsInCart}</span>
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
