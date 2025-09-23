import React, { useState } from 'react';
import { Plus, Trash2, Clock, Calendar } from 'lucide-react';
import { Item, ShopType, ProductItem, MenuItem, ServiceItem, ServiceDetails } from '../types/Item';
import { getHindiName } from '../utils/itemHelpers';

interface ItemFormProps {
  onAddItem: (item: Omit<Item, 'id'>) => void;
  shopType: ShopType;
}

const productCategories = [
  'Groceries', 'Electronics', 'Clothing', 'Home & Garden', 'Health & Beauty', 'Sports', 'Books', 'Toys'
];

const menuCategories = [
  'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Snacks', 'Breakfast', 'Chinese', 'Indian', 'Continental'
];

const serviceCategories = [
  'Repair Services', 'Beauty & Wellness', 'Home Services', 'Professional Services', 'Health Services', 'Educational Services'
];

const units = ['piece', 'plate', 'bowl', 'glass', 'cup', 'serving', 'portion'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00'];

const ItemForm: React.FC<ItemFormProps> = ({ onAddItem, shopType }) => {
  const [formData, setFormData] = useState<any>({
    shopType,
    // Common fields
    name: '',
    hindi_name: '',
    category: '',
    price: '',
    availability: true,
    
    // Product specific
    brand_name: '',
    variety: [''],
    packs: 1,
    
    // Menu specific
    isAvailable: true,
    description: '',
    unit: '',
    imageUrl: '',
    
    // Service specific
    highlights: [''],
    tags: [''],
    serviceDetails: {
      duration: '',
      priceRange: '',
      serviceCategory: '',
      serviceName: '',
      description: [''],
      features: [''],
      availability: {
        days: [],
        timeSlots: []
      }
    }
  });

  // Removed showAdvanced toggle; all fields are always visible

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let item: Omit<Item, 'id'>;
    
    if (shopType === 'product') {
      if (!formData.name.trim() || !formData.category || !formData.price || !formData.brand_name) {
        alert('Please fill all required fields for Product Shop');
        return;
      }
      item = {
        shopType: 'product',
        name: formData.name,
        category: formData.category,
        price: formData.price,
        brand_name: formData.brand_name,
        hindi_name: formData.hindi_name,
        variety: formData.variety.filter((v: string) => v.trim()),
        packs: formData.packs,
        availability: formData.availability,
      } as ProductItem;
    } else if (shopType === 'menu') {
      if (!formData.name.trim() || !formData.category) {
        alert('Please fill all required fields for Menu Shop');
        return;
      }
      item = {
        shopType: 'menu',
        name: formData.name,
        category: formData.category,
        isAvailable: formData.isAvailable,
        hindi_name: formData.hindi_name,
        description: formData.description,
        price: formData.price,
        unit: formData.unit,
        variety: formData.variety.filter((v: string) => v.trim()),
        imageUrl: formData.imageUrl,
      } as MenuItem;
    } else {
      if (!formData.description.trim()) {
        alert('Please fill the description field for Service Shop');
        return;
      }
      item = {
        shopType: 'service',
        description: formData.description,
        name: formData.name,
        highlights: formData.highlights.filter((h: string) => h.trim()),
        tags: formData.tags.filter((t: string) => t.trim()),
        price: formData.price,
        availability: formData.availability,
        serviceDetails: {
          ...formData.serviceDetails,
          description: formData.serviceDetails.description.filter((d: string) => d.trim()),
          features: formData.serviceDetails.features.filter((f: string) => f.trim()),
        }
      } as ServiceItem;
    }

    onAddItem(item);
    
    // Reset form
    setFormData({
      shopType,
      name: '',
      hindi_name: '',
      category: '',
      price: '',
      availability: true,
      brand_name: '',
      variety: [''],
      packs: 1,
      isAvailable: true,
      description: '',
      unit: '',
      imageUrl: '',
      highlights: [''],
      tags: [''],
      serviceDetails: {
        duration: '',
        priceRange: '',
        serviceCategory: '',
        serviceName: '',
        description: [''],
        features: [''],
        availability: {
          days: [],
          timeSlots: []
        }
      }
    });
    setShowAdvanced(false);
  };

  const handleNameChange = (name: string) => {
    setFormData((prev: any) => ({
      ...prev,
      name,
      hindi_name: getHindiName(name),
    }));
  };

  const addArrayField = (field: string, subField?: string) => {
    setFormData((prev: any) => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: [...prev[field][subField], '']
          }
        };
      }
      return {
        ...prev,
        [field]: [...prev[field], '']
      };
    });
  };

  const removeArrayField = (field: string, index: number, subField?: string) => {
    setFormData((prev: any) => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: prev[field][subField].filter((_: any, i: number) => i !== index)
          }
        };
      }
      return {
        ...prev,
        [field]: prev[field].filter((_: any, i: number) => i !== index)
      };
    });
  };

  const updateArrayField = (field: string, index: number, value: string, subField?: string) => {
    setFormData((prev: any) => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: prev[field][subField].map((item: string, i: number) => i === index ? value : item)
          }
        };
      }
      return {
        ...prev,
        [field]: prev[field].map((item: string, i: number) => i === index ? value : item)
      };
    });
  };

  const getCategories = () => {
    switch (shopType) {
      case 'product': return productCategories;
      case 'menu': return menuCategories;
      case 'service': return serviceCategories;
      default: return [];
    }
  };

  const renderProductFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter item name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hindi Name
          </label>
          <input
            type="text"
            value={formData.hindi_name}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, hindi_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Hindi name (auto-filled)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Select category</option>
            {getCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name *
          </label>
          <input
            type="text"
            value={formData.brand_name}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, brand_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Brand name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range (₹) *
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, price: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="10-100"
            required
          />
        </div>
      </div>

  {/* Advanced fields always visible */}
        <div className="space-y-4 border-t pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Varieties
            </label>
            {formData.variety.map((variety: string, index: number) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => updateArrayField('variety', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter variety"
                />
                {formData.variety.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('variety', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('variety')}
              className="flex items-center text-sm text-green-600 hover:text-green-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Variety
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Packs
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.packs === 0 ? '' : formData.packs}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev: any) => ({
                    ...prev,
                    packs: val === '' ? '' : Math.max(1, Math.min(50, parseInt(val)))
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="5"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="availability"
                checked={formData.availability}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, availability: e.target.checked }))}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="availability" className="ml-2 text-sm text-gray-700">
                Available
              </label>
            </div>
          </div>
        </div>
    </>
  );

  const renderMenuFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dish Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter dish name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hindi Name
          </label>
          <input
            type="text"
            value={formData.hindi_name}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, hindi_name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Hindi name (auto-filled)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          >
            <option value="">Select category</option>
            {getCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAvailable"
            checked={formData.isAvailable}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, isAvailable: e.target.checked }))}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="isAvailable" className="ml-2 text-sm text-gray-700">
            Available *
          </label>
        </div>
      </div>

  {/* Advanced fields always visible */}
        <div className="space-y-4 border-t pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Dish description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, price: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, unit: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select unit</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Varieties
            </label>
            {formData.variety.map((variety: string, index: number) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => updateArrayField('variety', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter variety (e.g., Spicy, Mild)"
                />
                {formData.variety.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('variety', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('variety')}
              className="flex items-center text-sm text-orange-600 hover:text-orange-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Variety
            </button>
          </div>
        </div>
    </>
  );

  const renderServiceFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your service"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Service name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, price: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="500 or 500-1000"
          />
        </div>
      </div>

  {/* Advanced fields always visible */}
        <div className="space-y-4 border-t pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlights
            </label>
            {formData.highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => updateArrayField('highlights', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Service highlight"
                />
                {formData.highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('highlights', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('highlights')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Highlight
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            {formData.tags.map((tag: string, index: number) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateArrayField('tags', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Service tag"
                />
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('tags', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('tags')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Tag
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="serviceAvailability"
              checked={formData.availability}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, availability: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="serviceAvailability" className="ml-2 text-sm text-gray-700">
              Available
            </label>
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Service Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.serviceDetails.duration}
                  onChange={(e) => setFormData((prev: any) => ({
                    ...prev,
                    serviceDetails: { ...prev.serviceDetails, duration: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2 hours"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Category
                </label>
                <select
                  value={formData.serviceDetails.serviceCategory}
                  onChange={(e) => setFormData((prev: any) => ({
                    ...prev,
                    serviceDetails: { ...prev.serviceDetails, serviceCategory: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {serviceCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Days
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {days.map(day => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.serviceDetails.availability.days.includes(day)}
                      onChange={(e) => {
                        const newDays = e.target.checked
                          ? [...formData.serviceDetails.availability.days, day]
                          : formData.serviceDetails.availability.days.filter((d: string) => d !== day);
                        setFormData((prev: any) => ({
                          ...prev,
                          serviceDetails: {
                            ...prev.serviceDetails,
                            availability: { ...prev.serviceDetails.availability, days: newDays }
                          }
                        }));
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slots
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {timeSlots.map(slot => (
                  <label key={slot} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.serviceDetails.availability.timeSlots.includes(slot)}
                      onChange={(e) => {
                        const newSlots = e.target.checked
                          ? [...formData.serviceDetails.availability.timeSlots, slot]
                          : formData.serviceDetails.availability.timeSlots.filter((s: string) => s !== slot);
                        setFormData((prev: any) => ({
                          ...prev,
                          serviceDetails: {
                            ...prev.serviceDetails,
                            availability: { ...prev.serviceDetails.availability, timeSlots: newSlots }
                          }
                        }));
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">{slot}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );

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
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {shopType === 'product' && 'Add New Product'}
        {shopType === 'menu' && 'Add New Menu Item'}
        {shopType === 'service' && 'Add New Service'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {shopType === 'product' && renderProductFields()}
        {shopType === 'menu' && renderMenuFields()}
        {shopType === 'service' && renderServiceFields()}

        {/* Advanced Fields Toggle removed; all fields are always visible */}

        <div className="flex justify-end">
          {shopType === 'product' && (
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </button>
          )}
          {shopType === 'menu' && (
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </button>
          )}
          {shopType === 'service' && (
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;