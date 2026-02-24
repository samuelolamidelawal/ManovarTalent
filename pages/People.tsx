import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  ArrowUpDown,
  FileText,
  X,
  Mail,
  MapPin,
  Briefcase,
  ExternalLink,
  Edit2,
  Trash2,
  Check,
  History,
  Award,
  ChevronRight,
  TrendingUp,
  Star,
  GraduationCap,
  BookOpen,
  UserPlus,
  Compass,
  Zap,
  Target,
  Clock,
  Plus,
  Sparkles,
  Link as LinkIcon,
  MessageCircle,
  Monitor,
  ShieldAlert as PipIcon,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  FileSearch,
  Paperclip,
  AlertTriangle,
  Flag,
  Info,
  Layers,
  BrainCircuit,
  PieChart as PieChartIcon,
  BarChart3,
  Award as Medal,
  Activity,
  CheckCircle2,
  ListTodo,
  Timer,
  Download,
  User,
  Camera,
  Globe,
  Building2,
  Shield,
  Fingerprint,
  /* Added RefreshCw to fix "Cannot find name 'RefreshCw'" error */
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/common/Pagination';
import { UserRole } from '../types';

const INITIAL_PEOPLE = [
  { 
    id: 1, 
    name: "Sarah Chen", 
    title: "Sr. Product Manager", 
    level: "L6", 
    dept: "Core Platform", 
    health: 98, 
    avatar: "https://picsum.photos/seed/sarah/100/100", 
    email: "sarah.c@manovar.ai",
    location: "San Francisco, US",
    tenure: "2.4 Years",
    strengths: ["Strategic Vision", "Technical Breadth", "Cross-functional Lead"],
    currentFocus: "v4.0 Core Engine GA",
    pastReviews: [
      { period: "Q2 2024", score: "4.8/5", status: "Exceptional", summary: "Exceeded all OKR targets for the engine refactor.", krAttainment: 94, kpiVelocity: 98 },
      { period: "Q1 2024", score: "4.5/5", status: "Excees Expectations", summary: "Strong leadership during the Q1 roadmap pivot.", krAttainment: 88, kpiVelocity: 92 }
    ],
    idp: {
      goals: [
        { id: 'idp1', title: "Advanced System Architecture", type: "Certification", status: "In Progress", progress: 65, provider: "AWS", linkedGap: "Scale Strategy" },
        { id: 'idp2', title: "Executive Communication", type: "Mentorship", status: "Active", progress: 40, provider: "Internal (Alex Rivera)", linkedGap: "Stakeholder Management" }
      ],
      skills: [
        { name: "Product Roadmap", level: 95 },
        { name: "System Design", level: 82 },
        { name: "Data Modeling", level: 88 },
        { name: "Stakeholder MGMT", level: 90 }
      ]
    }
  },
  { 
    id: 2, 
    name: "Marcus Vane", 
    title: "DevOps Lead", 
    level: "L7", 
    dept: "Infrastructure", 
    health: 42, 
    avatar: "https://picsum.photos/seed/marcus/100/100", 
    email: "marcus.v@manovar.ai",
    location: "London, UK",
    tenure: "1.2 Years",
    strengths: ["Reliability Engineering", "Security First"],
    currentFocus: "Cloud Cost Optimization",
    pipOngoing: true,
    pipData: {
      progress: 68,
      startDate: "Oct 01, 2024",
      endDate: "Dec 30, 2024",
      gaps: "Significant latency in PR reviews and consistent failure to meet Cloud Cost KPI targets for Infrastructure Unit.",
      goals: [
        { id: 'g1', title: "Reduce average PR cycle time to < 24h", status: "On Track", progress: 75 },
        { id: 'g2', title: "Implement automated cost-tagging across production", status: "Delayed", progress: 40 },
        { id: 'g3', title: "Maintain zero-downtime during system upgrades", status: "Exceeded", progress: 100 }
      ],
      actions: [
        { id: 'a1', task: "Daily review of Infrastructure backlog", status: "Completed" },
        { id: 'a2', task: "Weekly sync with Architecture board", status: "Active" },
        { id: 'a3', task: "Documentation of FinOps spend strategy", status: "Pending" }
      ],
      resources: [
        { id: 'r1', item: "Senior Mentor Pairing (Jordan Smith)", type: "Mentorship" },
        { id: 'r2', item: "AWS FinOps Certification Course", type: "Formal Training" }
      ]
    },
    pastReviews: [
      { period: "Q2 2024", score: "3.2/5", status: "Meets Expectations", summary: "Maintenance tasks handled, but strategic projects delayed.", krAttainment: 65, kpiVelocity: 74 }
    ],
    idp: { 
      goals: [
        { id: 'idp3', title: "Cost-Aware Infrastructure", type: "Workshop", status: "Pending", progress: 0, provider: "A Cloud Guru", linkedGap: "Budget Efficiency" }
      ],
      skills: [
        { name: "Kubernetes", level: 90 },
        { name: "Terraform", level: 85 },
        { name: "FinOps", level: 45 }
      ]
    }
  },
  { 
    id: 3, 
    name: "Emily Zhao", 
    title: "UX Designer", 
    level: "L4", 
    dept: "Creative", 
    health: 100, 
    avatar: "https://picsum.photos/seed/emily/100/100", 
    email: "emily.z@manovar.ai",
    location: "New York, US",
    tenure: "3.1 Years",
    strengths: ["Visual Craft", "User Empathy", "Design Systems"],
    currentFocus: "Accessibility Pass v2",
    pastReviews: [
      { period: "Q2 2024", score: "5.0/5", status: "Exceptional", summary: "Revolutionary work on the Design System v2.", krAttainment: 100, kpiVelocity: 100 }
    ],
    idp: { 
      goals: [],
      skills: [
        { name: "Figma", level: 100 },
        { name: "Design Research", level: 92 },
        { name: "React/CSS", level: 75 }
      ]
    }
  },
  { id: 4, name: "Jordan Smith", title: "Staff Engineer", level: "L8", dept: "Core Platform", health: 85, avatar: "https://picsum.photos/seed/jordan/100/100", email: "jordan.s@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
  { id: 5, name: "Elena Rossi", title: "Account Executive", level: "L5", dept: "Sales", health: 92, avatar: "https://picsum.photos/seed/elena/100/100", email: "elena.r@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
  { id: 6, name: "Marcus Thorne", title: "Engineering Mgr", level: "L7", dept: "Infrastructure", health: 88, avatar: "https://picsum.photos/seed/marcus2/100/100", email: "marcus.t@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
  { id: 7, name: "Sophia Williams", title: "HR Generalist", level: "L4", dept: "Legal & People", health: 95, avatar: "https://picsum.photos/seed/sophia/100/100", email: "sophia.w@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
  { id: 8, name: "James Miller", title: "Data Scientist", level: "L6", dept: "Analytics", health: 78, avatar: "https://picsum.photos/seed/james/100/100", email: "james.m@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
  { id: 9, name: "Olivia Brown", title: "Content Strategist", level: "L5", dept: "Marketing", health: 90, avatar: "https://picsum.photos/seed/olivia/100/100", email: "olivia.b@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
  { id: 10, name: "Liam Wilson", title: "Security Analyst", level: "L5", dept: "Security Unit", health: 99, avatar: "https://picsum.photos/seed/liam/100/100", email: "liam.w@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
  { id: 11, name: "Noah Garcia", title: "Backend Engineer", level: "L4", dept: "Core Platform", health: 64, avatar: "https://picsum.photos/seed/noah/100/100", email: "noah.g@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
  { id: 12, name: "Ava Martinez", title: "Customer Success", level: "L5", dept: "Sales", health: 82, avatar: "https://picsum.photos/seed/ava/100/100", email: "ava.m@manovar.ai", pastReviews: [], idp: { goals: [], skills: [] } },
];

interface PeoplePageProps {
  role?: UserRole;
}

const PeoplePage: React.FC<PeoplePageProps> = ({ role = UserRole.ORG_ADMIN }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<'info' | 'history' | 'idp'>('info');
  const [isPipActionOpen, setIsPipActionOpen] = useState(false);
  const [viewingPipProgress, setViewingPipProgress] = useState(false);
  const [people, setPeople] = useState(INITIAL_PEOPLE);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  
  const itemsPerPage = 8;
  const filteredPeople = useMemo(() => {
    return people.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, people]);

  const currentItems = filteredPeople.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const isManagerView = role === UserRole.MANAGER;
  const canManage = [UserRole.ORG_ADMIN, UserRole.HR, UserRole.MANAGER].includes(role);

  const handleOpenPipWizard = () => {
    setIsPipActionOpen(false);
    navigate(`/initiate-pip/${selectedPerson.id}`);
  };

  const handleOpenPipProgress = () => {
    setViewingPipProgress(true);
  };

  const handleInductPerson = (newPerson: any) => {
    const personWithMetadata = {
      ...newPerson,
      id: Date.now(),
      health: 100, // Initial induction health
      avatar: `https://picsum.photos/seed/${newPerson.name}/100/100`,
      pastReviews: [],
      idp: { goals: [], skills: [] }
    };
    setPeople([personWithMetadata, ...people]);
    setIsAddModalOpen(false);
  };

  if (viewingPipProgress && selectedPerson) {
    return (
      <PipProgressDashboard 
        person={selectedPerson} 
        onBack={() => setViewingPipProgress(false)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase leading-none">People & Structure</h1>
          <p className="text-slate-500 text-sm mt-1">Manage organizational hierarchy, roles, and skills governance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <FileText size={16} />
            <span>Org Chart</span>
          </button>
          {canManage && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              <UserPlus size={16} />
              <span>Induct Personnel</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DataIndicator label="Total Personnel" value={people.length.toString()} color="primary" />
        <DataIndicator label="Skill Density" value="High" color="primary" />
        <DataIndicator label="Anomaly Detection" value="2 Flags" color="red" />
        <DataIndicator label="Audit Status" value="Healthy" color="green" />
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="relative w-72 group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, role or department..." 
                  className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-xs font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/30 outline-none transition-all" 
                />
              </div>
              <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-primary transition-all shadow-sm">
                <Filter size={16} />
              </button>
           </div>
           <div className="flex items-center space-x-6 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 border-l border-slate-100">
              <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-green-500" /><span>Optimal</span></div>
              <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-amber-500" /><span>Strained</span></div>
              <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-red-500" /><span>Critical</span></div>
           </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Institutional Personnel</th>
                <th className="px-8 py-5">Designation & Tier</th>
                <th className="px-8 py-5">Functional Unit</th>
                <th className="px-8 py-5">Attainment Health</th>
                <th className="px-8 py-5 text-right">Strategic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
               {currentItems.map((person) => (
                 <PersonRow 
                   key={person.id}
                   person={person}
                   canManage={canManage}
                   onView={() => {
                     setSelectedPerson(person);
                     setIsViewOpen(true);
                     setProfileTab('info');
                   }}
                 />
               ))}
               {currentItems.length === 0 && (
                 <tr>
                    <td colSpan={5} className="py-32 text-center text-slate-400 font-bold uppercase tracking-widest text-xs italic">No personnel records matched your query.</td>
                 </tr>
               )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalItems={filteredPeople.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
      </div>

      {/* --- MODALS --- */}

      {isAddModalOpen && (
        <AddPersonModal onAdd={handleInductPerson} onClose={() => setIsAddModalOpen(false)} />
      )}

      {/* Profile Detail Slide-over */}
      {isViewOpen && selectedPerson && (
        <>
          <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsViewOpen(false)}></div>
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[550px] bg-white z-[120] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
            <div className="relative h-56 bg-slate-900 overflow-hidden shrink-0">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
               <button onClick={() => setIsViewOpen(false)} className="absolute top-6 right-6 p-2.5 bg-black/20 hover:bg-black/40 text-white rounded-xl transition-all z-20 backdrop-blur-md">
                  <X size={20} />
               </button>
            </div>
            
            <div className="px-10 -mt-16 flex-1 pb-12 overflow-y-auto custom-scrollbar relative bg-white">
               <div className="flex flex-col">
                  <div className="relative inline-block w-fit">
                    <img src={selectedPerson.avatar} className="w-36 h-36 rounded-[2.5rem] border-[6px] border-white shadow-2xl relative z-10 bg-white object-cover" alt={selectedPerson.name} />
                  </div>
                  
                  <div className="mt-8 flex flex-col space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">{selectedPerson.name}</h2>
                        <p className="text-slate-500 font-bold text-lg flex items-center mt-2">
                          {selectedPerson.title} <span className="mx-3 text-slate-200">|</span> <span className="text-primary">{selectedPerson.level}</span>
                        </p>
                      </div>
                      
                      {canManage && (
                        <div className="relative">
                          <button 
                            onClick={() => setIsPipActionOpen(!isPipActionOpen)}
                            className={`p-3.5 rounded-2xl border transition-all flex items-center space-x-2 ${isPipActionOpen ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm'}`}
                          >
                             <PipIcon size={18} />
                             <ChevronDown size={14} className={`transition-transform ${isPipActionOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isPipActionOpen && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setIsPipActionOpen(false)}></div>
                              <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl z-20 p-2 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
                                 <p className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Governance Overrides</p>
                                 <button 
                                  onClick={handleOpenPipWizard}
                                  className="w-full flex items-center space-x-3 px-3 py-3.5 text-xs font-black text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all text-left uppercase tracking-tight"
                                 >
                                    <PipIcon size={16} />
                                    <span>Initiate Formal PIP</span>
                                 </button>
                                 <button className="w-full flex items-center space-x-3 px-3 py-3.5 text-xs font-black text-slate-700 hover:bg-slate-50 rounded-xl transition-all text-left uppercase tracking-tight">
                                    <Flag size={16} className="text-slate-400" />
                                    <span>Mark Strategy Flag</span>
                                 </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-[1.25rem] w-full shadow-inner border border-slate-100">
                       <ProfileTabButton active={profileTab === 'info'} onClick={() => setProfileTab('info')} label="Contextual Identity" />
                       <ProfileTabButton active={profileTab === 'history'} onClick={() => setProfileTab('history')} label="Horizon Audit" />
                       <ProfileTabButton active={profileTab === 'idp'} onClick={() => setProfileTab('idp')} label="Growth Node" />
                    </div>

                    {profileTab === 'info' && (
                      <div className="space-y-10 animate-in fade-in duration-300 pb-8">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Institutional Dept</p>
                            <p className="text-sm font-black text-slate-800 tracking-tight uppercase">{selectedPerson.dept}</p>
                          </div>
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Health Index</p>
                            <p className={`text-sm font-black tracking-tight ${selectedPerson.health < 50 ? 'text-red-600' : 'text-primary'}`}>{selectedPerson.health}%</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institutional Signature</h4>
                          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                              <div className="flex items-center space-x-4 text-slate-500">
                                <MapPin size={18} />
                                <span className="text-sm font-bold uppercase tracking-tight">{selectedPerson.location || "System Node"}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-slate-500">
                                <Clock size={18} />
                                <span className="text-sm font-bold uppercase tracking-tight">Tenure: {selectedPerson.tenure || "--"}</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Skill Clusters</p>
                               <div className="flex flex-wrap gap-2.5">
                                  {(selectedPerson.strengths || ["Strategy", "Execution"]).map((s: string) => (
                                    <span key={s} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-tight shadow-sm">{s}</span>
                                  ))}
                               </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Performance Archetype</h4>
                          <div className="p-8 bg-slate-900 rounded-[2.5rem] flex items-center justify-between text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><BrainCircuit size={100} className="text-primary" /></div>
                            <div className="flex items-center space-x-6 relative z-10">
                               <div className="w-16 h-16 bg-primary/20 text-primary border border-primary/20 rounded-3xl flex items-center justify-center shadow-lg">
                                  <Medal size={32} />
                               </div>
                               <div>
                                  <p className="text-lg font-black uppercase tracking-tight">Elite Global Node</p>
                                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Top-Decile for Personnel Tier</p>
                               </div>
                            </div>
                            <Activity size={32} className="text-primary opacity-20 relative z-10" />
                          </div>
                        </div>
                      </div>
                    )}

                    {profileTab === 'history' && (
                      <div className="space-y-8 animate-in fade-in duration-300 pb-8">
                         <div className="flex items-center justify-between px-1">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-primary pl-4">Calibration Archives</h4>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{selectedPerson.pastReviews.length} Verified Records</span>
                         </div>
                         <div className="space-y-4">
                           {selectedPerson.pastReviews.map((rev: any, idx: number) => (
                             <div key={idx} className="p-8 border border-slate-100 rounded-[2rem] bg-slate-50/30 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all group">
                                <div className="flex justify-between items-start mb-8">
                                   <div className="flex items-center space-x-5">
                                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all shadow-sm">
                                         <History size={22} />
                                      </div>
                                      <div>
                                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1.5">{rev.period}</p>
                                         <p className="text-base font-black text-slate-900 tracking-tight uppercase">Index: {rev.score}</p>
                                      </div>
                                   </div>
                                   <span className="px-3 py-1 bg-primary text-white rounded-xl text-[8px] font-black uppercase tracking-widest shadow-md shadow-primary/10">{rev.status}</span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                   <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-center border border-slate-100 shadow-inner">
                                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Attainment</p>
                                      <p className="text-lg font-black text-slate-900">{rev.krAttainment}%</p>
                                   </div>
                                   <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-center border border-slate-100 shadow-inner">
                                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Velocity</p>
                                      <p className="text-lg font-black text-slate-900">{rev.kpiVelocity}%</p>
                                   </div>
                                </div>

                                <div className="p-6 bg-white rounded-3xl border border-slate-100 italic font-medium text-xs text-slate-500 leading-relaxed shadow-sm">
                                   "{rev.summary}"
                                </div>
                             </div>
                           ))}
                           {selectedPerson.pastReviews.length === 0 && (
                             <div className="py-24 text-center flex flex-col items-center space-y-4 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                <History size={48} className="text-slate-200" />
                                <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">Institutional archive empty</p>
                             </div>
                           )}
                         </div>
                      </div>
                    )}

                    {profileTab === 'idp' && (
                      <div className="space-y-10 animate-in fade-in duration-300 pb-8">
                         <div className="space-y-6">
                            <div className="flex items-center justify-between px-1">
                               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-primary pl-4">Institutional Learning Hub</h4>
                               <button className="text-[9px] font-black text-primary hover:underline uppercase tracking-widest">Architect Growth</button>
                            </div>
                            <div className="space-y-4">
                               {(selectedPerson.idp?.goals || []).map((goal: any) => (
                                 <div key={goal.id} className="p-6 border border-slate-100 rounded-[2rem] bg-white hover:shadow-2xl transition-all group">
                                    <div className="flex items-start justify-between mb-6">
                                       <div className="flex items-center space-x-4">
                                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                                             {goal.type === 'Certification' ? <Medal size={24} /> : <BookOpen size={24} />}
                                          </div>
                                          <div>
                                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{goal.type}</p>
                                             <h5 className="text-base font-black text-slate-900 tracking-tight uppercase leading-tight">{goal.title}</h5>
                                          </div>
                                       </div>
                                       <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${goal.status === 'Active' || goal.status === 'In Progress' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'bg-slate-100 text-slate-500'}`}>{goal.status}</span>
                                    </div>
                                    <div className="space-y-3">
                                       <div className="flex justify-between items-center text-[10px] font-black text-slate-400">
                                          <span className="uppercase tracking-widest">{goal.provider}</span>
                                          <span className="text-slate-900">{goal.progress}%</span>
                                       </div>
                                       <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                                          <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${goal.progress}%` }} />
                                       </div>
                                    </div>
                                 </div>
                               ))}
                               {(selectedPerson.idp?.goals?.length === 0) && (
                                 <button className="w-full py-12 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300 hover:text-primary hover:border-primary/40 transition-all group bg-slate-50/30">
                                    <Plus size={32} className="mb-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Initialize IDP Vector</span>
                                 </button>
                               )}
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Add Person Modal - Personnel Induction Architect
 */
const AddPersonModal = ({ onAdd, onClose }: { onAdd: (p: any) => void, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    dept: 'Core Platform',
    level: 'L5',
    location: 'San Francisco, US',
    roles: ['Employee view']
  });

  const DEPTS = ['Core Platform', 'Infrastructure', 'Sales', 'Creative', 'Legal & People', 'Analytics', 'Marketing', 'Security Unit'];
  const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'];

  const handleInduct = () => {
    setIsDeploying(true);
    setTimeout(() => {
      onAdd(formData);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3.5rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-primary text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-primary/20">
              <UserPlus size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">Induction Architect</h3>
              <p className="text-[10px] text-slate-500 mt-2 font-black uppercase tracking-[0.2em] flex items-center">
                Step {step} of 3 <span className="mx-2 opacity-30">•</span> {step === 1 ? 'IDENTITY Definition' : step === 2 ? 'INSTITUTIONAL PLACEMENT' : 'GOVERNANCE VERIFICATION'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:bg-white hover:text-slate-600 rounded-2xl transition-all shadow-sm"><X size={28}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white">
          {isDeploying ? (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-8 animate-in zoom-in-95">
               <div className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center text-white shadow-2xl animate-spin-slow">
                  <RefreshCw size={48} />
               </div>
               <div>
                  <h4 className="text-xl font-black uppercase tracking-tight text-slate-900">Synchronizing Institutional Nodes</h4>
                  <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Indexing {formData.name} in Global performance ledger...</p>
               </div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-10 animate-in slide-in-from-right duration-400">
                   <div className="flex items-center justify-center">
                      <div className="relative group cursor-pointer">
                         <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-slate-100 flex flex-col items-center justify-center text-slate-300 group-hover:border-primary transition-all overflow-hidden shadow-inner">
                            <Camera size={32} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[8px] font-black uppercase mt-2 tracking-widest">Upload Profile</span>
                         </div>
                         <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-white">
                            <Plus size={18} />
                         </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Legal Nomenclature</label>
                        <input 
                          autoFocus
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. Marcus Thorne"
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-8 py-5 font-black text-lg outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-inner uppercase tracking-tight"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institutional Mailbox</label>
                        <div className="relative group">
                          <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                          <input 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            placeholder="marcus.t@manovar.ai"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl pl-16 pr-8 py-5 font-bold text-base outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                   </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 animate-in slide-in-from-right duration-400">
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institutional Designation</label>
                        <input 
                          value={formData.title}
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          placeholder="e.g. Lead Staff Engineer"
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-8 py-5 font-black text-lg outline-none focus:bg-white focus:border-primary transition-all shadow-inner uppercase"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Functional Unit</label>
                            <select 
                               value={formData.dept}
                               onChange={e => setFormData({...formData, dept: e.target.value})}
                               className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 font-black text-xs outline-none focus:bg-white focus:border-primary transition-all shadow-inner appearance-none uppercase"
                            >
                               {DEPTS.map(d => <option key={d}>{d}</option>)}
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Calibration Tier</label>
                            <select 
                               value={formData.level}
                               onChange={e => setFormData({...formData, level: e.target.value})}
                               className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 font-black text-xs outline-none focus:bg-white focus:border-primary transition-all shadow-inner appearance-none uppercase"
                            >
                               {LEVELS.map(l => <option key={l}>{l}</option>)}
                            </select>
                         </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Global Site Node</label>
                        <div className="relative">
                           <Globe size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                           <input 
                             value={formData.location}
                             onChange={e => setFormData({...formData, location: e.target.value})}
                             placeholder="e.g. London, UK"
                             className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl pl-14 pr-8 py-4 font-bold text-sm outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                           />
                        </div>
                      </div>
                   </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10 animate-in slide-in-from-right duration-400">
                   <div className="space-y-6">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Governance Framework</label>
                      <div className="grid grid-cols-1 gap-4">
                         <div className="p-6 border-2 border-slate-100 rounded-[2rem] bg-slate-50/50 flex items-center justify-between group hover:bg-white hover:border-primary/20 transition-all shadow-sm">
                            <div className="flex items-center space-x-5">
                               <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary"><Shield size={24}/></div>
                               <div>
                                  <p className="text-sm font-black text-slate-900 uppercase">Institutional Verification</p>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Personnel node is audit-compliant</p>
                               </div>
                            </div>
                            <div className="w-12 h-6 bg-primary rounded-full relative shadow-lg shadow-primary/20">
                               <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </div>
                         </div>
                         <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl border border-slate-800">
                            <div className="absolute top-0 right-0 p-8 opacity-10"><Fingerprint size={140} className="text-primary" /></div>
                            <div className="relative z-10">
                               <h4 className="text-2xl font-black uppercase tracking-tight leading-tight">Authorize Induction</h4>
                               <p className="text-sm text-slate-400 mt-3 font-medium italic leading-relaxed">
                                  "Deploying <span className="text-white font-bold">{formData.name}</span> to the <span className="text-white font-bold">{formData.dept}</span> unit at tier <span className="text-white font-bold">{formData.level}</span>. All changes are immutable and indexed in the global audit trail."
                                </p>
                            </div>
                            <div className="flex items-center space-x-3 text-primary relative z-10 pt-4 border-t border-white/5">
                               <ShieldCheck size={20} />
                               <span className="text-[10px] font-black uppercase tracking-[0.2em]">SOC-2 Governance Synchronized</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </>
          )}
        </div>

        {!isDeploying && (
          <div className="p-10 border-t border-slate-100 bg-slate-50 flex items-center justify-between sticky bottom-0 z-10">
             <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors">
                {step === 1 ? 'Discard Architect' : 'Previous Module'}
             </button>
             <button 
              disabled={step === 1 && (!formData.name || !formData.email) || step === 2 && !formData.title}
              onClick={() => step < 3 ? setStep(step + 1) : handleInduct()}
              className="px-14 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center space-x-3"
             >
                <span>{step === 3 ? 'Deploy Personnel Node' : 'Next Protocol'}</span>
                <ArrowRight size={14} />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Sub-Components ---

const DataIndicator = ({ label, value, color }: any) => {
  const colorMap: any = { primary: 'text-primary', green: 'text-green-600', red: 'text-red-600' };
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-center group hover:shadow-md transition-all">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className={`text-2xl font-black ${colorMap[color]}`}>{value}</p>
    </div>
  );
};

const PersonRow = ({ person, canManage, onView }: any) => (
  <tr className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={onView}>
    <td className="px-8 py-6">
      <div className="flex items-center space-x-5">
        <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-2xl border-2 border-white shadow-md object-cover group-hover:scale-105 transition-transform" />
        <div>
           <p className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors uppercase tracking-tight">{person.name}</p>
           <p className="text-[10px] text-slate-400 font-bold mt-0.5">{person.email}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-6">
       <div>
          <p className="text-xs font-black text-slate-700 uppercase tracking-tight leading-none">{person.title}</p>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-black uppercase tracking-widest mt-2 inline-block border border-slate-200">{person.level} TIER</span>
       </div>
    </td>
    <td className="px-8 py-6">
       <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em] px-3 py-1 bg-slate-50 border border-slate-100 rounded-xl">{person.dept}</span>
    </td>
    <td className="px-8 py-6">
       <div className="flex items-center space-x-3">
          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden shadow-inner">
             <div className={`h-full transition-all duration-1000 ${person.health > 80 ? 'bg-green-500' : person.health > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${person.health}%` }}></div>
          </div>
          <span className={`text-[10px] font-black ${person.health < 50 ? 'text-red-500' : 'text-slate-900'}`}>{person.health}%</span>
          {person.pipOngoing && (
             <div className="p-1 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100 animate-pulse" title="PIP Ongoing">
                <PipIcon size={12} />
             </div>
          )}
       </div>
    </td>
    <td className="px-8 py-6 text-right">
       <div className="flex justify-end items-center space-x-2">
          <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-primary transition-all shadow-sm group-hover:shadow-md"><ExternalLink size={18} /></button>
       </div>
    </td>
  </tr>
);

const ProfileTabButton = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-primary shadow-xl ring-1 ring-slate-100' : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'}`}
  >
    {label}
  </button>
);

/**
 * PIP PROGRESS DASHBOARD - COMPREHENSIVE VIEW
 */
const PipProgressDashboard = ({ person, onBack }: { person: any, onBack: () => void }) => {
  const pip = person.pipData;

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
       <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
             <button 
               onClick={onBack}
               className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-500 shadow-sm"
             >
                <ArrowLeft size={20} />
             </button>
             <div>
                <div className="flex items-center space-x-3 mb-1">
                   <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">Performance Improvement tracking</h1>
                   <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Ongoing Cycle</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Monitoring remediation progress for {person.name} ({person.level})</p>
             </div>
          </div>
          <div className="flex items-center space-x-3">
             <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">
                <Download size={14} />
                <span>Export Analysis Report</span>
             </button>
             <button className="px-8 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                Update Milestones
             </button>
          </div>
       </div>

       <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
             <Target size={180} className="text-indigo-600" />
          </div>
          <div className="flex items-center space-x-10 relative z-10">
             <div className="w-32 h-32 rounded-full border-[10px] border-slate-50 flex flex-col items-center justify-center relative bg-white shadow-2xl">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <circle cx="50%" cy="50%" r="58" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                   <circle cx="50%" cy="50%" r="58" fill="transparent" stroke="#4F46E5" strokeWidth="10" strokeDasharray={`${(pip.progress / 100) * 364} 364`} strokeLinecap="round" />
                </svg>
                <span className="text-3xl font-black text-slate-900">{pip.progress}%</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Attainment</span>
             </div>
             <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none mb-3">Overall Plan Attainment</h3>
                <div className="flex items-center space-x-8">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Horizon</p>
                      <p className="text-sm font-bold text-slate-700">{pip.startDate} — {pip.endDate}</p>
                   </div>
                   <div className="w-[1px] h-10 bg-slate-100" />
                   <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Next Calibration</p>
                      <div className="flex items-center space-x-2 text-indigo-600">
                         <Timer size={14} />
                         <span className="text-sm font-bold">12 Days Remaining</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10 min-w-[320px]">
             <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl text-center shadow-inner">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Goals Hit</p>
                <p className="text-2xl font-black text-slate-900">2 / 3</p>
             </div>
             <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl text-center shadow-inner">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Actions Logged</p>
                <p className="text-2xl font-black text-slate-900">8 / 12</p>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
             <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <div className="flex items-center space-x-3 mb-2">
                   <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                      <AlertTriangle size={20} />
                   </div>
                   <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Institutional Remediation Focus</h3>
                </div>
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-inner relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FileSearch size={100} className="text-red-600" />
                   </div>
                   <p className="text-base font-medium text-slate-600 leading-relaxed italic relative z-10">
                      "{pip.gaps}"
                   </p>
                </div>
             </div>

             <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-10">
                <div className="flex items-center justify-between">
                   <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">SMART Goal Attainment</h3>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time vector progress tracking</p>
                </div>
                <div className="space-y-4">
                   {pip.goals.map((goal: any) => (
                     <div key={goal.id} className="p-6 bg-slate-50/50 border border-slate-100 rounded-3xl group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div className="flex items-center justify-between mb-6">
                           <div className="flex items-center space-x-5">
                              <div className={`p-3 rounded-2xl shadow-sm ${goal.status === 'On Track' ? 'bg-indigo-50 text-indigo-600' : goal.status === 'Exceeded' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                 <Target size={20} />
                              </div>
                              <div>
                                 <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight group-hover:text-primary transition-colors">{goal.title}</h4>
                                 <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Status: <span className={goal.status === 'On Track' ? 'text-indigo-600' : goal.status === 'Exceeded' ? 'text-green-600' : 'text-red-600'}>{goal.status}</span></p>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="text-2xl font-black text-slate-900">{goal.progress}%</span>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Achieved</p>
                           </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                           <div className={`h-full transition-all duration-1000 ${goal.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`} style={{ width: `${goal.progress}%` }} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl border border-slate-800">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <BrainCircuit size={120} className="text-primary" />
                </div>
                <div className="relative z-10">
                   <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-primary/20 text-primary border border-primary/20 rounded-2xl flex items-center justify-center shadow-lg border border-primary/20 animate-pulse">
                         <Sparkles size={24} />
                      </div>
                      <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] border-l-2 border-primary pl-4">Calibration Insight</h3>
                   </div>
                   <p className="text-lg font-medium text-slate-300 leading-relaxed italic mb-10">
                      "Real-time velocity for this personnel is tracking at <span className="text-white font-bold">68%</span>. Critical path correction required for the Cloud Tagging vector (g2) before cycle closure."
                   </p>
                   <button className="w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">Request Performance Sync</button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default PeoplePage;