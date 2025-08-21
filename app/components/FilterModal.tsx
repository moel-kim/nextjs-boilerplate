'use client';

import { useState, useEffect } from 'react';

interface FilterModalProps {
  modalId: string;
  currentFilters: {
    sort: string;
    age: string;
    categories: string[];
  };
  onFilterChange: (filters: any) => void;
  onClose: () => void;
}

export default function FilterModal({ modalId, currentFilters, onFilterChange, onClose }: FilterModalProps) {
  const [tempFilters, setTempFilters] = useState(currentFilters);

  useEffect(() => {
    setTempFilters(currentFilters);
  }, [currentFilters]);

  const handleApply = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      sort: 'recommend',
      age: 'all',
      categories: []
    };
    setTempFilters(resetFilters);
  };

  const renderModalContent = () => {
    switch (modalId) {
      case 'modal-region':
        return (
          <>
            <h3 className="font-bold text-lg mb-4">모임 지역</h3>
            <p className="text-center text-gray-400 py-8">지역 필터 UI (구현 예정)</p>
            <div className="flex space-x-2">
              <button 
                onClick={handleReset}
                className="modal-reset-btn flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600"
              >
                초기화
              </button>
              <button 
                onClick={handleApply}
                className="modal-apply-btn w-2/3 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
              >
                적용하기
              </button>
            </div>
          </>
        );

      case 'modal-age':
        const ages = [
          { value: 'all', text: '전체' },
          { value: '20', text: '20대' },
          { value: '30', text: '30대' },
          { value: '40', text: '40대' },
          { value: '50', text: '50대 이상' }
        ];

        return (
          <>
            <h3 className="font-bold text-lg mb-4">모집 연령대</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {ages.map((age) => (
                <button
                  key={age.value}
                  onClick={() => setTempFilters(prev => ({ ...prev, age: age.value }))}
                  className={`age-option px-4 py-2 rounded-full text-sm transition-colors ${
                    tempFilters.age === age.value
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {age.text}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleReset}
                className="modal-reset-btn flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600"
              >
                초기화
              </button>
              <button 
                onClick={handleApply}
                className="modal-apply-btn w-2/3 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
              >
                적용하기
              </button>
            </div>
          </>
        );

      case 'modal-category':
        const categories = [
          { value: 'sports', text: '운동' },
          { value: 'social', text: '동네친구' },
          { value: 'study', text: '자기계발' },
          { value: 'hobby', text: '취미' }
        ];

        return (
          <>
            <h3 className="font-bold text-lg mb-4">카테고리</h3>
            <div className="space-y-3 mb-6">
              {categories.map((cat) => (
                <label key={cat.value} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={cat.value}
                    checked={tempFilters.categories.includes(cat.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTempFilters(prev => ({
                          ...prev,
                          categories: [...prev.categories, cat.value]
                        }));
                      } else {
                        setTempFilters(prev => ({
                          ...prev,
                          categories: prev.categories.filter(c => c !== cat.value)
                        }));
                      }
                    }}
                    className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-3">{cat.text}</span>
                </label>
              ))}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleReset}
                className="modal-reset-btn flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600"
              >
                초기화
              </button>
              <button 
                onClick={handleApply}
                className="modal-apply-btn w-2/3 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
              >
                적용하기
              </button>
            </div>
          </>
        );

      case 'modal-sort':
        const sorts = [
          { value: 'recommend', text: '추천순' },
          { value: 'popular', text: '인기순' },
          { value: 'new', text: '최신순' }
        ];

        return (
          <>
            <h3 className="font-bold text-lg mb-4">정렬</h3>
            <div className="space-y-1 mb-6">
              {sorts.map((sort) => (
                <button
                  key={sort.value}
                  onClick={() => {
                    setTempFilters(prev => ({ ...prev, sort: sort.value }));
                    onFilterChange({ ...tempFilters, sort: sort.value });
                    onClose();
                  }}
                  className={`sort-option text-left w-full p-3 rounded-lg transition-colors ${
                    tempFilters.sort === sort.value
                      ? 'text-orange-500 font-bold'
                      : 'text-gray-300 hover:text-gray-200'
                  }`}
                >
                  {sort.text}
                </button>
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-30 opacity-100 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="filter-modal fixed bottom-0 left-0 right-0 bg-gray-800 rounded-t-2xl p-4 z-40 w-full max-w-md mx-auto open">
        {renderModalContent()}
      </div>
    </>
  );
}
