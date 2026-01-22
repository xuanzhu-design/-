
import React, { useState } from 'react';
import { Monitor, Code2, Database, Link2, Download, Cloud, Plus, Share2, Rocket, ArrowLeft, ArrowRight, RotateCw, Edit, Palette, Layout, Calendar, Search, Bell } from 'lucide-react';
import { FeedbackCard } from './FeedbackCard';
import { Feedback } from '../types';

const MOCK_FEEDBACKS: Feedback[] = [
  {
    id: 1,
    title: "手机实在太好用了，忍不住点赞",
    content: "天呐我必须给你们点赞！这台手机的拍照效果简直绝了！昨晚和朋友去夜市，随手拍的照片不仅夜景噪点少，色彩还原度超真实...",
    tags: [
      { text: "手机终端", colorClass: "bg-cyan-50 text-cyan-700 border border-cyan-100" },
      { text: "A 类客户", colorClass: "bg-purple-50 text-purple-700 border border-purple-100" },
      { text: "非常重要", colorClass: "bg-red-50 text-red-700 border border-red-100" }
    ],
    user: "张敏",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang",
    date: "2024/07/17",
    likes: 20,
    comments: 16,
    shares: 66
  },
  {
    id: 2,
    title: "电脑笔记本的正向反馈",
    content: "用了两周来反馈下，这台笔记本的散热确实比我之前的旧电脑好很多，连续开一天会议软件也没发烫...不过键盘手感稍微偏软。",
    tags: [
      { text: "电脑", colorClass: "bg-orange-50 text-orange-700 border border-orange-100" },
      { text: "B 类客户", colorClass: "bg-yellow-50 text-yellow-700 border border-yellow-100" },
      { text: "重要", colorClass: "bg-blue-50 text-blue-700 border border-blue-100" }
    ],
    user: "李媛",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Li",
    date: "2024/07/17",
    likes: 12,
    comments: 8,
    shares: 24
  },
  {
    id: 3,
    title: "耳机降噪一般",
    content: "说实话有点失望，这耳机降噪效果和宣传的差距有点大。在地铁上根本压不住报站声，只能把音量调很高，时间长了耳朵疼。",
    tags: [
      { text: "手机终端", colorClass: "bg-cyan-50 text-cyan-700 border border-cyan-100" },
      { text: "A 类客户", colorClass: "bg-purple-50 text-purple-700 border border-purple-100" },
      { text: "非常重要", colorClass: "bg-red-50 text-red-700 border border-red-100" }
    ],
    user: "王凯",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wang",
    date: "2024/07/17",
    likes: 5,
    comments: 21,
    shares: 12
  }
];

export const PreviewArea: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部反馈');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F8F9FA]">
      {/* Tab Header */}
      <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-200 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-semibold shadow-md">
             <Monitor size={16} /> 预览
          </button>
          {[Code2, Database, Link2, Download, Cloud].map((Icon, i) => (
             <button key={i} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
               <Icon size={18} />
             </button>
          ))}
          <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg"><Plus size={18} /></button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-all border border-gray-200 active:scale-95">
            <Share2 size={16} strokeWidth={2.5} /> 分享
          </button>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-100 active:scale-95">
            <Rocket size={16} strokeWidth={2.5} /> 发布
          </button>
        </div>
      </header>

      {/* Browser Navigation Bar */}
      <div className="h-12 flex items-center px-6 gap-6 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-5 text-gray-300">
           <ArrowLeft size={16} className="cursor-pointer hover:text-gray-600 transition-colors" />
           <ArrowRight size={16} className="cursor-pointer hover:text-gray-600 transition-colors" />
           <RotateCw size={16} className="cursor-pointer hover:text-gray-600 transition-colors" />
        </div>
        <div className="flex-1 max-w-2xl bg-gray-100/80 rounded-lg py-1.5 px-4 flex items-center justify-between text-xs text-gray-500 font-medium">
           <div className="flex items-center gap-2.5">
              <Layout size={12} className="text-gray-400" />
              <span className="opacity-80">工作台</span>
              <span className="text-gray-300">/</span>
              <span>homepage</span>
           </div>
           <ChevronDown size={14} className="text-gray-400" />
        </div>
        <div className="flex items-center gap-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
           <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"><Edit size={14} /> 编辑</button>
           <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"><Palette size={14} /> 主题</button>
           <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"><Layout size={14} /> 布局</button>
        </div>
      </div>

      {/* Actual Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#F8F9FA] p-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Internal Header */}
          <div className="flex items-end justify-between border-b-2 border-gray-100 pb-8">
            <div className="space-y-1">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">工作台</h1>
              <p className="text-sm text-gray-400 font-medium">欢迎回来，这是今日客户声音概览。</p>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
               <Calendar size={18} className="text-blue-500" />
               <span className="text-sm font-bold text-gray-700">2025.05.04</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: '客户反馈总数', value: '3,204', range: '05.06 - 05.08', color: 'blue' },
              { label: '待跟进', value: '864', range: '05.06 - 05.08', color: 'orange' },
              { label: '已解决', value: '2,340', range: '05.06 - 05.08', color: 'green' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <div className={`w-2 h-2 rounded-full ${stat.color === 'blue' ? 'bg-blue-400' : stat.color === 'orange' ? 'bg-orange-400' : 'bg-green-400'} shadow-lg opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                </div>
                <p className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-gray-300 font-bold">{stat.range}</p>
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">+12.4%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback Feed Section */}
          <div className="space-y-8 bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-10">
                {['全部反馈', '我跟进的', '页签', '页签'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-4 text-sm font-bold transition-all ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full animate-in fade-in zoom-in duration-300"></div>}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded-lg text-gray-400 cursor-pointer hover:bg-gray-200 transition-colors">
                  <Search size={16} />
                </div>
                <div className="bg-gray-100 p-2 rounded-lg text-gray-400 cursor-pointer hover:bg-gray-200 transition-colors">
                  <Bell size={16} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {MOCK_FEEDBACKS.map(feedback => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
            
            <button className="w-full py-4 text-xs font-bold text-gray-400 hover:text-blue-600 border border-dashed border-gray-200 rounded-2xl transition-all hover:bg-blue-50/50 uppercase tracking-widest">
              查看更多历史反馈
            </button>
          </div>
        </div>
        
        {/* Footer padding */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

const ChevronDown = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);
const MoreHorizontal = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);
