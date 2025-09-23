import React, { useState, useEffect } from 'react';
import { Package, Download, Plus, Grid, BookOpen, Store, UtensilsCrossed, Wrench } from 'lucide-react';
import ItemForm from './components/ItemForm';
import ItemTable from './components/ItemTable';
import ItemCatalog from './components/ItemCatalog';
import ExportModal from './components/ExportModal';
import { Item, ShopType } from './types/Item';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'table' | 'catalog'>('form');
  const [shopType, setShopType] = useState<ShopType>('product');
  const [showExportModal, setShowExportModal] = useState(false);

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem(`bulkItems_${shopType}`);
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error loading saved items:', error);
      }
    } else {
      setItems([]);
    }
  }, [shopType]);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(`bulkItems_${shopType}`, JSON.stringify(items));
  }, [items, shopType]);

  const addItem = (item: Omit<Item, 'id'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
    } as Item;
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updatedItem: Partial<Item>) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearAllItems = () => {
    setItems([]);
  };

  const addMultipleItems = (newItems: Omit<Item, 'id'>[]) => {
    const itemsWithIds: Item[] = newItems.map(item => ({
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    })) as Item[];
    setItems(prev => [...prev, ...itemsWithIds]);
  };

  const shopTypeConfig = {
    product: {
      icon: Store,
      label: 'Product Shop',
      color: 'green',
      description: 'Grocery, Electronics, Retail'
    },
    menu: {
      icon: UtensilsCrossed,
      label: 'Menu Shop',
      color: 'orange',
      description: 'Restaurant, Cafe, Food'
    },
    service: {
      icon: Wrench,
      label: 'Service Shop',
      color: 'blue',
      description: 'Repair, Salon, Services'
    }
  };

  const tabs = [
    { id: 'form' as const, label: 'Add Items', icon: Plus },
    { id: 'table' as const, label: 'Bulk Edit', icon: Grid },
    { id: 'catalog' as const, label: 'Catalog', icon: BookOpen },
  ];

  const getShopTypeColor = (type: ShopType) => {
    const colors = {
      product: 'green',
      menu: 'orange',
      service: 'blue'
    };
    return colors[type];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-gray-700 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">
                Bulk Item Entry
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 hidden sm:block">
                {items.length} items
              </span>
              <button
                onClick={() => setShowExportModal(true)}
                disabled={items.length === 0}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Shop Type Selector */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {Object.entries(shopTypeConfig).map(([type, config]) => {
              const Icon = config.icon;
              const isActive = shopType === type;
              return (
                <button
                  key={type}
                  onClick={() => setShopType(type as ShopType)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                    isActive
                      ? `border-${config.color}-500 bg-${config.color}-50 text-${config.color}-700`
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="font-medium text-sm">{config.label}</span>
                  <span className="text-xs text-gray-500 text-center hidden sm:block">
                    {config.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const color = getShopTypeColor(shopType);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? `border-${color}-500 text-${color}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'form' && (
          <ItemForm onAddItem={addItem} shopType={shopType} />
        )}
        
        {activeTab === 'table' && (
          <ItemTable
            items={items}
            shopType={shopType}
            onUpdateItem={updateItem}
            onDeleteItem={deleteItem}
            onClearAll={clearAllItems}
          />
        )}
        
        {activeTab === 'catalog' && (
          <ItemCatalog
            shopType={shopType}
            onAddItems={addMultipleItems}
            existingItems={items}
          />
        )}

        {/* Items Summary */}
        {items.length > 0 && activeTab !== 'table' && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Added Items Summary ({items.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {items.slice(-20).map(item => (
                <div key={item.id} className="border rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 truncate">
                    {item.name || (item.shopType === 'service' ? (item as any).description : 'Unnamed Item')}
                  </h4>
                  {item.hindi_name && (
                    <p className="text-sm text-gray-600 truncate">{item.hindi_name}</p>
                  )}
                  <div className="mt-1 text-sm text-gray-500">
                    {item.price && (
                      <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-2">
                        ₹{item.price}
                      </span>
                    )}
                    {item.shopType === 'menu' && (item as any).isAvailable && (
                      <span className="inline-block bg-green-100 text-green-800 rounded px-2 py-1">
                        Available
                      </span>
                    )}
                    {(item.shopType === 'product' || item.shopType === 'service') && item.availability && (
                      <span className="inline-block bg-green-100 text-green-800 rounded px-2 py-1">
                        Available
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {items.length > 20 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Showing last 20 items. Switch to Bulk Edit to see all items.
              </p>
            )}
          </div>
        )}
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          items={items}
          shopType={shopType}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}

export default App;