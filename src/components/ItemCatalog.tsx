import React, { useState, useEffect } from 'react';
import { Plus, Search, ShoppingCart, Package } from 'lucide-react';
import { Item, ShopType } from '../types/Item';
import { productCatalog, menuCatalog, serviceCatalog } from '../data/itemCatalog';

interface ItemCatalogProps {
  shopType: ShopType;
  onAddItems: (items: Omit<Item, 'id'>[]) => void;
  existingItems: Item[];
}

const ItemCatalog: React.FC<ItemCatalogProps> = ({ shopType, onAddItems, existingItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [customizations, setCustomizations] = useState<Record<string, any>>({});
  const [customCatalog, setCustomCatalog] = useState<any[]>([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newCustom, setNewCustom] = useState<any>({});

  // Persistent custom catalog per shop type
  useEffect(() => {
    const saved = localStorage.getItem(`customCatalog_${shopType}`);
    setCustomCatalog(saved ? JSON.parse(saved) : []);
  }, [shopType]);

  const saveCustomCatalog = (items: any[]) => {
    setCustomCatalog(items);
    localStorage.setItem(`customCatalog_${shopType}` , JSON.stringify(items));
  };

  const getCatalog = () => {
    let base;
    switch (shopType) {
      case 'product': base = productCatalog; break;
      case 'menu': base = menuCatalog; break;
      case 'service': base = serviceCatalog; break;
      default: base = [];
    }
    return [...base, ...customCatalog];
  };

  const catalog = getCatalog();
  const categories = Array.from(new Set(catalog.map(item => item.category)));
  // Add custom item logic
  const handleAddCustom = () => {
    if (shopType === 'product') {
      if (!newCustom.name || !newCustom.category || !newCustom.brand_name || !newCustom.typical_price_range) {
        alert('Fill all required fields'); return;
      }
      const item = {
        name: newCustom.name,
        hindi_name: newCustom.hindi_name || '',
        category: newCustom.category,
        brand_name: newCustom.brand_name,
        typical_price_range: newCustom.typical_price_range,
        common_varieties: newCustom.common_varieties ? newCustom.common_varieties.split(',').map((v:string)=>v.trim()) : [],
        typical_packs: Number(newCustom.typical_packs) || 1
      };
      saveCustomCatalog([...customCatalog, item]);
    } else if (shopType === 'menu') {
      if (!newCustom.name || !newCustom.category || !newCustom.typical_price) {
        alert('Fill all required fields'); return;
      }
      const item = {
        name: newCustom.name,
        hindi_name: newCustom.hindi_name || '',
        category: newCustom.category,
        description: newCustom.description || '',
        typical_price: newCustom.typical_price,
        common_varieties: newCustom.common_varieties ? newCustom.common_varieties.split(',').map((v:string)=>v.trim()) : [],
        unit: newCustom.unit || ''
      };
      saveCustomCatalog([...customCatalog, item]);
    } else if (shopType === 'service') {
      if (!newCustom.name || !newCustom.category || !newCustom.typical_price_range) {
        alert('Fill all required fields'); return;
      }
      const item = {
        name: newCustom.name,
        description: newCustom.description || '',
        category: newCustom.category,
        highlights: newCustom.highlights ? newCustom.highlights.split(',').map((v:string)=>v.trim()) : [],
        tags: newCustom.tags ? newCustom.tags.split(',').map((v:string)=>v.trim()) : [],
        typical_price_range: newCustom.typical_price_range,
        serviceDetails: {}
      };
      saveCustomCatalog([...customCatalog, item]);
    }
    setShowAddCustom(false);
    setNewCustom({});
  };

  const handleDeleteCatalog = (itemName: string) => {
    // Only allow delete for custom items
    if (customCatalog.some(i => i.name === itemName)) {
      const updated = customCatalog.filter(i => i.name !== itemName);
      saveCustomCatalog(updated);
    } else {
      alert('Cannot delete default catalog item.');
    }
  };

  const filteredItems = catalog.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item as any).hindi_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleItemSelection = (itemName: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemName)) {
      newSelected.delete(itemName);
      const newCustomizations = { ...customizations };
      delete newCustomizations[itemName];
      setCustomizations(newCustomizations);
    } else {
      newSelected.add(itemName);
      const catalogItem = catalog.find(item => item.name === itemName);
      if (catalogItem) {
        if (shopType === 'product') {
          const productItem = catalogItem as any;
          setCustomizations(prev => ({
            ...prev,
            [itemName]: {
              price: productItem.typical_price_range,
              packs: productItem.typical_packs,
              variety: [productItem.common_varieties[0] || ''],
              brand_name: productItem.brand_name,
            }
          }));
        } else if (shopType === 'menu') {
          const menuItem = catalogItem as any;
          setCustomizations(prev => ({
            ...prev,
            [itemName]: {
              price: menuItem.typical_price,
              variety: [menuItem.common_varieties[0] || ''],
              unit: menuItem.unit,
              description: menuItem.description,
            }
          }));
        } else {
          const serviceItem = catalogItem as any;
          setCustomizations(prev => ({
            ...prev,
            [itemName]: {
              price: serviceItem.typical_price_range,
              highlights: serviceItem.highlights,
              tags: serviceItem.tags,
            }
          }));
        }
      }
    }
    setSelectedItems(newSelected);
  };

  const updateCustomization = (itemName: string, field: string, value: any) => {
    setCustomizations(prev => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        [field]: value,
      }
    }));
  };

  const handleAddSelected = () => {
    const itemsToAdd: Omit<Item, 'id'>[] = Array.from(selectedItems).map(itemName => {
      const catalogItem = catalog.find(item => item.name === itemName)!;
      const customization = customizations[itemName];
      
      if (shopType === 'product') {
        const productItem = catalogItem as any;
        return {
          shopType: 'product',
          name: productItem.name,
          hindi_name: productItem.hindi_name,
          category: productItem.category,
          brand_name: customization.brand_name,
          price: customization.price,
          variety: customization.variety,
          packs: customization.packs,
          availability: true,
        };
      } else if (shopType === 'menu') {
        const menuItem = catalogItem as any;
        return {
          shopType: 'menu',
          name: menuItem.name,
          hindi_name: menuItem.hindi_name,
          category: menuItem.category,
          isAvailable: true,
          description: customization.description,
          price: customization.price,
          unit: customization.unit,
          variety: customization.variety,
        };
      } else {
        const serviceItem = catalogItem as any;
        return {
          shopType: 'service',
          name: serviceItem.name,
          description: serviceItem.description,
          price: customization.price,
          highlights: customization.highlights,
          tags: customization.tags,
          availability: true,
          serviceDetails: serviceItem.serviceDetails,
        };
      }
    }) as Omit<Item, 'id'>[];

    onAddItems(itemsToAdd);
    setSelectedItems(new Set());
    setCustomizations({});
  };

  const getShopTypeColor = () => {
    switch (shopType) {
      case 'product': return 'green';
      case 'menu': return 'orange';
      case 'service': return 'blue';
      default: return 'green';
    }
  };

  const color = getShopTypeColor();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {shopType === 'product' ? 'Product' : shopType === 'menu' ? 'Menu' : 'Service'} Catalog
          </h2>
          <button
            className={`px-3 py-2 rounded bg-${color}-600 text-white hover:bg-${color}-700 text-sm`}
            onClick={() => setShowAddCustom(v => !v)}
            type="button"
          >
            + Add Custom
          </button>
        </div>
        {showAddCustom && (
          <div className="mb-4 p-4 bg-gray-50 rounded border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="px-2 py-1 border rounded" placeholder="Name*" value={newCustom.name||''} onChange={e=>setNewCustom((prev:any)=>({...prev,name:e.target.value}))} />
              <input className="px-2 py-1 border rounded" placeholder="Hindi Name" value={newCustom.hindi_name||''} onChange={e=>setNewCustom((prev:any)=>({...prev,hindi_name:e.target.value}))} />
              <input className="px-2 py-1 border rounded" placeholder="Category*" value={newCustom.category||''} onChange={e=>setNewCustom((prev:any)=>({...prev,category:e.target.value}))} />
              {shopType==='product' && <input className="px-2 py-1 border rounded" placeholder="Brand Name*" value={newCustom.brand_name||''} onChange={e=>setNewCustom((prev:any)=>({...prev,brand_name:e.target.value}))} />}
              {shopType==='product' && <input className="px-2 py-1 border rounded" placeholder="Price Range* (e.g. 10-100)" value={newCustom.typical_price_range||''} onChange={e=>setNewCustom((prev:any)=>({...prev,typical_price_range:e.target.value}))} />}
              {shopType==='product' && <input className="px-2 py-1 border rounded" placeholder="Varieties (comma separated)" value={newCustom.common_varieties||''} onChange={e=>setNewCustom((prev:any)=>({...prev,common_varieties:e.target.value}))} />}
              {shopType==='product' && <input className="px-2 py-1 border rounded" placeholder="Packs (number)" value={newCustom.typical_packs||''} onChange={e=>setNewCustom((prev:any)=>({...prev,typical_packs:e.target.value}))} />}
              {shopType==='menu' && <input className="px-2 py-1 border rounded" placeholder="Description" value={newCustom.description||''} onChange={e=>setNewCustom((prev:any)=>({...prev,description:e.target.value}))} />}
              {shopType==='menu' && <input className="px-2 py-1 border rounded" placeholder="Price* (e.g. 150)" value={newCustom.typical_price||''} onChange={e=>setNewCustom((prev:any)=>({...prev,typical_price:e.target.value}))} />}
              {shopType==='menu' && <input className="px-2 py-1 border rounded" placeholder="Varieties (comma separated)" value={newCustom.common_varieties||''} onChange={e=>setNewCustom((prev:any)=>({...prev,common_varieties:e.target.value}))} />}
              {shopType==='menu' && <input className="px-2 py-1 border rounded" placeholder="Unit (e.g. plate)" value={newCustom.unit||''} onChange={e=>setNewCustom((prev:any)=>({...prev,unit:e.target.value}))} />}
              {shopType==='service' && <input className="px-2 py-1 border rounded" placeholder="Description" value={newCustom.description||''} onChange={e=>setNewCustom((prev:any)=>({...prev,description:e.target.value}))} />}
              {shopType==='service' && <input className="px-2 py-1 border rounded" placeholder="Price Range* (e.g. 500-1000)" value={newCustom.typical_price_range||''} onChange={e=>setNewCustom((prev:any)=>({...prev,typical_price_range:e.target.value}))} />}
              {shopType==='service' && <input className="px-2 py-1 border rounded" placeholder="Highlights (comma separated)" value={newCustom.highlights||''} onChange={e=>setNewCustom((prev:any)=>({...prev,highlights:e.target.value}))} />}
              {shopType==='service' && <input className="px-2 py-1 border rounded" placeholder="Tags (comma separated)" value={newCustom.tags||''} onChange={e=>setNewCustom((prev:any)=>({...prev,tags:e.target.value}))} />}
            </div>
            <div className="flex gap-2 mt-3">
              <button className={`px-4 py-2 rounded bg-${color}-600 text-white`} onClick={handleAddCustom} type="button">Add</button>
              <button className="px-4 py-2 rounded bg-gray-200" onClick={()=>setShowAddCustom(false)} type="button">Cancel</button>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {shopType === 'product' ? 'Product' : shopType === 'menu' ? 'Menu' : 'Service'} Catalog
          </h2>
          <div className="flex items-center text-sm text-gray-600">
            <Package className="h-4 w-4 mr-1" />
            {catalog.length} items available
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-transparent`}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-transparent`}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {selectedItems.size > 0 && (
          <div className={`flex items-center justify-between p-3 bg-${color}-50 border border-${color}-200 rounded-lg`}>
            <span className={`text-${color}-800 font-medium`}>
              {selectedItems.size} items selected
            </span>
            <button
              onClick={handleAddSelected}
              className={`flex items-center px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition-colors`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add Selected Items
            </button>
          </div>
        )}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => {
          const isSelected = selectedItems.has(item.name);
          const customization = customizations[item.name];
          const isCustom = customCatalog.some(i => i.name === item.name);
          return (
            <div
              key={item.name}
              className={`bg-white rounded-lg border transition-all ${
                isSelected ? `border-${color}-500 shadow-md` : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    {(item as any).hindi_name && (
                      <p className="text-sm text-gray-600">{(item as any).hindi_name}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {item.category}
                      </span>
                      {isCustom && (
                        <button className="ml-2 text-xs text-red-500 hover:underline" onClick={() => handleDeleteCatalog(item.name)} type="button">Delete</button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleItemSelection(item.name)}
                    className={`p-2 rounded-lg border-2 transition-colors ${
                      isSelected
                        ? `bg-${color}-600 border-${color}-600 text-white`
                        : `border-gray-300 hover:border-${color}-500 text-gray-600`
                    }`}
                  >
                    {isSelected ? <ShoppingCart className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {shopType === 'product' && (
                    <>
                      <div><strong>Price range:</strong> ₹{(item as any).typical_price_range}</div>
                      <div><strong>Packs:</strong> {(item as any).typical_packs}</div>
                    </>
                  )}
                  {shopType === 'menu' && (
                    <>
                      <div><strong>Price:</strong> ₹{(item as any).typical_price}</div>
                      <div><strong>Unit:</strong> {(item as any).unit}</div>
                    </>
                  )}
                  {shopType === 'service' && (
                    <>
                      <div><strong>Price range:</strong> ₹{(item as any).typical_price_range}</div>
                      <div className="text-xs mt-1">{item.description}</div>
                    </>
                  )}
                </div>
                {isSelected && customization && (
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    {shopType === 'product' && (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Price Range (₹)
                          </label>
                          <input
                            type="text"
                            value={customization.price}
                            onChange={(e) => updateCustomization(item.name, 'price', e.target.value)}
                            className={`w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-${color}-500 focus:border-transparent`}
                            placeholder="10-100"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Packs
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={customization.packs}
                            onChange={(e) => updateCustomization(item.name, 'packs', parseInt(e.target.value) || 1)}
                            className={`w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-${color}-500 focus:border-transparent`}
                          />
                        </div>
                      </>
                    )}
                    {shopType === 'menu' && (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Price (₹)
                          </label>
                          <input
                            type="text"
                            value={customization.price}
                            onChange={(e) => updateCustomization(item.name, 'price', e.target.value)}
                            className={`w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-${color}-500 focus:border-transparent`}
                            placeholder="150"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Unit
                          </label>
                          <input
                            type="text"
                            value={customization.unit}
                            onChange={(e) => updateCustomization(item.name, 'unit', e.target.value)}
                            className={`w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-${color}-500 focus:border-transparent`}
                            placeholder="plate"
                          />
                        </div>
                      </>
                    )}
                    {shopType === 'service' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Price Range (₹)
                        </label>
                        <input
                          type="text"
                          value={customization.price}
                          onChange={(e) => updateCustomization(item.name, 'price', e.target.value)}
                          className={`w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-${color}-500 focus:border-transparent`}
                          placeholder="500-1000"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default ItemCatalog;