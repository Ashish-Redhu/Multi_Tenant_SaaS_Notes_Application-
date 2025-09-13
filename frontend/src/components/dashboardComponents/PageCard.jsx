import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function PageCard({ heading, description, onEdit, onDelete, onMoreDetails }) {
  // Truncate description to fit approximately 3 lines (around 60-70 words)
  const truncatedDescription = description.split(' ').length > 65
    ? description.split(' ').slice(0, 65).join(' ') + '...'
    : description;

  return (
    // Responsive grid classes: 1 card on mobile, 2 on tablet, 3 on laptop+
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] p-6 relative min-h-[280px] flex flex-col border border-gray-700/50 backdrop-blur-sm">
        
        {/* Subtle top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-t-xl"></div>
        
        {/* Top right action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <button 
            onClick={onEdit} 
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
            aria-label="Edit"
          >
            <Edit size={16} className="text-gray-300 group-hover:text-blue-400" />
          </button>
          <button 
            onClick={onDelete} 
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
            aria-label="Delete"
          >
            <Trash2 size={16} className="text-gray-300 group-hover:text-red-400" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex flex-col h-full pr-16">
          {/* Heading */}
          <h3 className="text-xl font-bold text-white mb-4 leading-tight line-clamp-2 min-h-[3.5rem]">
            {heading}
          </h3>

          {/* Description - fixed height for 3 lines */}
          <div className="flex-grow mb-6">
            <p className="text-sm text-gray-300 leading-relaxed h-16 overflow-hidden">
              {truncatedDescription}
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={onMoreDetails}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] mt-auto"
          >
            Get more details
          </button>
        </div>
      </div>
    </div>
  );
}