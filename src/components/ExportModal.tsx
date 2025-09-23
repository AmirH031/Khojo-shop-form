import React, { useState } from 'react';
import { Download, X, FileText, Database } from 'lucide-react';
import { Item, ShopType, ProductItem, MenuItem, ServiceItem } from '../types/Item';

interface ExportModalProps {
  items: Item[];
  shopType: ShopType;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ items, shopType, onClose }) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  const generateCSV = (items: Item[]): string => {
    let headers: string[] = [];
    
    if (shopType === 'product') {
      headers = [
        'ID', 'Name', 'Hindi Name', 'Category', 'Brand Name', 'Price Range', 
        'Varieties', 'Packs', 'Available'
      ];
    } else if (shopType === 'menu') {
      headers = [
        'ID', 'Name', 'Hindi Name', 'Category', 'Description', 'Price', 
        'Unit', 'Varieties', 'Image URL', 'Available'
      ];
    } else {
      headers = [
        'ID', 'Name', 'Description', 'Price', 'Highlights', 'Tags', 'Available'
      ];
    }

    const csvContent = [
      headers.join(','),
      ...items.map(item => {
        if (shopType === 'product') {
          const productItem = item as ProductItem;
          return [
            productItem.id,
            `"${productItem.name}"`,
            `"${productItem.hindi_name || ''}"`,
            `"${productItem.category}"`,
            `"${productItem.brand_name}"`,
            `"${productItem.price}"`,
            `"${productItem.variety?.join('; ') || ''}"`,
            productItem.packs || 0,
            productItem.availability ? 'Yes' : 'No',
          ].join(',');
        } else if (shopType === 'menu') {
          const menuItem = item as MenuItem;
          return [
            menuItem.id,
            `"${menuItem.name}"`,
            `"${menuItem.hindi_name || ''}"`,
            `"${menuItem.category}"`,
            `"${menuItem.description || ''}"`,
            `"${menuItem.price || ''}"`,
            `"${menuItem.unit || ''}"`,
            `"${menuItem.variety?.join('; ') || ''}"`,
            `"${menuItem.imageUrl || ''}"`,
            menuItem.isAvailable ? 'Yes' : 'No',
          ].join(',');
        } else {
          const serviceItem = item as ServiceItem;
          return [
            serviceItem.id,
            `"${serviceItem.name || ''}"`,
            `"${serviceItem.description}"`,
            `"${serviceItem.price || ''}"`,
            `"${serviceItem.highlights?.join('; ') || ''}"`,
            `"${serviceItem.tags?.join('; ') || ''}"`,
            serviceItem.availability ? 'Yes' : 'No',
          ].join(',');
        }
      })
    ].join('\n');

    return csvContent;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${shopType}-items-${timestamp}`;

    if (exportFormat === 'csv') {
      const csvContent = generateCSV(items);
      downloadFile(csvContent, `${filename}.csv`, 'text/csv');
    } else {
      const jsonContent = JSON.stringify(items, null, 2);
      downloadFile(jsonContent, `${filename}.json`, 'application/json');
    }

    onClose();
  };

  const formatFileSize = (items: Item[]): string => {
    const content = exportFormat === 'csv' ? generateCSV(items) : JSON.stringify(items, null, 2);
    const sizeInBytes = new Blob([content]).size;
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Export {shopType === 'product' ? 'Products' : shopType === 'menu' ? 'Menu Items' : 'Services'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Export {items.length} {shopType} items to your preferred format.
            </p>

            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value as 'csv')}
                  className={`h-4 w-4 text-${color}-600 focus:ring-${color}-500 border-gray-300`}
                />
                <div className="ml-3 flex items-center">
                  <FileText className={`h-5 w-5 text-${color}-600 mr-2`} />
                  <div>
                    <div className="font-medium text-gray-900">CSV Format</div>
                    <div className="text-sm text-gray-600">
                      Spreadsheet compatible • {formatFileSize(items)}
                    </div>
                  </div>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={(e) => setExportFormat(e.target.value as 'json')}
                  className={`h-4 w-4 text-${color}-600 focus:ring-${color}-500 border-gray-300`}
                />
                <div className="ml-3 flex items-center">
                  <Database className={`h-5 w-5 text-${color}-600 mr-2`} />
                  <div>
                    <div className="font-medium text-gray-900">JSON Format</div>
                    <div className="text-sm text-gray-600">
                      Structured data format • {formatFileSize(items)}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Export Preview</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• {items.length} total {shopType} items</div>
              <div>• All item fields included</div>
              <div>• {exportFormat.toUpperCase()} format</div>
              <div>• Ready for {exportFormat === 'csv' ? 'Excel/Google Sheets' : 'database import'}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className={`flex items-center px-4 py-2 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition-colors`}
          >
            <Download className="h-4 w-4 mr-2" />
            Export {exportFormat.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;