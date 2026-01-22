
import React, { useState } from 'react';
import { Layout, History, ListChecks, Settings, Send, Mic, MoreHorizontal, Smile, ChevronDown, ChevronRight, CheckCircle, Plus, FileCode, Play, Terminal, CheckCircle2, CircleDashed, Target, GitBranch, X } from 'lucide-react';
import { Task, UIMode } from '../types';

interface ChatAreaProps {
  uiMode: UIMode;
  activeTaskId: string;
  taskName: string;
  tasks: Task[];
  onSelectTask: (id: string) => void;
  onAddTask: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ 
  uiMode,
  activeTaskId, 
  taskName, 
  tasks, 
  onSelectTask, 
  onAddTask 
}) => {
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(true);

  const activeIndex = tasks.findIndex(t => t.id === activeTaskId);

  // Common Task List Component for Reusability
  const TaskListContent = ({ variant = 'full' }: { variant?: 'full' | 'compact' }) => (
    <div className={`flex flex-col h-full bg-white ${variant === 'compact' ? 'w-64 border-r border-gray-100' : ''}`}>
      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
        <div className="flex items-center justify-between px-2">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Task Navigator</h3>
            {variant === 'full' && <h2 className="text-2xl font-black text-gray-900">任务列表</h2>}
          </div>
          {uiMode === 'overlay' && (
            <button onClick={() => setIsTaskPanelOpen(false)} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">
              <X size={20} />
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          <h4 className="px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">核心任务</h4>
          <div 
            onClick={() => { onSelectTask('main'); uiMode === 'overlay' && setIsTaskPanelOpen(false); }}
            className={`relative p-5 rounded-[28px] border transition-all cursor-pointer group overflow-hidden ${
              activeTaskId === 'main' 
              ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-100' 
              : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 shadow-sm'
            }`}
          >
            <Target size={variant === 'full' ? 100 : 64} className={`absolute -right-6 -bottom-6 opacity-[0.05] pointer-events-none ${activeTaskId === 'main' ? 'text-white' : 'text-blue-500'}`} />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className={`text-sm font-black tracking-tight ${activeTaskId === 'main' ? 'text-white' : 'text-gray-800'}`}>主线任务</span>
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                activeTaskId === 'main' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-500'
              }`}>
                <CircleDashed size={10} className="animate-spin" />
                进行中
              </div>
            </div>
            <div className={`flex items-center justify-between text-[10px] font-bold relative z-10 ${
              activeTaskId === 'main' ? 'text-blue-100' : 'text-gray-400'
            }`}>
              <span className="flex items-center gap-1.5">
                <Target size={12} />
                核心逻辑构建
              </span>
              <span>01:24</span>
            </div>
          </div>
        </div>

        <div className="relative space-y-6">
          <div className="flex items-center justify-between px-2">
            <button 
              onClick={() => setIsBranchOpen(!isBranchOpen)}
              className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] hover:text-gray-600 transition-colors"
            >
              <GitBranch size={14} className="text-gray-300" />
              支线列表
              {isBranchOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onAddTask(); }}
              className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all active:scale-90"
              title="新建任务"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>

          {isBranchOpen && (
            <div className="relative ml-4">
              <div className="absolute left-0 top-0 bottom-8 w-[2px] bg-gray-100"></div>
              {activeIndex !== -1 && (
                <div 
                  className="absolute left-0 top-0 w-[2px] bg-blue-500 transition-all duration-500 z-10"
                  style={{ height: `calc(${(activeIndex * 100) / tasks.length}% + 28px)` }}
                ></div>
              )}
              <div className="space-y-1">
                {tasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    onClick={() => { onSelectTask(task.id); uiMode === 'overlay' && setIsTaskPanelOpen(false); }}
                    className={`relative pl-8 py-4 flex items-start group cursor-pointer transition-all rounded-[20px] ${
                      activeTaskId === task.id ? 'bg-blue-50/50 shadow-sm' : 'hover:bg-gray-50/50'
                    }`}
                  >
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[40px] border-l-2 border-b-2 rounded-bl-2xl transition-all duration-300 ${
                      activeTaskId === task.id ? 'border-blue-500 z-20' : index < activeIndex ? 'border-blue-500/30' : 'border-gray-100 group-hover:border-gray-200'
                    }`}></div>
                    <div className="flex-1 min-w-0 relative z-10 pr-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[13px] font-bold truncate transition-colors ${
                          activeTaskId === task.id ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-900'
                        }`}>
                          {task.name}
                        </span>
                        {task.status === 'completed' ? <CheckCircle2 size={14} className="text-green-500" /> : <CircleDashed size={14} className={`${task.status === 'ongoing' ? 'text-blue-500 animate-spin' : 'text-gray-300'}`} />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black uppercase text-gray-300 tracking-widest">{task.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-5 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
        <div className="flex items-center gap-3 text-[9px] text-gray-300 font-black uppercase tracking-widest">
          <div className="w-5 h-5 rounded-lg bg-white flex items-center justify-center border border-gray-100 shadow-sm">#</div>
          <span>V1.0.4</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-white relative overflow-hidden transition-all duration-500">
      
      {/* GLOBAL SIDEBAR MODE: Task Panel on far left */}
      {uiMode === 'global' && <TaskListContent variant="compact" />}

      {/* Main Container for Internal & Overlay Modes */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Unified Header */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-gray-100 shrink-0 bg-white/80 backdrop-blur-sm z-40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-100 transition-transform hover:scale-105 cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div className="flex flex-col overflow-hidden max-w-[200px]">
              <span className="text-sm font-bold text-gray-900 leading-none truncate">VOC 客户声音管理系统</span>
              <span className="text-[10px] text-blue-500 font-bold mt-0.5 tracking-tight uppercase truncate">{taskName}</span>
            </div>
            <Settings size={13} className="text-gray-300 cursor-pointer hover:text-gray-600 transition-colors ml-1" />
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsTaskPanelOpen(!isTaskPanelOpen)} 
              className={`p-2 rounded-lg transition-all active:scale-95 ${isTaskPanelOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`} 
            >
              <ListChecks size={20} strokeWidth={2.5} />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-lg"><History size={18} /></button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-lg"><Layout size={18} /></button>
          </div>
        </header>

        {/* Dynamic Body Area */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* OVERLAY MODE: Full screen overlay */}
          {uiMode === 'overlay' && (
            <div className={`absolute inset-0 bg-white z-30 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isTaskPanelOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
              <div className="max-w-2xl mx-auto w-full h-full"><TaskListContent /></div>
            </div>
          )}

          {/* INTERNAL SIDEBAR MODE: Side-by-side inside the body container */}
          {uiMode === 'internal' && (
            <div className={`h-full border-r border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isTaskPanelOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
              <TaskListContent variant="compact" />
            </div>
          )}

          {/* Chat Dialogue Area (Shared across all modes) */}
          <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12 bg-white scroll-smooth pb-32">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-8 py-4 rounded-[28px] rounded-tr-none text-sm font-bold shadow-2xl shadow-blue-100 max-w-[85%]">生成一个用户声音管理系统，要有看板、反馈列表和统计。</div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-[20px] bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shadow-sm shrink-0"><Layout size={22} /></div>
                  <div className="flex-1 space-y-5 pt-1">
                    <p className="text-gray-800 text-[15px] leading-relaxed font-bold">收到。我将开始构建 VOC 系统的核心界面...</p>
                    <ul className="grid grid-cols-2 gap-4">
                      {['看板统计区', '反馈流列表', '标签管理系统', '响应式布局'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs text-gray-600 bg-gray-50/60 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-white transition-all shadow-sm group">
                          <CheckCircle size={16} className="text-green-500 group-hover:scale-110 transition-transform" />
                          <span className="font-bold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-[#F9FAFB] rounded-[40px] p-8 border border-gray-100 space-y-6 mx-16 shadow-inner relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5 text-[10px] font-black text-gray-400 uppercase tracking-widest"><ChevronDown size={14} className="text-gray-300" />执行流细节</div>
                    <span className="text-[9px] bg-blue-500 text-white px-3 py-1.5 rounded-full font-black tracking-[0.2em] shadow-lg shadow-blue-200">EXECUTING</span>
                  </div>
                  <div className="space-y-3 font-mono text-[12px]">
                    <div className="flex items-center justify-between text-gray-500 bg-white p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all shadow-sm">
                      <div className="flex items-center gap-3"><FileCode size={16} className="text-blue-400" /><span>更新全局变量 <span className="text-gray-900 font-bold">@theme_config</span></span></div>
                      <span className="text-gray-300">L1-20</span>
                    </div>
                    <div className="flex items-center justify-between text-blue-700 bg-blue-50/80 p-4 rounded-2xl border border-blue-100 shadow-sm ring-1 ring-blue-100/50">
                      <div className="flex items-center gap-3"><Play size={16} className="text-blue-500 fill-blue-500" /><span className="font-bold">渲染组件 <span className="text-blue-900 underline decoration-blue-300 underline-offset-4 decoration-2">StatsGrid.tsx</span></span></div>
                      <span className="text-blue-400 font-black">+256ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Box */}
            <div className="p-8 shrink-0 bg-white border-t border-gray-50 z-10">
              <div className="relative bg-[#F3F4F6] border border-gray-200 rounded-[40px] p-6 shadow-sm focus-within:shadow-2xl focus-within:bg-white focus-within:border-blue-400 transition-all duration-500 group/input">
                <textarea placeholder={`继续在 ${taskName} 中输入需求...`} className="w-full bg-transparent border-none focus:ring-0 text-[15px] p-1 resize-none h-28 placeholder:text-gray-400 font-bold leading-relaxed scroll-hidden"></textarea>
                <div className="flex items-center justify-between mt-3 px-1">
                  <div className="flex items-center gap-7 text-gray-400">
                    <button className="hover:text-blue-500 hover:scale-125 transition-all"><Plus size={22} strokeWidth={2.5} /></button>
                    <button className="hover:text-yellow-500 hover:scale-125 transition-all"><Smile size={22} strokeWidth={2.5} /></button>
                    <button className="hover:text-red-500 hover:scale-125 transition-all"><Mic size={22} strokeWidth={2.5} /></button>
                    <div className="w-[2px] h-5 bg-gray-200 mx-1"></div>
                    <button className="hover:text-gray-900 hover:scale-125 transition-all"><MoreHorizontal size={22} strokeWidth={2.5} /></button>
                  </div>
                  <button className="bg-blue-600 text-white p-5 rounded-[24px] hover:bg-blue-700 active:scale-90 transition-all shadow-2xl shadow-blue-200 flex items-center gap-4 group">
                    <span className="text-[13px] font-black uppercase tracking-widest ml-1 hidden group-hover:block animate-in fade-in slide-in-from-right-4">Commit</span>
                    <Send size={22} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
