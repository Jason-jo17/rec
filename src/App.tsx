import { useState } from 'react';
import { Send, Server, FileJson, AlertTriangle, CheckCircle, Loader2, Clipboard, PlusCircle, User, Briefcase, Award, Globe, Settings2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditableProjectCard, EditableEventCard } from './components/EditableCards';
import { ResponseUI } from './components/Visualizers';

// --- Data (Hardcoded Test Cases with Full Schema) ---
const studentData: any = {
  "student_cs_001": {
    "student_id": "student_cs_001",
    "name": "Arjun Sharma",
    "engineering_stream": "Computer Science Engineering",
    "current_semester": 7,
    "attended_events": [
      {
        "id": "event_sih_1",
        "name": "SIH 2024 - Smart Yoga Mat with AI Integration",
        "organizing_body": "AICTE",
        "description": "Smart India Hackathon focusing on AI-powered health and wellness solutions...",
        "event_type": "National Idea Pitching - 23",
        "problem_statement": {
          "description": "Develop a Smart Yoga Mat integrated with Artificial Intelligence (AI) capabilities to support smart watch integration for tracking progress and provide curated yoga content by experts, while ensuring its affordability."
        },
        "knowledge_domains": {
          "knowledge_domain_1": { "domain": "Machine Learning (ML) & AI", "ranking_score": 4.2 },
          "knowledge_domain_2": { "domain": "IoT (Internet of Things)", "ranking_score": 4.8 },
          "knowledge_domain_3": { "domain": "Embedded systems", "ranking_score": 3.9 }
        },
        "student_contribution": {
          "role": "ML Engineer & Team Lead",
          "contribution_description": "Led the development of the AI recommendation engine for personalized yoga routines. Implemented machine learning models for posture detection and developed the smart watch integration API.",
          "technologies_used": ["Python", "TensorFlow", "OpenCV", "REST APIs", "IoT sensors", "AWS IoT Core", "Flutter"],
          "outcomes_achieved": [
            "Successfully developed ML model with 89% accuracy for posture detection",
            "Created working prototype with real-time smart watch integration",
            "Led team of 6 members to complete project within hackathon timeline",
            "Achieved 3rd place in national competition with ₹50,000 prize"
          ],
          "skills_demonstrated": ["Machine Learning Model Development", "Computer Vision", "IoT Integration", "Team Leadership", "Project Management", "API Development"],
          "duration": "72 hours intensive hackathon"
        }
      }
    ],
    "current_problem_statements": [
      {
        "problem_statement_id": "ps_smart_agriculture_iot",
        "title": "Smart Agriculture IoT System for Precision Farming",
        "description": "Develop an IoT-based precision farming system using AI analytics, drone technology, and automated irrigation control to optimize crop yield and resource utilization.",
        "event_id": "event_agri_tech_summit_2024",
        "event_name": "National Agriculture Technology Summit 2024",
        "current_trl_level": 5,
        "target_trl_level": 9,
        "student_role": "System Architect & AI Lead",
        "contribution_areas": ["AI analytics development", "IoT sensor integration", "Drone data processing", "Mobile app development", "Field deployment"],
        "progress_status": "Active",
        "start_date": "2024-08-01",
        "expected_completion": "2025-06-30"
      }
    ]
  },
  "student_ece_002": {
    "student_id": "student_ece_002",
    "name": "Priya Patel",
    "engineering_stream": "Electronics and Communication Engineering",
    "current_semester": 3,
    "attended_events": [],
    "current_problem_statements": [
      {
        "problem_statement_id": "ps_iot_home_automation",
        "title": "Smart Home Automation System",
        "description": "Design and develop a cost-effective IoT-based home automation system for Indian households with voice control and smartphone integration.",
        "event_id": "event_college_tech_fest_2024",
        "event_name": "College Technical Festival 2024",
        "current_trl_level": 2,
        "target_trl_level": 9,
        "student_role": "Electronics Design Lead",
        "contribution_areas": ["Circuit design", "Microcontroller programming", "IoT connectivity", "Mobile app interface"],
        "progress_status": "Active",
        "start_date": "2024-10-01",
        "expected_completion": "2025-04-30"
      }
    ]
  }
};

const initialJson = {
  "student_id": "custom_id_001", "name": "Your Name", "engineering_stream": "Your Stream", "current_semester": 1,
  "attended_events": [], "current_problem_statements": []
};

