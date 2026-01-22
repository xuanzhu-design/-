
import React from 'react';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { Feedback } from '../types';

interface FeedbackCardProps {
  feedback: Feedback;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <div className="bg-white p-7 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group cursor-pointer">
      <div className="flex flex-col gap-4">
        {/* Title and Tags */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
              {feedback.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {feedback.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className={`px-3.5 py-1 rounded-full text-[11px] font-bold tracking-tight shadow-sm ${tag.colorClass}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </div>
          <div className="p-2 bg-gray-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
            <Share2 size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-500 leading-relaxed font-medium line-clamp-3">
          {feedback.content}
        </p>

        {/* Footer Area */}
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-50">
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all active:scale-90">
              <div className="bg-gray-50 p-1.5 rounded-lg group-hover:bg-blue-50 transition-colors">
                <ThumbsUp size={14} className="group-hover:text-blue-600" />
              </div>
              <span className="text-xs font-bold">{feedback.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-500 transition-all active:scale-90">
              <div className="bg-gray-50 p-1.5 rounded-lg group-hover:bg-indigo-50 transition-colors">
                <MessageSquare size={14} className="group-hover:text-indigo-600" />
              </div>
              <span className="text-xs font-bold">{feedback.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-all active:scale-90">
              <div className="bg-gray-50 p-1.5 rounded-lg group-hover:bg-pink-50 transition-colors">
                <Share2 size={14} className="group-hover:text-pink-600" />
              </div>
              <span className="text-xs font-bold">{feedback.shares}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 bg-gray-50/50 pl-1 pr-4 py-1 rounded-full border border-gray-100 group-hover:bg-white transition-colors">
            <div className="relative">
              <img 
                src={feedback.avatar} 
                alt={feedback.user} 
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-gray-800">{feedback.user}</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{feedback.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
