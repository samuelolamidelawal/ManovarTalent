import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  MessageSquareCode,
  Globe,
  Building,
  LayoutGrid,
  Play,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../../types';

interface TopNavProps {
  user: User;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onToggleAssistant: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ user, activeRole, onRoleChange, onToggleAssistant }) => {
  const [workspace, setWorkspace] = useState('Manovar Enterprise');
  const navigate = useNavigate();

  const handleNewSimulation = () => {
    navigate('/planning');
  };

  const isLeadership = [UserRole.ORG_ADMIN, UserRole.EXECUTIVE, UserRole.MANAGER].includes(activeRole);

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30 shadow-sm">
      <div className="flex items-center space-x-6 flex-1">
        {/* Workspace/Tenant Selector */}
        <div className="flex items-center space-x-3 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group">
          <div className="w-5 h-5 bg-slate-900 text-white rounded-md flex items-center justify-center">
            <Building size={12} />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-400 uppercase leading-none mb-0.5">Workspace</span>
            <div className="flex items-center space-x-1">
              <span className="text-[11px] font-bold text-slate-800">{workspace}</span>
              <ChevronDown size={10} className="text-slate-400" />
            </div>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-slate-200"></div>

        <div className="relative w-64 max-w-full group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Quick search..."
            className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-lg pl-9 pr-4 py-1.5 text-[11px] outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {isLeadership && (
          <button 
            onClick={handleNewSimulation}
            className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <Play size={10} fill="currentColor" />
            <span>Simulate</span>
          </button>
        )}

        {/* Role Switcher */}
        <div className="relative flex items-center">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
             <LayoutGrid size={12} />
          </div>
          <select 
            value={activeRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="appearance-none bg-white border border-slate-200 rounded-lg pl-8 pr-7 py-1.5 text-[11px] font-bold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer outline-none shadow-sm"
          >
            <option value={UserRole.ORG_ADMIN}>Admin</option>
            <option value={UserRole.EXECUTIVE}>Exec</option>
            <option value={UserRole.MANAGER}>Manager</option>
            <option value={UserRole.HR}>HR</option>
            <option value={UserRole.EMPLOYEE}>Employee</option>
          </select>
          <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>

        <div className="flex items-center space-x-1">
          <button onClick={onToggleAssistant} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all relative">
            <MessageSquareCode size={18} />
          </button>
          <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

        <div className="flex items-center space-x-2 hover:bg-slate-50 px-1 py-1 rounded-lg cursor-pointer transition-colors group">
          <div className="text-right">
            <p className="text-[11px] font-black text-slate-800 leading-none">{user.name}</p>
            <p className="text-[8px] text-slate-400 font-black uppercase mt-0.5 tracking-tight">{user.department}</p>
          </div>
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg border border-slate-200 object-cover" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;