const sampleSuccessResponse = [{ "recommendation_type": "trl_progression", "student": { "student_id": "student_cs_001", "name": "Arjun Sharma" }, "current_projects_analysis": [{ "project_title": "Smart Agriculture IoT System for Precision Farming", "current_trl": 5, "target_trl": 9, "next_trl_step": 6, "advancement_needs": ["Real-world prototype demonstration", "Partnership development", "Investor engagement"] }, { "project_title": "AI-Powered Diagnostic System for Rural Healthcare", "current_trl": 3, "target_trl": 9, "next_trl_step": 4, "advancement_needs": ["Seed funding for prototype development", "Prototype construction and testing"] }], "recommended_events": [{ "event_name": "techcrunch disrupt", "organizing_body": "TechCrunch", "trl_support_range": "TRL 6-8", "support_type": "pitch", "monetary_opportunity": true, "reason": "Opportunity to pitch to investors, scale the startup, and gain market visibility for a seasoned project at TRL 5." }, { "event_name": "nextGen Start-up challenge Contest", "organizing_body": "NGIS", "trl_support_range": "TRL 5-6", "support_type": "funding", "monetary_opportunity": true, "reason": "National pitching event supporting innovative technology in agriculture, suitable for advancing a TRL 5 project to secure funding and further development." }] }, { "recommendation_type": "event_progression", "student": { "student_id": "student_cs_001", "name": "Arjun Sharma" }, "student_expertise_analysis": { "experience_level": "advanced", "strongest_domains": ["Machine Learning (ML) & AI", "IoT (Internet of Things)", "Embedded systems", "Software Development"], "peak_ranking_scores": { "Machine Learning (ML) & AI": 6.98, "IoT (Internet of Things)": 6.98, "Embedded systems": 6.98 }, "demonstrated_skills": ["AI/ML application development", "IoT integration", "embedded systems development", "problem-solving", "creative thinking", "social impact solution design", "collaboration"], "leadership_experience": "no_explicit_leadership_experience", "successful_patterns": ["successful project completion in AI/ML and IoT for practical applications", "participation in hackathons/challenges focusing on AI for social good"] }, "recommended_events": [{ "id": "4", "name": "Microsoft Imagine cup", "organizing_body": "Microsoft", "description": "Unlock your startup’s potential with the Imagine Cup – the premier global technology startup competition for student founders using AI technologies on the Microsoft Cloud. Compete for the grand prize of $100,000 USD* and a mentorship session with Microsoft Chairman and CEO Satya Nadella. Gain access to networking opportunities, global recognition and expert coaching during the competition to accelerate your startup.", "event_type": "National Idea Pitching - 23", "problem_statement": { "description": "The event focuses on AI technologies on the Microsoft Cloud for student-led startups." }, "knowledge_domains": { "knowledge_domain_1": { "domain": "Generative AI", "ranking_score": 5 }, "knowledge_domain_2": { "domain": "software development ", "ranking_score": 5 }, "knowledge_domain_3": { "domain": "MLOps and Model Deployment", "ranking_score": 5 } }, "reason_for_recommendation": "This is a best-fit recommendation for Arjun, building directly on his proven strengths in AI/ML from projects like the 'Smart Yoga Mat with AI Integration' and the 'Google AI for Social Good Challenge'." }] }];

const CopyButton = ({ textToCopy }: any) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-all backdrop-blur-sm z-10">
      {copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Clipboard size={16} />}
    </button>
  );
};

