import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Users, 
  Target, 
  ChevronRight,
  ShieldCheck,
  Network,
  History,
  CheckCircle2,
  TrendingUp,
  FileText,
  ExternalLink,
  Zap,
  Plus,
  Compass,
  User,
  Activity,
  Clock,
  Layout,
  Star,
  Map,
  FileCode,
  Globe,
  Settings2,
  X,
  Sparkles,
  BrainCircuit,
  Scale,
  ArrowRight,
  MoreHorizontal as LucideMoreHorizontal,
  ChevronLeft,
  LayoutGrid,
  Wallet,
  Gauge,
  Search,
  Filter,
  Users2,
  GitBranch,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { UserRole } from '../types';

// --- MOCK DATA ---

const TOP_TALENT = [
  { name: "Sarah Chen", role: "SR. PRODUCT MANAGER", avatar: "https://picsum.photos/seed/sarah/100/100" },
  { name: "Jordan Smith", role: "STAFF ENGINEER", avatar: "https://picsum.photos/seed/jordan/100/100" },
  { name: "Emily Zhao", role: "UX DESIGNER", avatar: "https://picsum.photos/seed/emily/100/100" },
];

const EVALUATION_CYCLES = [
  { name: "PERIODIC OKR ALIGNMENT", period: "QUARTERLY", nextDate: "Oct 31, 2024", icon: <Clock size={16} /> },
  { name: "EXECUTIVE CALIBRATION", period: "BI-ANNUAL", nextDate: "Jan 15, 2025", icon: <History size={16} /> },
];

const BLUEPRINTS = [
  { title: "GLOBAL PRODUCT ROADMAP 2025", version: "V1.2 • DOCUMENT", date: "OCT 15, 2024", icon: <FileText size={18} className="text-primary" /> },
  { title: "ENGINEERING VELOCITY FRAMEWORK", version: "V2.0 • MANUAL", date: "OCT 02, 2024", icon: <Zap size={18} className="text-primary" /> },
];

const INITIAL_PILLARS = [
  { id: 'p1', category: "CUSTOMER", title: "MARKET LEADERSHIP IN AI TALENT", progress: 82, desc: "Expand EMEA reach by 12% through targeted acquisition of engineering talent hubs.", health: 'Optimal', velocity: '+4%' },
  { id: 'p2', category: "FINANCIAL", title: "UNIT MARGIN OPTIMIZATION", progress: 94, desc: "Reduce cloud overhead by 15% via multi-cloud architectural consolidation.", health: 'High', velocity: '+12%' },
];

const UNITS = [
  { id: 'u1', name: "Core Engineering", lead: "Jordan Smith", headcount: 42, health: 94, attainment: 88, status: 'Stable', icon: <Zap size={18} /> },
  { id: 'u2', name: "Growth & Sales", lead: "Elena Rossi", headcount: 28, health: 62, attainment: 74, status: 'At Risk', icon: <TrendingUp size={18} /> },
  { id: 'u3', name: "Infrastructure", lead: "Marcus Vane", headcount: 12, health: 88, attainment: 92, status: 'Optimized', icon: <Layers size={18} /> },
  { id: 'u4', name: "Product Strategy", lead: "Sarah Chen", headcount: 8, health: 98, attainment: 96, status: 'Elite', icon: <Target size={18} /> },
  { id: 'u5', name: "Creative Unit", lead: "Emily Zhao", headcount: 15, health: 100, attainment: 90, status: 'Stable', icon: <Layout size={18} /> },
  { id: 'u6', name: "Security & Legal", lead: "David Wright", headcount: 6, health: 91, attainment: 100, status: 'Verified', icon: <ShieldCheck size={18} /> },
];

