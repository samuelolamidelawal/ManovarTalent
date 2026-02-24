import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, ComposedChart, Line, AreaChart, Area, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  Activity,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Users,
  User,
  ChevronRight,
  Wallet,
  Monitor,
  Search,
  Settings,
  Globe,
  Flag,
  Clock,
  Fingerprint,
  CheckCircle2,
  Timer,
  Handshake,
  Check,
  History,
  RefreshCw,
  LayoutList,
  Building2,
  BarChart3,
  Gavel,
  ArrowLeft,
  UserCircle,
  MoreHorizontal,
  Mail,
  Scale,
  GitBranch,
  AlertTriangle,
  BrainCircuit,
  TrendingDown,
  Lock,
  BellRing,
  MousePointer2,
  Sparkles,
  ClipboardCheck,
  MessageSquare,
  Award,
  ShieldAlert,
  Info,
  Calendar,
  Star,
  Compass,
  ChevronLeft,
  X,
  FileText,
  Link as LinkIcon,
  Cpu,
  ArrowDownRight,
  Layers,
  Gauge
} from 'lucide-react';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---

const SECTOR_CALIBRATION_DATA = [
  { subject: 'Strategy', A: 120, B: 110, fullMark: 150 },
  { subject: 'Fiscal', A: 98, B: 130, fullMark: 150 },
  { subject: 'Talent', A: 86, B: 130, fullMark: 150 },
  { subject: 'Velocity', A: 99, B: 100, fullMark: 150 },
  { subject: 'Risk', A: 85, B: 90, fullMark: 150 },
];

const INSTITUTIONAL_PULSE_EVENTS = [
  { id: 1, type: 'STRATEGIC', label: 'Engineering Unit', event: 'Reached 92% OKR Attainment threshold for Q4.', time: '12m ago', color: 'text-primary' },
  { id: 2, type: 'GOVERNANCE', label: 'HR Protocol', event: 'Bias identification scan completed for Manager Calibration cycle.', time: '1h ago', color: 'text-indigo-600' },
  { id: 3, type: 'FISCAL', label: 'Growth & Sales', event: 'ROI Variance detected: +18% surplus in EMEA regional hub.', time: '3h ago', color: 'text-green-600' },
  { id: 4, type: 'RISK', label: 'Infrastructure', event: 'Load risk detected in Node Cluster 4. Capacity calibration suggested.', time: '5h ago', color: 'text-red-500' },
  { id: 5, type: 'MILESTONE', label: 'Global Strategy', event: 'Zero-Trust Security Initiative finalized ahead of schedule.', time: '8h ago', color: 'text-amber-600' },
];

const FISCAL_ROI_DATA = [
  { name: 'Eng', budget: 85, yield: 92, velocity: 98 },
  { name: 'Infra', budget: 60, yield: 55, velocity: 88 },
  { name: 'Sales', budget: 95, yield: 78, velocity: 65 },
  { name: 'Strat', budget: 40, yield: 98, velocity: 95 },
  { name: 'Sec', budget: 55, yield: 88, velocity: 90 },
];

const UNIT_LEDGER = [
  { id: 'd1', name: "Core Engineering", lead: "Sarah Chen", headcount: 42, health: 94, budget: '$4.2M', roi: '+12%', risk: 'Low', avatar: 'https://picsum.photos/seed/sarah/100/100', performanceHistory: [70, 75, 82, 94], velocity: 98 },
  { id: 'd2', name: "Infrastructure", lead: "Marcus Vane", headcount: 12, health: 88, budget: '$2.1M', roi: '-4%', risk: 'Medium', avatar: 'https://picsum.photos/seed/marcus/100/100', performanceHistory: [80, 82, 85, 88], velocity: 82 },
  { id: 'd3', name: "Growth & Sales", lead: "Elena Rossi", headcount: 28, health: 62, budget: '$5.5M', roi: '-18%', risk: 'High', avatar: 'https://picsum.photos/seed/elena/100/100', performanceHistory: [75, 70, 65, 62], velocity: 54 },
  { id: 'd4', name: "Product Strategy", lead: "Alex Rivera", headcount: 8, health: 98, budget: '$1.8M', roi: '+24%', risk: 'Low', avatar: 'https://picsum.photos/seed/alex/100/100', performanceHistory: [90, 92, 95, 98], velocity: 114 },
];

