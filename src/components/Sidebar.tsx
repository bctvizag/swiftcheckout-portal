import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, ShoppingCart, Package, History } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/' },
    { icon: ShoppingCart, label: 'New Sale', path: '/sale' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: History, label: 'Orders', path: '/orders' },
  ];

  return (
    <div className="w-64 bg-primary text-primary-foreground p-4">
      <div className="text-2xl font-bold mb-8 p-4">POS System</div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-accent text-accent-foreground' 
                  : 'hover:bg-primary-foreground/10'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;