export default function App() {
  const webhookUrls = [
    'https://document.srv927882.hstgr.cloud/webhook-test/student-recommendations-v-a',
    'https://document.srv927882.hstgr.cloud/webhook-test/student-recommendations-v-b'
  ];

  const [selectedUrl, setSelectedUrl] = useState(webhookUrls[0]);
  const [customUrl, setCustomUrl] = useState('');
  const [useCustomUrl, setUseCustomUrl] = useState(false);

  const [payload, setPayload] = useState(initialJson);
  const [rawResponse, setRawResponse] = useState('');
  const [parsedResponse, setParsedResponse] = useState<any>(sampleSuccessResponse);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('visual');

  const finalUrl = useCustomUrl ? customUrl : selectedUrl;

  const loadTestCase = (studentId: string) => {
    const data = studentData[studentId] || initialJson;
    setPayload(JSON.parse(JSON.stringify(data)));
    setError('');
    setRawResponse('');
    setParsedResponse(sampleSuccessResponse);
    setActiveTab('visual');
  };

  const handlePayloadChange = (path: any[], value: any) => {
    setPayload((prev: any) => {
      const newPayload = JSON.parse(JSON.stringify(prev));
      let current = newPayload;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newPayload;
    });
  };

  const addListItem = (key: string) => {
    const newItem = key === 'attended_events'
      ? { "id": `event_${Date.now()}`, "name": "New Event", "organizing_body": "", "description": "", "event_type": "", "problem_statement": { "description": "" }, "knowledge_domains": {}, "student_contribution": { "role": "", "contribution_description": "", "technologies_used": [], "outcomes_achieved": [], "skills_demonstrated": [], "duration": "" } }
      : { "problem_statement_id": `ps_${Date.now()}`, "title": "New Project", "description": "", "event_name": "", "current_trl_level": 1, "target_trl_level": 9, "student_role": "", "contribution_areas": [], "progress_status": "Active", "start_date": "", "expected_completion": "" };
    setPayload((p: any) => ({ ...p, [key]: [...p[key], newItem] }));
  }

  const removeListItem = (key: string, index: number) => {
    setPayload((p: any) => ({ ...p, [key]: p[key].filter((_: any, i: number) => i !== index) }));
  }

  const handleSubmit = async () => {
    if (useCustomUrl && !customUrl) {
      setError('Please provide a custom webhook URL.');
      return;
    }

    setIsLoading(true);
    setError('');
    setRawResponse('');
    setParsedResponse(null);
    try {
      const res = await fetch(finalUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const responseText = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}: ${responseText}`);

      setRawResponse(responseText);

      try {
        const initialParse = JSON.parse(responseText);
        setParsedResponse(initialParse);
        setActiveTab('visual');
      } catch (jsonError: any) {
        setError(`JSON Parsing Error: ${jsonError.message}`);
        setActiveTab('raw');
      }
    } catch (e: any) {
      setError(e.message || 'A network error occurred.');
      setActiveTab('raw');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="p-4 bg-indigo-500 rounded-3xl shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">NexGen</h1>
              <p className="text-slate-400 font-medium tracking-wide">Visual Webhook Testbed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700/50 backdrop-blur-xl"
          >
            <button
              onClick={() => setUseCustomUrl(false)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${!useCustomUrl ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Server size={16} />
              <span>Predefined</span>
            </button>
            <button
              onClick={() => setUseCustomUrl(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${useCustomUrl ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Globe size={16} />
              <span>Custom Endpoint</span>
            </button>
          </motion.div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Endpoint Settings */}
            <div className="glass-card p-8 rounded-[32px] space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <Settings2 className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold">Target Configuration</h2>
              </div>

              {!useCustomUrl ? (
                <div className="grid grid-cols-1 gap-3">
                  {webhookUrls.map(url => (
                    <button
                      key={url}
                      onClick={() => setSelectedUrl(url)}
                      className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedUrl === url ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${selectedUrl === url ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-600'}`}></div>
                        <span className={`text-sm font-bold ${selectedUrl === url ? 'text-white' : 'text-slate-400'}`}>{url.split('/').pop()}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono hidden sm:block">{url.substring(0, 30)}...</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://your-webhook.com/endpoint"
                    className="w-full px-6 py-4 glass-input rounded-2xl text-sm font-mono placeholder-slate-600 border-indigo-500/20 focus:border-indigo-500/50"
                  />
                  <p className="text-[10px] text-slate-500 ml-2 italic tracking-wider uppercase">Make sure the endpoint accepts POST requests and has CORS enabled</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800/50">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Schema Presets</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => loadTestCase('custom')} className="px-4 py-2 text-xs font-bold glass-input rounded-xl hover:bg-slate-800 transition-all border-slate-700/50">Reset Blank</button>
                  {Object.keys(studentData).map(id => (
                    <button
                      key={id}
                      onClick={() => loadTestCase(id)}
                      className="px-4 py-2 text-xs font-bold glass-input rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all border-slate-700/50 text-slate-400 hover:text-indigo-300"
                    >
                      {studentData[id].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Editor */}
            <div className="glass-card p-8 rounded-[32px] space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-bold">Student Identity</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Universal ID</label>
                  <input value={payload.student_id} onChange={e => handlePayloadChange(['student_id'], e.target.value)} className="w-full px-4 py-3 glass-input rounded-xl text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input value={payload.name} onChange={e => handlePayloadChange(['name'], e.target.value)} className="w-full px-4 py-3 glass-input rounded-xl text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Discipline</label>
                  <input value={payload.engineering_stream} onChange={e => handlePayloadChange(['engineering_stream'], e.target.value)} className="w-full px-4 py-3 glass-input rounded-xl text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current Term</label>
                  <input type="number" value={payload.current_semester} onChange={e => handlePayloadChange(['current_semester'], parseInt(e.target.value) || 0)} className="w-full px-4 py-3 glass-input rounded-xl text-sm" />
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-slate-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-lg font-bold">Active Ventures</h2>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/20">{payload.current_problem_statements.length} Entries</span>
                </div>
                <div className="space-y-4">
                  <AnimatePresence>
                    {payload.current_problem_statements.map((p: any, i: number) => (
                      <EditableProjectCard key={i} project={p} index={i} onUpdate={handlePayloadChange} onRemove={() => removeListItem('current_problem_statements', i)} />
                    ))}
                  </AnimatePresence>
                  <button onClick={() => addListItem('current_problem_statements')} className="w-full py-4 flex items-center justify-center space-x-2 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-sm font-bold">
                    <PlusCircle size={18} />
                    <span>Initiate New Project</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-slate-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-bold">Milestones & Events</h2>
                  </div>
                  <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-lg border border-indigo-500/20">{payload.attended_events.length} Entries</span>
                </div>
                <div className="space-y-4">
                  <AnimatePresence>
                    {payload.attended_events.map((e: any, i: number) => (
                      <EditableEventCard key={i} event={e} index={i} onUpdate={handlePayloadChange} onRemove={() => removeListItem('attended_events', i)} />
                    ))}
                  </AnimatePresence>
                  <button onClick={() => addListItem('attended_events')} className="w-full py-4 flex items-center justify-center space-x-2 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all text-sm font-bold">
                    <PlusCircle size={18} />
                    <span>Document Event Participation</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8 sticky top-8">
            {/* JSON Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-[32px] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/30">
                <div className="flex items-center space-x-3">
                  <FileJson className="w-5 h-5 text-amber-400" />
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Request Body</h2>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Live Sync</span>
                </div>
              </div>
              <div className="relative p-6 bg-slate-950/50 font-mono text-xs leading-relaxed overflow-auto max-h-[400px]">
                <pre className="text-amber-100/80">{JSON.stringify(payload, null, 2)}</pre>
                <CopyButton textToCopy={JSON.stringify(payload, null, 2)} />
              </div>
            </motion.div>

            {/* Response Visualizer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-[32px] p-8 min-h-[400px]"
            >
              <div className="flex border-b border-slate-800/50 mb-8 p-1.5 bg-slate-900/40 rounded-2xl w-fit">
                <button onClick={() => setActiveTab('visual')} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'visual' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Insights</button>
                <button onClick={() => setActiveTab('raw')} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'raw' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Payload</button>
              </div>

              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-30 rounded-2xl space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-[4px] animate-pulse">Awaiting Server Response...</p>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {activeTab === 'visual' ? (
                    <motion.div
                      key="visual"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {parsedResponse ? <ResponseUI data={parsedResponse} /> : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                          <div className="p-4 bg-slate-800/50 rounded-full">
                            <Sparkles className="w-8 h-8 text-slate-600" />
                          </div>
                          <div>
                            <h3 className="text-slate-300 font-bold">No Data Visualized</h3>
                            <p className="text-xs text-slate-500 max-w-[200px] mt-1">Send a request to see AI-powered student recommendations.</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="raw"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative bg-slate-950/50 rounded-2xl p-6 font-mono text-xs overflow-auto max-h-[500px]"
                    >
                      {error && (
                        <div className="text-rose-400 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 mb-4">
                          <div className="flex items-center font-black uppercase tracking-widest mb-2"><AlertTriangle className="w-4 h-4 mr-2" />Execution Halt</div>
                          <pre className="whitespace-pre-wrap">{error}</pre>
                        </div>
                      )}
                      {rawResponse && !error && (
                        <div>
                          <div className="flex items-center font-black uppercase tracking-widest mb-4 text-emerald-400"><CheckCircle className="w-4 h-4 mr-2" />Packet Received</div>
                          <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">{rawResponse}</pre>
                          <CopyButton textToCopy={rawResponse} />
                        </div>
                      )}
                      {!isLoading && !error && !rawResponse && <div className="text-slate-600 italic">No network traffic detected.</div>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Submit Action */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-8 py-6 rounded-3xl shadow-[0_20px_40px_rgba(99,102,241,0.2)] bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black uppercase tracking-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Transmitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Send className="w-6 h-6" />
                  <span>Dispatch Request</span>
                </div>
              )}
            </motion.button>
          </div>
        </section>

        <footer className="pt-12 border-t border-slate-800/50 text-center">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[6px]">Integrated Progress Recovery & Event Tracking System</p>
        </footer>
      </div>
    </div>
  );
}
