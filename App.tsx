
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatArea } from './components/ChatArea';
import { PreviewArea } from './components/PreviewArea';
import { Task, UIMode } from './types';
import { Layers, PanelLeftOpen, LayoutPanelLeft } from 'lucide-react';

const App: React.FC = () => {
  const [activeTaskId, setActiveTaskId] = useState<string>('main');
  const [chatWidth, setChatWidth] = useState(45); // Percentage
  const [isResizing, setIsResizing] = useState(false);
  const [uiMode, setUiMode] = useState<UIMode>('overlay');
  const containerRef = useRef<HTMLDivElement>(null);

  const [branchTasks, setBranchTasks] = useState<Task[]>([
    { id: '1', name: '后端增加结构', status: 'ongoing', time: '01:24' },
    { id: '2', name: '初始化应用优化', status: 'completed', time: '01:24' },
    { id: '3', name: '新增权限', status: 'completed', time: '01:24' },
    { id: '4', name: '数据模型 debug', status: 'completed', time: '01:24' },
  ]);

  const addNewTask = () => {
    const nextId = String(branchTasks.length + 1);
    const newTask: Task = {
      id: nextId,
      name: `新支线任务 ${nextId}`,
      status: 'pending',
      time: '00:00',
    };
    setBranchTasks([newTask, ...branchTasks]);
    setActiveTaskId(nextId);
  };

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      if (newWidth > 25 && newWidth < 75) {
        setChatWidth(newWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
      document.body.style.cursor = 'col-resize';
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
      document.body.style.cursor = 'default';
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const selectedTaskName = activeTaskId === 'main' 
    ? '主线任务' 
    : (branchTasks.find(t => t.id === activeTaskId)?.name || '未知任务');

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA] text-gray-900 select-none font-sans relative">
      {/* Global Tab Switcher */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/80 backdrop-blur-xl border border-gray-100 p-1.5 rounded-[24px] shadow-2xl shadow-blue-200/50 flex items-center gap-1 transition-all hover:scale-105 active:scale-95">
        {[
          { id: 'overlay', label: '覆盖', icon: Layers },
          { id: 'internal', label: '内部侧栏', icon: PanelLeftOpen },
          { id: 'global', label: '全局侧栏', icon: LayoutPanelLeft },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setUiMode(mode.id as UIMode)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[18px] text-[13px] font-black transition-all ${
              uiMode === mode.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <mode.icon size={16} strokeWidth={uiMode === mode.id ? 3 : 2.5} />
            {mode.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main ref={containerRef} className="flex flex-1 overflow-hidden transition-all duration-300">
        <div className="flex w-full relative">
          {/* Left: Chat Flow Area */}
          <div 
            style={{ width: `${chatWidth}%` }} 
            className="flex flex-col bg-white h-full overflow-hidden relative"
          >
            <ChatArea 
              uiMode={uiMode}
              activeTaskId={activeTaskId} 
              taskName={selectedTaskName}
              tasks={branchTasks}
              onSelectTask={setActiveTaskId}
              onAddTask={addNewTask}
            />
          </div>

          {/* Draggable Divider */}
          <div
            onMouseDown={startResizing}
            className={`w-1 z-30 cursor-col-resize group flex items-center justify-center transition-colors duration-200 ${
              isResizing ? 'bg-blue-500' : 'bg-gray-100 hover:bg-blue-400'
            }`}
          >
            <div className={`w-0.5 h-12 rounded-full transition-colors ${
              isResizing ? 'bg-white' : 'bg-gray-200 group-hover:bg-white'
            }`}></div>
          </div>

          {/* Right: Page Preview */}
          <div className="flex-1 bg-[#F8F9FA] relative overflow-hidden h-full">
            <PreviewArea />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