const PERSONAL_VELOCITY_DATA = [
  { name: 'W1', val: 65 },
  { name: 'W2', val: 78 },
  { name: 'W3', val: 72 },
  { name: 'W4', val: 85 },
  { name: 'W5', val: 92 },
  { name: 'W6', val: 88 },
];

const MY_ACTIVE_GOALS = [
  { id: 'g1', code: 'IND-742-A', title: 'Optimize Core Engine Latency', progress: 74, type: 'KPI', status: 'On Track', confidence: 92, weight: 40, description: 'Improve request-response cycle times...', krs: [] },
  { id: 'g2', code: 'IND-742-B', title: 'v4.0 UI Calibration Specs', progress: 42, type: 'OKR', status: 'At Risk', confidence: 45, weight: 30, description: 'Deliver high-fidelity design...', krs: [] },
];

const TEAM_MEMBERS = [
  { id: 'tm1', name: "Sarah Chen", role: "Sr. Product Manager", health: 98, attainment: 94, velocity: 98, avatar: "https://picsum.photos/seed/sarah/100/100", status: 'Completed' },
  { id: 'tm2', name: "Marcus Vane", role: "DevOps Lead", health: 42, attainment: 35, velocity: 52, avatar: "https://picsum.photos/seed/marcus/100/100", status: 'Awaiting Mgr' },
];

// --- COMPONENTS ---

