import React, { useState, useEffect } from 'react';
import { Trash2, Search, AlertCircle } from 'lucide-react';
import { Item, ShopType, ProductItem, MenuItem, ServiceItem } from '../types/Item';

interface ItemTableProps {
  items: Item[];
  shopType: ShopType;
  onUpdateItem: (id: string, updatedItem: Partial<Item>) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ 
  items, 
  shopType,
  onUpdateItem, 
  onDeleteItem, 
  onClearAll 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCell, setEditingCell] = useState<{ itemId: string; field: string } | null>(null);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const filtered = items.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (item.name && item.name.toLowerCase().includes(searchLower)) ||
        (item.hindi_name && item.hindi_name.toLowerCase().includes(searchLower)) ||
        (item.category && item.category.toLowerCase().includes(searchLower)) ||
        (shopType === 'service' && (item as ServiceItem).description && 
         (item as ServiceItem).description.toLowerCase().includes(searchLower))
      );
    });
    setFilteredItems(filtered);
  }, [items, searchTerm, shopType]);

  const handleCellClick = (itemId: string, field: string) => {
    if (field === 'id') return;
    setEditingCell({ itemId, field });
  };

  const handleCellChange = (itemId: string, field: string, value: any) => {
    onUpdateItem(itemId, { [field]: value });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const renderCell = (item: Item, field: string) => {
    const isEditing = editingCell?.itemId === item.id && editingCell?.field === field;
    const value = (item as any)[field];

    if (field === 'id') {
      return <span className="text-xs text-gray-500">{value.toString().slice(-6)}</span>;
    }

    // Boolean fields
    if (field === 'availability' || field === 'isAvailable') {
      return (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => handleCellChange(item.id, field, e.target.checked)}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
      );
    }

    // Array fields
    if (field === 'variety' || field === 'highlights' || field === 'tags') {
      const arrayValue = Array.isArray(value) ? value : [];
      if (isEditing) {
        return (
          <input
            type="text"
            defaultValue={arrayValue.join(', ')}
            onBlur={(e) => {
              handleCellChange(item.id, field, e.target.value.split(',').map(s => s.trim()).filter(s => s));
              handleCellBlur();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            autoFocus
          />
        );
      }
      return (
        <span 
          onClick={() => handleCellClick(item.id, field)}
          className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded text-xs"
        >
          {arrayValue.join(', ') || '-'}
        </span>
      );
    }

    // Number fields
    if (field === 'packs') {
      if (isEditing) {
        return (
          <input
            type="number"
            min="1"
            max="50"
            defaultValue={Number(value)}
            onBlur={(e) => {
              handleCellChange(item.id, field, parseInt(e.target.value) || 1);
              handleCellBlur();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            autoFocus
          />
        );
      }
      return (
        <span 
          onClick={() => handleCellClick(item.id, field)}
          className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded text-xs"
        >
          {Number(value)} packs
        </span>
      );
    }

    // Price field
    if (field === 'price') {
      if (isEditing) {
        return (
          <input
            type="text"
            defaultValue={value?.toString() || ''}
            onBlur={(e) => {
              handleCellChange(item.id, field, e.target.value);
              handleCellBlur();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            autoFocus
          />
        );
      }
      return (
        <span 
          onClick={() => handleCellClick(item.id, field)}
          className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded text-xs"
        >
          {value ? `₹${value}` : '-'}
        </span>
      );
    }

    // Text fields
    if (isEditing) {
      return (
        <input
          type="text"
          defaultValue={value?.toString() || ''}
          onBlur={(e) => {
            handleCellChange(item.id, field, e.target.value);
            handleCellBlur();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
          className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
          autoFocus
        />
      );
    }

    return (
      <span 
        onClick={() => handleCellClick(item.id, field)}
        className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded text-xs block truncate"
        title={value?.toString()}
      >
        {value?.toString() || '-'}
      </span>
    );
  };

  const getColumns = () => {
    const baseColumns = ['id'];
    
    if (shopType === 'product') {
      return [...baseColumns, 'name', 'hindi_name', 'category', 'brand_name', 'price', 'variety', 'packs', 'availability'];
    } else if (shopType === 'menu') {
      return [...baseColumns, 'name', 'hindi_name', 'category', 'description', 'price', 'unit', 'variety', 'imageUrl', 'isAvailable'];
    } else {
      return [...baseColumns, 'name', 'description', 'price', 'highlights', 'tags', 'availability'];
    }
  };

  const getColumnLabel = (column: string) => {
    const labels: Record<string, string> = {
      id: 'ID',
      name: 'Name',
      hindi_name: 'Hindi Name',
      category: 'Category',
      brand_name: 'Brand',
      price: 'Price',
      variety: 'Variety',
      packs: 'Packs',
      availability: 'Available',
      description: 'Description',
      unit: 'Unit',
      imageUrl: 'Image URL',
      isAvailable: 'Available',
      highlights: 'Highlights',
      tags: 'Tags'
    };
    return labels[column] || column;
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items added yet</h3>
        <p className="text-gray-600">
          Start by adding items using the "Add Items" tab or select from the catalog.
        </p>
      </div>
    );
  }

  const getShopTypeColor = () => {
    switch (shopType) {
      case 'product': return 'green';
      case 'menu': return 'orange';
      case 'service': return 'blue';
      default: return 'green';
    }
  };

  const color = getShopTypeColor();
  const columns = getColumns();

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Bulk Edit Items ({items.length})
          </h2>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
            
            <button
              onClick={onClearAll}
              className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 text-sm"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map(column => (
                <th key={column} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getColumnLabel(column)}
                </th>
              ))}
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map(column => (
                  <td key={column} className="px-3 py-2">
                    {renderCell(item, column)}
                  </td>
                ))}
                <td className="px-3 py-2">
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-700 p-1 rounded"
                    title="Delete item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filteredItems.length > 0 && (
        <div className="px-4 py-3 border-t bg-gray-50 text-sm text-gray-600">
          Showing {filteredItems.length} of {items.length} items. 
          <span className="ml-2 text-blue-600">Click any cell to edit.</span>
        </div>
      )}
    </div>
  );
};

export default ItemTable;