const ORG_TREE = {
  name: "MANOVAR ENTERPRISE",
  role: "Institutional Root",
  type: "root",
  children: [
    {
      name: "Product & Engineering",
      role: "Strategic Hub",
      type: "hub",
      children: [
        { name: "Core Engineering", role: "Functional Unit", type: "unit" },
        { name: "Infrastructure", role: "Functional Unit", type: "unit" },
        { name: "Product Strategy", role: "Functional Unit", type: "unit" },
      ]
    },
    {
      name: "Commercial Growth",
      role: "Strategic Hub",
      type: "hub",
      children: [
        { name: "Enterprise Sales", role: "Functional Unit", type: "unit" },
        { name: "Market Research", role: "Functional Unit", type: "unit" },
        { name: "Customer Success", role: "Functional Unit", type: "unit" },
      ]
    },
    {
      name: "Ops & Governance",
      role: "Institutional Support",
      type: "hub",
      children: [
        { name: "Legal & Security", role: "Functional Unit", type: "unit" },
        { name: "Talent Acquisition", role: "Functional Unit", type: "unit" },
      ]
    }
  ]
};

interface OrganizationPageProps {
  role: UserRole;
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ role }) => {
  const [viewMode, setViewMode] = useState<'strategy' | 'directory' | 'chart'>('strategy');
  const [selectedPillar, setSelectedPillar] = useState<any>(null);
  const [isAddPillarOpen, setIsAddPillarOpen] = useState(false);
  const [pillars, setPillars] = useState(INITIAL_PILLARS);
  const [unitSearch, setUnitSearch] = useState('');

  const filteredUnits = useMemo(() => {
    return UNITS.filter(u => u.name.toLowerCase().includes(unitSearch.toLowerCase()) || u.lead.toLowerCase().includes(unitSearch.toLowerCase()));
  }, [unitSearch]);

  const handleAddPillar = (newPillar: any) => {
    setPillars([...pillars, { ...newPillar, id: `p${Date.now()}`, progress: 0, health: 'Pending', velocity: '--' }]);
    setIsAddPillarOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">Organization Intelligence</h1>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mt-1.5 opacity-70">Structural governance and strategic alignment hub</p>
        </div>

        <div className="flex items-center space-x-1 bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
          <NavButton 
            label="Strategy" 
            active={viewMode === 'strategy'} 
            onClick={() => setViewMode('strategy')} 
            icon={<Compass size={12}/>} 
          />
          <NavButton 
            label="Directory" 
            active={viewMode === 'directory'} 
            onClick={() => setViewMode('directory')} 
            icon={<Building2 size={12}/>} 
          />
          <NavButton 
            label="Org Chart" 
            active={viewMode === 'chart'} 
            onClick={() => setViewMode('chart')} 
            icon={<Network size={12}/>} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-8">
          
          {/* VIEW: Strategy */}
          {viewMode === 'strategy' && (
            <div className="space-y-8 animate-in slide-in-from-left duration-500">
              {/* Institutional North Star Hero */}
              <div className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl group border border-slate-800">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 pointer-events-none">
                    <Network size={280} className="text-primary absolute -right-16 -top-16" />
                </div>
                
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center text-primary shadow-inner">
                          <ShieldCheck size={18} />
                      </div>
                      <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Institutional North Star</p>
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">v2.4 Core Governance</p>
                      </div>
                    </div>

                    <h2 className="text-2xl font-black tracking-tight leading-tight uppercase max-w-xl">
                      Unifying human potential with <span className="text-primary">computational velocity.</span>
                    </h2>

                    <div className="flex items-center space-x-6 pt-2">
                      <div className="flex items-center space-x-2 text-green-500">
                          <CheckCircle2 size={14} />
                          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Board Verified</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-700 rounded-full" />
                      <div className="flex items-center space-x-2 text-primary">
                          <Activity size={14} />
                          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Active Horizon</span>
                      </div>
                    </div>
                </div>
              </div>

              {/* Strategic Blueprint Repository */}
              <section className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-2.5">
                      <Map size={16} className="text-primary" />
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Strategic Blueprint Repository</h3>
                  </div>
                  <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center space-x-1.5">
                      <Plus size={12} />
                      <span>Add Blueprint</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BLUEPRINTS.map((bp, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm group hover:border-primary/20 transition-all flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-primary/5 transition-colors shadow-inner">
                              {bp.icon}
                          </div>
                          <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{bp.title}</h4>
                                <LucideMoreHorizontal size={12} className="text-slate-300" />
                              </div>
                              <p className="text-[8px] font-bold text-slate-400 uppercase mt-0.5 tracking-widest">{bp.version}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end space-x-1.5 text-[8px] font-bold text-slate-300 uppercase tracking-widest mb-2">
                              <Clock size={8} />
                              <span>{bp.date}</span>
                          </div>
                          <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline flex items-center space-x-1 justify-end">
                              <span>Open Access</span>
                              <ExternalLink size={10} />
                          </button>
                        </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Strategic Pillars */}
              <section className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Strategic Pillars</h3>
                  <button 
                    onClick={() => setIsAddPillarOpen(true)}
                    className="px-4 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-1.5"
                  >
                      <Plus size={12} />
                      <span>Add Pillar</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {pillars.map((p) => (
                    <div 
                      key={p.id} 
                      onClick={() => setSelectedPillar(p)}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer flex items-center justify-between group overflow-hidden relative"
                    >
                      <div className="space-y-4 relative z-10">
                        <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{p.category}</span>
                        <div>
                          <h4 className="text-base font-black text-slate-900 uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{p.title}</h4>
                          <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest flex items-center opacity-60">
                            <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                            {p.desc.substring(0, 70)}...
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end justify-center min-w-[100px] relative z-10">
                        <span className="text-2xl font-black text-slate-900 tracking-tighter group-hover:scale-110 transition-transform">{p.progress}%</span>
                        <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden mt-2.5 shadow-inner">
                          <div className="h-full bg-primary" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/50 to-transparent translate-x-full group-hover:translate-x-0 transition-transform flex items-center justify-center">
                        <ArrowRight size={20} className="text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* VIEW: Directory */}
          {viewMode === 'directory' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center space-x-4 flex-1">
                     <div className="relative w-full max-w-md group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input 
                           type="text" 
                           value={unitSearch}
                           onChange={(e) => setUnitSearch(e.target.value)}
                           placeholder="Search functional units or leads..." 
                           className="w-full bg-slate-50 border-transparent border focus:bg-white focus:border-primary/20 rounded-xl pl-12 pr-4 py-3 text-xs font-bold outline-none transition-all shadow-inner"
                        />
                     </div>
                     <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm">
                        <Filter size={16} />
                     </button>
                  </div>
                  <div className="flex items-center space-x-6 px-6 border-l border-slate-100">
                     <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Units</p>
                        <p className="text-xl font-black text-slate-900 leading-none">{UNITS.length}</p>
                     </div>
                     <div className="w-[1px] h-8 bg-slate-100" />
                     <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Health</p>
                        <p className="text-xl font-black text-green-600 leading-none">92%</p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredUnits.map((unit) => (
                    <div key={unit.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-slate-100 hover:border-b-primary/30">
                       <div className="flex items-start justify-between mb-8">
                          <div className={`p-4 rounded-2xl ${unit.health > 80 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'} shadow-inner`}>
                             {unit.icon}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${unit.health > 80 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                             {unit.status}
                          </span>
                       </div>
                       
                       <div className="space-y-6">
                          <div>
                             <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">{unit.name}</h4>
                             <div className="flex items-center space-x-3 mt-2">
                                <div className="w-6 h-6 rounded-full bg-slate-100 border border-white shadow-sm flex items-center justify-center text-[8px] font-black text-slate-400">
                                   {unit.lead.charAt(0)}
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lead: {unit.lead}</span>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Personnel</p>
                                <p className="text-sm font-black text-slate-800">{unit.headcount} Nodes</p>
                             </div>
                             <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Attainment</p>
                                <p className="text-sm font-black text-primary">{unit.attainment}%</p>
                             </div>
                          </div>

                          <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-black transition-all flex items-center justify-center space-x-2">
                             <span>Unit Deep Dive</span>
                             <ArrowUpRight size={14} />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* VIEW: Org Chart */}
          {viewMode === 'chart' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
               <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-12 shadow-inner overflow-x-auto custom-scrollbar flex justify-center min-h-[600px]">
                  <div className="min-w-[800px] flex flex-col items-center">
                     {/* Root Node */}
                     <OrgNode item={ORG_TREE} />
                     
                     <div className="w-px h-12 bg-slate-200 relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-300" />
                     </div>
                     
                     {/* Second Tier (Hubs) */}
                     <div className="grid grid-cols-3 gap-12 w-full pt-12 border-t border-slate-200 relative">
                        {ORG_TREE.children.map((hub, hIdx) => (
                          <div key={hIdx} className="flex flex-col items-center space-y-8 relative">
                             <div className="w-px h-8 bg-slate-200 absolute -top-8" />
                             <OrgNode item={hub} />
                             
                             <div className="w-px h-8 bg-slate-100" />
                             
                             {/* Third Tier (Units) */}
                             <div className="space-y-4 w-full flex flex-col items-center">
                                {hub.children.map((unit, uIdx) => (
                                   <OrgNode key={uIdx} item={unit} />
                                ))}
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-center space-x-8 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-100 p-4 rounded-full w-fit mx-auto shadow-sm">
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-slate-900 rounded shadow-sm" /><span>Root</span></div>
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-primary rounded shadow-sm" /><span>Strategic Hub</span></div>
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-white border-2 border-slate-200 rounded shadow-sm" /><span>Unit</span></div>
               </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar Analytics (Remains Consistent) */}
        <aside className="lg:col-span-4 space-y-6">
           <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-6">
                 <Star size={16} className="text-amber-500" fill="currentColor" />
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Top Talent Spotlight</h3>
              </div>
              <div className="space-y-3">
                 {TOP_TALENT.map((person, i) => (
                   <div key={i} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-center space-x-3.5">
                         <img src={person.avatar} className="w-9 h-9 rounded-lg border border-white shadow-md object-cover" alt={person.name} />
                         <div>
                            <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{person.name}</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{person.role}</p>
                         </div>
                      </div>
                      <ChevronRight size={12} className="text-slate-300 group-hover:text-primary transition-colors" />
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-6">
                 <Layout size={16} className="text-primary" />
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Evaluation Cycles</h3>
              </div>
              <div className="space-y-3">
                 {EVALUATION_CYCLES.map((cycle, i) => (
                   <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center space-x-4 relative overflow-hidden group hover:border-primary/20 transition-all">
                      <div className="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 relative z-10 shrink-0">
                         {cycle.icon}
                      </div>
                      <div className="relative z-10 flex-1 min-w-0">
                         <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1 truncate">{cycle.name}</p>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{cycle.period}</p>
                         <div className="mt-3 pt-3 border-t border-slate-200/50 flex items-center justify-between w-full">
                            <div className="text-[8px] font-bold text-slate-400 uppercase">Next Horizon</div>
                            <div className="text-[9px] font-black text-slate-900 uppercase">{cycle.nextDate}</div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#0F172A] rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -bottom-8 -right-8 opacity-5 pointer-events-none">
                 <ShieldCheck size={160} />
              </div>
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center space-x-2.5 text-primary">
                    <div className="h-3 w-[2px] bg-primary" />
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em]">Governance Snapshot</h3>
                 </div>
                 <p className="text-xs font-medium text-slate-400 leading-relaxed italic">
                    Institutional strategy is currently synchronized across 8 departments and 122 performance nodes. High fidelity alignment detected in Infrastructure unit.
                 </p>
              </div>
           </div>
        </aside>
      </div>

      {/* --- MODALS --- */}
      {selectedPillar && (
        <PillarDetailModal pillar={selectedPillar} onClose={() => setSelectedPillar(null)} />
      )}

      {isAddPillarOpen && (
        <AddPillarModal onAdd={handleAddPillar} onClose={() => setIsAddPillarOpen(false)} />
      )}
    </div>
  );
};

// --- ORG CHART HELPERS ---

/**
 * Fix: Explicitly type OrgNode as a React Functional Component to resolve prop assignment errors, 
 * especially when used within a map function requiring a 'key' property.
 */
const OrgNode: React.FC<{ item: any }> = ({ item }) => {
  const styles: any = {
    root: 'bg-slate-900 text-white border-slate-800 w-64 ring-8 ring-slate-900/5 shadow-2xl',
    hub: 'bg-primary text-white border-primary/20 w-56 shadow-xl shadow-primary/10',
    unit: 'bg-white text-slate-900 border-slate-200 w-48 shadow-lg'
  };

  return (
    <div className={`p-5 rounded-[2rem] border transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl group relative overflow-hidden flex flex-col items-center text-center ${styles[item.type]}`}>
       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          {item.type === 'root' ? <Globe size={64}/> : item.type === 'hub' ? <Compass size={48}/> : <Building2 size={32}/>}
       </div>
       <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1.5 ${item.type === 'unit' ? 'text-primary' : 'text-primary/70'}`}>{item.role}</span>
       <h4 className="text-xs font-black uppercase tracking-tight leading-tight">{item.name}</h4>
       {item.type !== 'unit' && (
         <div className="mt-4 flex items-center space-x-2">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-900 bg-slate-700 shadow-sm" />)}
            </div>
            <span className="text-[7px] font-bold opacity-60">VERIFIED NODES</span>
         </div>
       )}
    </div>
  );
};

// --- Pillar Detail Modal ---
const PillarDetailModal = ({ pillar, onClose }: { pillar: any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
       <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-200 border-t-[10px] border-t-primary flex flex-col max-h-[90vh]">
          {/* Header Section */}
          <div className="p-10 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
             <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
                   <Target size={32} className="text-primary" />
                </div>
                <div>
                   <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-lg text-[8px] font-black uppercase tracking-widest">{pillar.category} PILLAR</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Root Node</span>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">{pillar.title}</h3>
                </div>
             </div>
             <button onClick={onClose} className="p-3 text-slate-300 hover:text-slate-600 transition-colors bg-white rounded-xl shadow-sm border border-slate-100"><X size={20}/></button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-10 bg-white">
             {/* Key Metrics Analytics Row */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-3">
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Attainment Velocity</span>
                      <TrendingUp size={14} className="text-green-500" />
                   </div>
                   <p className="text-2xl font-black text-slate-900">{pillar.progress}%</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-3">
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pillar Health</span>
                      <Activity size={14} className="text-primary" />
                   </div>
                   <p className="text-2xl font-black text-slate-900 uppercase">{pillar.health}</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-3">
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Growth Delta</span>
                      <Zap size={14} className="text-secondary" />
                   </div>
                   <p className="text-2xl font-black text-slate-900">{pillar.velocity}</p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Strategic Narrative Column */}
                <div className="lg:col-span-8 space-y-8">
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 border-l-4 border-primary pl-4">Strategic Narrative</h4>
                      <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-inner italic font-medium text-slate-600 leading-relaxed text-sm">
                        "{pillar.desc}"
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institutional Success Vectors</h4>
                      <div className="space-y-3">
                         <VectorRow label="Core Efficiency Targets" progress={92} owner="Sarah Chen" />
                         <VectorRow label="Regional Unit Expansion" progress={64} owner="Marcus Vane" />
                         <VectorRow label="Legacy Node Migration" progress={100} owner="Emily Zhao" />
                      </div>
                   </div>
                </div>

                {/* AI Alignment Insights Column */}
                <div className="lg:col-span-4 space-y-6">
                   <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl">
                      <div className="absolute top-0 right-0 p-6 opacity-10"><BrainCircuit size={100} className="text-primary" /></div>
                      <div className="relative z-10 space-y-6">
                         <div className="flex items-center space-x-3 text-primary">
                            <Sparkles size={18} />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Strategy Insight</h4>
                         </div>
                         <p className="text-xs font-medium text-slate-300 leading-relaxed italic">
                            Performance data indicates deep synchronization between this pillar and the 'Institutional North Star'. Velocity surplus detected in Engineering clusters.
                         </p>
                         <button className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Launch Deep Audit</button>
                      </div>
                   </div>

                   <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Stakeholders</h4>
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <img key={i} src={`https://picsum.photos/seed/${i + 10}/100/100`} className="w-10 h-10 rounded-xl border-2 border-white shadow-md object-cover" alt="Stakeholder" />
                        ))}
                        <div className="w-10 h-10 rounded-xl border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-md">
                          +12
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">16 Nodes contributing to this pillar</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
             <button onClick={onClose} className="px-6 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-800 transition-colors">Dismiss Intelligence Brief</button>
             <button className="px-10 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">Calibrate Outcomes</button>
          </div>
       </div>
    </div>
  );
};

/**
 * Fix: Explicitly type VectorRow as a React Functional Component to ensure proper prop recognition and consistency.
 */
const VectorRow: React.FC<{ label: string; progress: number; owner: string }> = ({ label, progress, owner }) => (
  <div className="p-5 border border-slate-50 bg-white rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm">
     <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors shadow-inner">
           <Activity size={14} />
        </div>
        <div>
           <p className="text-xs font-black text-slate-800 uppercase tracking-tight leading-none mb-1">{label}</p>
           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Lead: {owner}</p>
        </div>
     </div>
     <div className="flex items-center space-x-6">
        <div className="text-right">
           <p className="text-[9px] font-black text-slate-900">{progress}%</p>
           <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
           </div>
        </div>
        <ChevronRight size={14} className="text-slate-200 group-hover:text-primary transition-colors" />
     </div>
  </div>
);

// --- Add Pillar Modal ---
const AddPillarModal = ({ onAdd, onClose }: { onAdd: (p: any) => void, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ category: 'CUSTOMER', title: '', desc: '' });

  const CATEGORIES = [
    { id: 'CUSTOMER', label: 'Customer', icon: <Users size={18}/>, desc: 'External relationship & market growth.' },
    { id: 'FINANCIAL', label: 'Financial', icon: <Wallet size={18}/>, desc: 'Fiscal health, revenue & cost optimization.' },
    { id: 'OPERATIONAL', label: 'Operational', icon: <Settings2 size={18}/>, desc: 'Internal process & execution efficiency.' },
    { id: 'STRATEGIC', label: 'Strategic', icon: <Compass size={18}/>, desc: 'High-level institutional pivots & long-term value.' },
  ];

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Plus size={24}/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight uppercase leading-none">Pillar Architect</h3>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Institutional Strategy Definition Hub</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><X size={24}/></button>
        </div>

        <div className="p-10 space-y-10 overflow-y-auto max-h-[60vh] custom-scrollbar bg-white">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-400">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Institutional Category</label>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setFormData({...formData, category: cat.id})}
                    className={`p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col items-start h-full group ${formData.category === cat.id ? 'bg-primary/5 border-primary shadow-xl ring-4 ring-primary/5' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                  >
                     <div className={`p-3 rounded-xl w-fit mb-5 transition-colors ${formData.category === cat.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
                        {cat.icon}
                     </div>
                     <h4 className={`text-sm font-black uppercase tracking-tight mb-2 ${formData.category === cat.id ? 'text-primary' : 'text-slate-900'}`}>{cat.label}</h4>
                     <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">"{cat.desc}"</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-400">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Pillar Designation</label>
                <input 
                  autoFocus
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. CORE INFRASTRUCTURE REDESIGN"
                  className="w-full bg-white text-slate-900 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-lg outline-none focus:border-primary transition-all shadow-inner uppercase tracking-tight"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Strategic Logic (Narrative)</label>
                <textarea 
                  value={formData.desc}
                  onChange={e => setFormData({...formData, desc: e.target.value})}
                  placeholder="Define the primary objective and expected outcome for this institutional node..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 text-sm font-medium outline-none focus:bg-white focus:border-primary transition-all h-48 shadow-inner resize-none"
                />
              </div>
              <div className="p-6 bg-slate-900 rounded-[2.5rem] flex items-center justify-between text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={100} className="text-primary" /></div>
                 <div className="relative z-10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Governance Readiness</p>
                    <h4 className="text-xl font-black">Audit Verified Configuration</h4>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Ready for deployment to organizational strategy ledger.</p>
                 </div>
                 <ShieldCheck size={48} className="text-primary relative z-10" />
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
           <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors">
              {step === 1 ? 'Discard Architect' : 'Previous Module'}
           </button>
           <button 
            disabled={step === 2 && (!formData.title || !formData.desc)}
            onClick={() => step === 1 ? setStep(2) : onAdd(formData)}
            className="px-14 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center space-x-3"
           >
              <span>{step === 1 ? 'Configure Logic' : 'Deploy Pillar Node'}</span>
              <ArrowRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

// --- View Helpers ---

/**
 * Fix: Explicitly type NavButton as a React Functional Component to ensure proper prop recognition and consistency.
 */
const NavButton: React.FC<{ label: string; active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ label, active, onClick, icon }) => (
  <button 
    onClick={onClick} 
    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center space-x-1.5 ${
      active 
      ? 'bg-slate-900 text-white shadow-xl' 
      : 'text-slate-500 hover:bg-slate-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default OrganizationPage;