const DashboardPage: React.FC<{ role: UserRole }> = ({ role }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const isOrgAdmin = role === UserRole.ORG_ADMIN || role === UserRole.EXECUTIVE;
  const isEmployee = role === UserRole.EMPLOYEE;
  const isManager = role === UserRole.MANAGER;

  const selectedUnit = useMemo(() => 
    UNIT_LEDGER.find(u => u.id === selectedUnitId), 
    [selectedUnitId]
  );

  if (isEmployee) return <EmployeeDashboard />;
  if (isManager) return <ManagerDashboard />;

  // --- ORG ADMIN / EXECUTIVE "BOARDROOM" VIEW ---
  if (isOrgAdmin && selectedUnit) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-12">
        <div className="flex items-center space-x-6 mb-8">
           <button 
             onClick={() => setSelectedUnitId(null)}
             className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-500 shadow-sm"
           >
             <ArrowLeft size={20} />
           </button>
           <div>
              <div className="flex items-center space-x-2">
                 <span className="px-2 py-0.5 bg-primary text-white rounded text-[10px] font-black uppercase tracking-widest">Unit Deep Dive</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mt-1">{selectedUnit.name} Intelligence</h2>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
                 <div className="absolute top-0 right-0 p-8 opacity-5"><User size={120} /></div>
                 <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8 border-l-2 border-primary pl-4">Unit Custodian</h3>
                 <div className="flex items-center space-x-5 relative z-10">
                    <img src={selectedUnit.avatar} className="w-20 h-20 rounded-3xl border-4 border-white/10 object-cover" alt={selectedUnit.lead} />
                    <div>
                       <h4 className="text-xl font-black tracking-tight">{selectedUnit.lead}</h4>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Lead Executive</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-8">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Operational Allocation</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Budgeted</p>
                       <p className="text-2xl font-black text-slate-900">{selectedUnit.budget}</p>
                    </div>
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Nodes</p>
                       <p className="text-2xl font-black text-slate-900">{selectedUnit.headcount}</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-8">
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm h-full">
                 <div className="flex items-center justify-between mb-12">
                    <div>
                       <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Institutional Vitality Trend</h3>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Rolling 4-Month Performance Aggregate</p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${selectedUnit.health > 80 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                       {selectedUnit.health > 80 ? 'Optimal Corridor' : 'Intervention Triggered'}
                    </div>
                 </div>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={selectedUnit.performanceHistory.map((val, i) => ({ name: `M${i+1}`, val }))}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 800, fill: '#94A3B8'}} />
                          <YAxis hide />
                          <Tooltip 
                            cursor={{fill: '#F8FAFC'}} 
                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                          />
                          <Bar dataKey="val" fill="#1659E6" radius={[6, 6, 0, 0]} barSize={48} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1600px] mx-auto">
      {/* ORGANIZATION INTELLIGENCE HUB HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
           <Globe size={180} className="text-primary" />
        </div>
        <div className="flex items-center space-x-6 relative z-10">
          <div className="w-14 h-14 rounded-[1.25rem] bg-slate-900 flex items-center justify-center text-primary shadow-2xl shrink-0">
             <Globe size={28} className="text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-1.5">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-black uppercase tracking-widest border border-slate-200">System Root Access</span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Organization Intelligence Hub</h1>
          </div>
        </div>
        <div className="hidden xl:flex items-center space-x-12 px-12 border-l border-slate-100 relative z-10">
           <div className="text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Vitality</p>
              <p className="text-2xl font-black text-slate-900 leading-none">91%</p>
           </div>
           <div className="text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Cycles</p>
              <p className="text-2xl font-black text-primary leading-none">02</p>
           </div>
           <button className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary hover:text-white hover:shadow-xl transition-all">
              <Settings size={20} />
           </button>
        </div>
      </div>

      {/* EXECUTIVE KPI GRID - DATA DENSE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BoardroomTile label="OKR ATTAINMENT" value="82.4%" trend="+4.2%" icon={<Target size={20}/>} color="primary" drift="-2%" />
        <BoardroomTile label="TALENT RETENTION" value="94.2%" trend="Stable" icon={<Users size={20}/>} color="green" drift="Optimal" />
        <BoardroomTile label="FISCAL ROI INDEX" value="1.42x" trend="+0.2" icon={<Wallet size={20}/>} color="indigo" drift="+12%" />
        <BoardroomTile label="GOVERNANCE INDEX" value="99.8%" trend="Verified" icon={<ShieldCheck size={20}/>} color="slate" drift="SOC-2" />
      </div>

      {/* ANALYTICS SECTION: SYNTHESIS & PULSE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* EXECUTIVE SYNTHESIS HERO WITH RADAR */}
        <div className="lg:col-span-6 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800 group">
           <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center space-x-4 mb-6">
                 <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-lg border border-primary/20 animate-pulse">
                    <Sparkles size={20} />
                 </div>
                 <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] border-l-2 border-primary pl-4">Executive Synthesis</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                 <div className="space-y-5">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all cursor-default">
                       <h4 className="text-xs font-black uppercase text-slate-100 mb-1.5 flex items-center">
                          <AlertTriangle size={12} className="mr-2 text-amber-500" />
                          Strategic Drift
                       </h4>
                       <p className="text-[13px] text-slate-400 italic leading-relaxed">"Growth & Sales unit operating <span className="text-white font-bold">22% outside</span> defined window."</p>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all cursor-default">
                       <h4 className="text-xs font-black uppercase text-slate-100 mb-1.5 flex items-center">
                          <TrendingUp size={12} className="mr-2 text-green-500" />
                          Velocity Surplus
                       </h4>
                       <p className="text-[13px] text-slate-400 italic leading-relaxed">"Engineering throughput exceeds roadmap by <span className="text-white font-bold">14%</span>."</p>
                    </div>
                    <button className="w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">Launch Global Calibration Pulse</button>
                 </div>
                 
                 <div className="bg-white/5 rounded-[2rem] border border-white/10 p-4 flex flex-col items-center justify-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-4">Sector Calibration Radar</p>
                    <div className="w-full h-44">
                       <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={SECTOR_CALIBRATION_DATA}>
                             <PolarGrid stroke="#334155" />
                             <PolarAngleAxis dataKey="subject" tick={{fontSize: 8, fill: '#94A3B8', fontWeight: 800}} />
                             <Radar name="Target" dataKey="A" stroke="#1659E6" fill="#1659E6" fillOpacity={0.4} />
                             <Radar name="Actual" dataKey="B" stroke="#30B7EE" fill="#30B7EE" fillOpacity={0.1} />
                          </RadarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* INSTITUTIONAL ACTIVITY PULSE (ENHANCED) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Institutional Activity Pulse</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Aggregated Strategic Events Ledger</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-300">
                 <Activity size={20} />
              </div>
           </div>
           
           <div className="space-y-3.5 max-h-[340px] overflow-y-auto custom-scrollbar pr-2">
              {INSTITUTIONAL_PULSE_EVENTS.map(event => (
                <div key={event.id} className="p-5 border border-slate-50 bg-slate-50/50 rounded-[2rem] flex items-center justify-between group hover:bg-white hover:border-slate-100 transition-all shadow-sm">
                   <div className="flex items-center space-x-4">
                      <div className={`p-2.5 bg-white rounded-xl shadow-sm border border-slate-50 ${event.color}`}>
                         {event.type === 'STRATEGIC' ? <Target size={16} /> : event.type === 'GOVERNANCE' ? <ShieldCheck size={16} /> : event.type === 'FISCAL' ? <Wallet size={16} /> : event.type === 'MILESTONE' ? <Award size={16} /> : <ShieldAlert size={16} />}
                      </div>
                      <div>
                         <div className="flex items-center space-x-2 mb-0.5">
                            <span className={`text-[7px] font-black uppercase tracking-widest px-1 py-0.5 rounded bg-white border border-slate-100 ${event.color}`}>{event.type}</span>
                            <span className="text-[9px] font-black text-slate-900 uppercase tracking-tight">{event.label}</span>
                         </div>
                         <p className="text-[11px] font-bold text-slate-600 leading-relaxed italic truncate max-w-[280px]">"{event.event}"</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{event.time}</span>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-300 uppercase">Archive Depth: 120h</span>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Full Event Audit</button>
           </div>
        </div>
      </div>

      {/* ANALYTICS SECTION: UNIT VITALITY HEATMAP & FISCAL ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* UNIT VITALITY HEATMAP GRID */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Institutional Node Map</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Vitality vs Velocity Calibration</p>
              </div>
              <Layers size={18} className="text-slate-300" />
           </div>
           <div className="grid grid-cols-2 gap-4">
              {UNIT_LEDGER.map(unit => (
                 <div key={unit.id} className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all cursor-default group">
                    <div className="flex justify-between items-start mb-3">
                       <p className="text-[9px] font-black text-slate-900 uppercase tracking-tighter truncate w-24">{unit.name}</p>
                       <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full ${unit.health > 80 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {unit.health}% Health
                       </span>
                    </div>
                    <div className="flex items-end justify-between">
                       <div>
                          <p className="text-[7px] font-black text-slate-400 uppercase mb-0.5">Velocity</p>
                          <p className="text-lg font-black text-slate-900">{unit.velocity}%</p>
                       </div>
                       <div className="flex items-center space-x-1 mb-1">
                          {[1, 2, 3, 4, 5].map((dot, i) => (
                             <div key={i} className={`w-1 h-1 rounded-full ${i < (unit.velocity / 20) ? 'bg-primary' : 'bg-slate-200'}`} />
                          ))}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* FISCAL PERFORMANCE ROI (COMPOSED CHART) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm relative">
           <div className="flex items-center justify-between mb-10">
              <div>
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Fiscal Yield Synthesis</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Capital Allocation vs Strategic Outcome Yield</p>
              </div>
              <div className="flex items-center space-x-5 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                 <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-slate-100" />
                    <span>Allocated</span>
                 </div>
                 <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                    <span>Yield</span>
                 </div>
              </div>
           </div>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <ComposedChart data={FISCAL_ROI_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94A3B8'}} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="budget" fill="#F1F5F9" radius={[6, 6, 0, 0]} barSize={20} />
                    <Bar dataKey="yield" fill="#1659E6" radius={[6, 6, 0, 0]} barSize={20} />
                    <Line type="monotone" dataKey="velocity" stroke="#30B7EE" strokeWidth={2.5} dot={{r: 3.5, fill: '#30B7EE', strokeWidth: 2, stroke: '#fff'}} />
                 </ComposedChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* FUNCTIONAL UNIT LEDGER - REFINED SCALE */}
      <div className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden">
         <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
               <BarChart3 size={20} className="text-slate-400" />
               <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">Functional Unit Ledger</h3>
            </div>
            <button className="text-[10px] font-black text-primary uppercase hover:underline tracking-widest">Download Full Audit</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50/30 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                  <tr>
                     <th className="px-10 py-5">Functional Unit</th>
                     <th className="px-10 py-5">Institutional Lead</th>
                     <th className="px-10 py-5">Vitality Index</th>
                     <th className="px-10 py-5">ROI variance</th>
                     <th className="px-10 py-5 text-right">Strategic Drill</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {UNIT_LEDGER.map((unit) => (
                    <tr key={unit.id} onClick={() => setSelectedUnitId(unit.id)} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                       <td className="px-10 py-5 text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">{unit.name}</td>
                       <td className="px-10 py-5">
                          <div className="flex items-center space-x-3">
                             <img src={unit.avatar} className="w-9 h-9 rounded-xl object-cover border-2 border-white shadow-md" alt={unit.lead} />
                             <div>
                                <span className="text-xs font-black text-slate-700 block uppercase leading-none">{unit.lead}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">{unit.headcount} PERSONNEL NODES</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-5">
                          <div className="flex items-center space-x-3">
                             <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-primary shadow-sm shadow-primary/20" style={{ width: `${unit.health}%` }} />
                             </div>
                             <span className="text-[10px] font-black text-slate-900">{unit.health}%</span>
                          </div>
                       </td>
                       <td className="px-10 py-5">
                          <div className={`flex items-center space-x-2 font-black text-xs ${unit.roi.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                             {unit.roi.startsWith('+') ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                             <span>{unit.roi}</span>
                          </div>
                       </td>
                       <td className="px-10 py-5 text-right">
                          <div className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-300 group-hover:text-primary group-hover:shadow-lg group-hover:border-primary/20 transition-all inline-block">
                             <ChevronRight size={18} />
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

// --- MANAGER VIEW ---

const ManagerDashboard = () => (
  <div className="space-y-5 animate-in fade-in duration-500 pb-12 max-w-[1600px] mx-auto">
    <div className="flex flex-col xl:flex-row xl:items-center justify-between bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm relative overflow-hidden group">
      <div className="flex items-center space-x-5 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-xl">
           <Monitor size={24} />
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-1.5 py-0.5 bg-primary/5 text-primary border border-primary/10 rounded-full text-[8px] font-black uppercase tracking-widest">Leadership Hub</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">Department Command</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[9px] tracking-widest">42 Active Personnel Nodes</p>
        </div>
      </div>

      <div className="hidden xl:flex items-center space-x-10 px-10 border-l border-slate-100">
         <div className="text-center">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Unit Vitality</p>
            <p className="text-2xl font-black text-slate-900 leading-none">84%</p>
         </div>
         <div className="text-center">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Progress</p>
            <p className="text-2xl font-black text-primary leading-none">72%</p>
         </div>
         <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-primary transition-all shadow-sm">
            <Settings size={18} />
         </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <BoardroomTile label="TEAM OKR" value="84.2%" trend="+5.1%" icon={<Target size={16}/>} color="primary" />
      <BoardroomTile label="VELOCITY" value="92.4%" trend="Stable" icon={<Zap size={16}/>} color="indigo" />
      <BoardroomTile label="APPRAISALS" value="12/42" trend="72%" icon={<ClipboardCheck size={16}/>} color="green" />
      <BoardroomTile label="TALENT RISK" value="Low" trend="2 Flags" icon={<ShieldAlert size={16}/>} color="slate" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
       <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <div className="mb-8">
             <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight leading-none mb-1">Performance Distribution</h3>
             <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Calibration Bell-Curve</p>
          </div>
          <div className="h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: '1.0', value: 1 },
                  { name: '2.0', value: 3 },
                  { name: '3.0', value: 12 },
                  { name: '4.0', value: 18 },
                  { name: '5.0', value: 8 },
                ]}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#64748B'}} />
                   <YAxis hide />
                   <Tooltip cursor={{fill: 'transparent'}} />
                   <Bar dataKey="value" fill="#F1F5F9" radius={[2, 2, 0, 0]} barSize={32}>
                      {[1, 2, 3, 4, 5].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 ? '#1659E6' : '#F1F5F9'} />
                      ))}
                   </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
       </div>

       <div className="lg:col-span-5 bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10">
             <h3 className="text-[9px] font-black text-primary uppercase tracking-[0.3em] border-l-2 border-primary pl-3 mb-6">Managerial Synthesis</h3>
             <div className="space-y-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                   <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-1.5">Load Alert</p>
                   <p className="text-xs text-slate-300 leading-relaxed italic">"3 nodes operating at 95% capacity for 14+ days. Redistribution recommended."</p>
                </div>
             </div>
             <button className="w-full mt-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Generate Coaching Blueprint</button>
          </div>
       </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
       <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Direct Report Ledger</h3>
       </div>
       <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="bg-slate-50/30 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                   <th className="px-6 py-4">Node</th>
                   <th className="px-6 py-4">Health</th>
                   <th className="px-6 py-4 text-center">Attainment</th>
                   <th className="px-6 py-4 text-right">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50">
                {TEAM_MEMBERS.map(person => (
                  <tr key={person.id} className="hover:bg-slate-50/50 group transition-all">
                     <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                           <img src={person.avatar} className="w-8 h-8 rounded-lg object-cover" alt={person.name} />
                           <div>
                              <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{person.name}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase">{person.role}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                           <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${person.health > 80 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${person.health}%` }} />
                           </div>
                           <span className="text-[10px] font-black">{person.health}%</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-center text-xs font-black text-slate-900">{person.attainment}%</td>
                     <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-300 hover:text-primary transition-all"><ChevronRight size={14}/></button>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  </div>
);

/**
 * HIGH-FIDELITY EMPLOYEE DASHBOARD
 */
const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<any>(null);

  return (
    <div className="space-y-5 animate-in fade-in duration-500 pb-12 max-w-[1400px] mx-auto">
      {/* 1. PERSONAL HEADER */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-6 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all duration-700 pointer-events-none">
            <Fingerprint size={120} className="text-primary" />
         </div>
         <div className="flex items-center space-x-5 relative z-10">
            <div className="relative">
               <img src="https://picsum.photos/seed/alex/100/100" className="w-16 h-16 rounded-2xl border-2 border-white shadow-lg object-cover" alt="Alex Rivera" />
               <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                  <Check size={10} className="text-white" />
               </div>
            </div>
            <div>
               <div className="flex items-center space-x-2 mb-1">
                  <span className="px-1.5 py-0.5 bg-primary text-white rounded text-[8px] font-black uppercase tracking-widest shadow-sm">Personal Suite</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">v4.8 Trace</span>
               </div>
               <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase leading-none">Alex Rivera</h2>
               <p className="text-slate-500 font-bold mt-1 uppercase text-[9px] tracking-tight flex items-center">
                  <Monitor size={10} className="mr-1.5 text-primary" /> Staff Tier L6 <span className="mx-2 opacity-20">•</span> Product Strategy
               </p>
            </div>
         </div>
         <div className="hidden xl:flex items-center space-x-10 px-8 border-l border-slate-100">
            <div className="text-center">
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Velocity</p>
               <p className="text-xl font-black text-primary leading-none">114%</p>
            </div>
            <div className="text-center">
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Quota</p>
               <p className="text-xl font-black text-green-600 leading-none">92%</p>
            </div>
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
               <Settings size={16} />
            </button>
         </div>
      </div>

      {/* 2. KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BoardroomTile label="MY OKR ATTAINMENT" value="74.2%" trend="+5.1%" icon={<Target size={16}/>} color="primary" />
        <BoardroomTile label="PERSONAL VELOCITY" value="92.4%" trend="Stable" icon={<Zap size={16}/>} color="indigo" />
        <BoardroomTile label="REVIEWS PENDING" value="02" trend="Oct 31" icon={<ClipboardCheck size={16}/>} color="green" />
        <BoardroomTile label="CALIBRATION STATUS" value="Hardened" trend="v2.1" icon={<ShieldCheck size={16}/>} color="slate" />
      </div>

      {/* 3. FOCUS LEDGER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
         <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
               <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">My Focus Ledger</h3>
               <button onClick={() => navigate('/objectives')} className="text-[9px] font-black text-primary uppercase hover:underline">View All Anchors</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/30 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                     <tr>
                        <th className="px-6 py-4">Objective Node</th>
                        <th className="px-6 py-4 text-center">Type</th>
                        <th className="px-6 py-4">Attainment</th>
                        <th className="px-6 py-4 text-right">Context</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {MY_ACTIVE_GOALS.map(goal => (
                        <tr 
                          key={goal.id} 
                          onClick={() => setSelectedGoal(goal)}
                          className="hover:bg-slate-50/50 transition-all group cursor-pointer"
                        >
                           <td className="px-6 py-4">
                              <span className="text-xs font-black text-slate-800 uppercase tracking-tight group-hover:text-primary transition-colors">{goal.title}</span>
                              <div className="flex items-center space-x-1.5 mt-1">
                                 <div className={`w-1.5 h-1.5 rounded-full ${goal.status === 'On Track' || goal.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                 <span className="text-[8px] font-bold text-slate-400 uppercase">{goal.status}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-black uppercase">{goal.type}</span>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                 <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${goal.progress}%` }} />
                                 </div>
                                 <span className="text-[10px] font-black text-slate-900">{goal.progress}%</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-2 text-slate-300 hover:text-primary transition-all"><ChevronRight size={14}/></button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 text-center">Development Cycle</h3>
            <div className="h-full flex flex-col justify-center items-center py-8">
               <div className="w-32 h-32 rounded-full border-[10px] border-slate-50 flex flex-col items-center justify-center relative bg-white shadow-xl">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                     <circle cx="50%" cy="50%" r="58" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                     <circle cx="50%" cy="50%" r="58" fill="transparent" stroke="#1659E6" strokeWidth="10" strokeDasharray="240 364" strokeLinecap="round" />
                  </svg>
                  <span className="text-2xl font-black text-slate-900">Q4</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Horizon</span>
               </div>
            </div>
         </div>
      </div>

      {selectedGoal && (
        <PersonalGoalDetailModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const PersonalGoalDetailModal = ({ goal, onClose }: { goal: any, onClose: () => void }) => (
  <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-white rounded-[2.5rem] w-full max-w-3xl shadow-2xl overflow-hidden border border-slate-200 border-t-[8px] border-t-primary flex flex-col max-h-[90vh]">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center space-x-5">
           <div className={`p-4 rounded-2xl shadow-lg ${goal.type === 'KPI' ? 'bg-secondary text-white' : 'bg-primary text-white'}`}>
             {goal.type === 'KPI' ? <Zap size={24} /> : <Target size={24} />}
           </div>
           <div>
              <div className="flex items-center space-x-2 mb-1">
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">{goal.code}</span>
                 <span className="w-1 h-1 bg-slate-300 rounded-full" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{goal.type} PERSPECTIVE</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none">{goal.title}</h3>
           </div>
        </div>
        <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><X size={24}/></button>
      </div>

      <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
         <div className="grid grid-cols-3 gap-4">
            <AnalyticMiniStat label="Attainment" value={`${goal.progress}%`} icon={<Activity size={14} className="text-primary"/>} />
            <AnalyticMiniStat label="Confidence" value={`${goal.confidence}%`} icon={<BrainCircuit size={14} className="text-indigo-600"/>} />
            <AnalyticMiniStat label="Weight" value={`${goal.weight}%`} icon={<Scale size={14} className="text-slate-500"/>} />
         </div>
         <div className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Strategic Narrative</h4>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl italic font-medium text-sm text-slate-600 leading-relaxed shadow-inner">
               "{goal.description}"
            </div>
         </div>
         <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               <Sparkles size={100} className="text-primary" />
            </div>
            <div className="relative z-10">
               <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-xl text-primary border border-primary/20"><BrainCircuit size={18}/></div>
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] border-l-2 border-primary pl-3">Contextual intelligence</h4>
               </div>
               <p className="text-sm font-medium text-slate-300 leading-relaxed italic">
                  Observation: Execution velocity remains high. You are currently 12% ahead of the institutional delivery curve. Alignment signal is strong.
               </p>
            </div>
         </div>
      </div>
      <div className="p-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
         <button onClick={onClose} className="px-6 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-800 transition-colors">Discard View</button>
         <button className="px-10 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">Request Mid-Cycle Check</button>
      </div>
    </div>
  </div>
);

const AnalyticMiniStat = ({ label, value, icon }: any) => (
  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner">
     <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</span>
        {icon}
     </div>
     <p className="text-lg font-black text-slate-900 leading-none">{value}</p>
  </div>
);

const BoardroomTile = ({ label, value, trend, icon, color, drift }: any) => {
  const colorMap: any = { 
    primary: 'text-primary bg-primary/5 border-primary/10', 
    green: 'text-green-600 bg-green-50 border-green-100', 
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    slate: 'text-slate-600 bg-slate-50 border-slate-200'
  };
  return (
    <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between h-44">
       <div className="flex justify-between items-start">
          <div className={`p-4 rounded-2xl ${colorMap[color]} shadow-inner border`}>
            {icon}
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">{label}</p>
             <h4 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors leading-none tracking-tighter">{value}</h4>
          </div>
       </div>
       <div className="flex justify-between items-end border-t border-slate-50 pt-4 mt-4">
          <div className="flex items-center space-x-2">
             <span className={`text-xs font-black uppercase tracking-tight ${trend.startsWith('+') ? 'text-green-600' : 'text-slate-500'}`}>{trend}</span>
          </div>
          {drift && (
             <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Variance</span>
                <span className="text-[9px] font-black text-primary uppercase">{drift}</span>
             </div>
          )}
       </div>
    </div>
  );
};

export default DashboardPage;