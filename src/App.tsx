import { useState } from 'react';
import { Send, Server, FileJson, Loader2, Clipboard, ClipboardCheck, PlusCircle, User, Briefcase, Award } from 'lucide-react';
import { EditableProjectCard, EditableEventCard } from './components/EditableCards';
import { ResponseUI } from './components/Visualizers';

const studentData: any = {
  "student_cs_001": {
    "student_id": "student_cs_001", "name": "Arjun Sharma", "engineering_stream": "Computer Science Engineering", "current_semester": 7,
    "attended_events": [
      { "id": "event_sih_1", "name": "SIH 2024 - Smart Yoga Mat", "organizing_body": "AICTE", "description": "AI-powered health...", "event_type": "National Idea Pitching - 23", "problem_statement": { "description": "Smart Yoga Mat..." }, "student_contribution": { "role": "ML Lead", "contribution_description": "Led AI development...", "technologies_used": ["Python", "TF"], "outcomes_achieved": ["89% accuracy"], "skills_demonstrated": ["ML"] } }
    ],
    "current_problem_statements": [
      { "problem_statement_id": "ps_agri", "title": "Smart Agriculture IoT", "description": "IoT precision farming...", "event_name": "Agri Tech 2024", "current_trl_level": 5, "target_trl_level": 9, "student_role": "AI Lead", "contribution_areas": ["AI analytics"], "progress_status": "Active" }
    ]
  },
  "student_ece_002": { "student_id": "student_ece_002", "name": "Priya Patel", "engineering_stream": "ECE", "current_semester": 3, "attended_events": [], "current_problem_statements": [] },
  "student_me_003": { "student_id": "student_me_003", "name": "Rohit Kumar", "engineering_stream": "Mechanical", "current_semester": 5, "attended_events": [], "current_problem_statements": [] },
  "student_it_004": { "student_id": "student_it_004", "name": "Ananya Singh", "engineering_stream": "IT", "current_semester": 8, "attended_events": [], "current_problem_statements": [] },
  "student_civil_005": { "student_id": "student_civil_005", "name": "Vikash Yadav", "engineering_stream": "Civil", "current_semester": 6, "attended_events": [], "current_problem_statements": [] }
};

const initialJson = { "student_id": "custom_id_001", "name": "Your Name", "engineering_stream": "Your Stream", "current_semester": 1, "attended_events": [], "current_problem_statements": [] };

const sampleResponse = [
  { "recommendation_type": "trl_progression", "recommended_events": [{ "event_name": "techcrunch disrupt", "organizing_body": "TechCrunch", "trl_support_range": "TRL 6-8", "support_type": "pitch", "monetary_opportunity": true, "reason": "Opportunity to pitch to investors..." }, { "event_name": "nextGen Start-up challenge", "organizing_body": "NGIS", "trl_support_range": "TRL 5-6", "support_type": "funding", "monetary_opportunity": true, "reason": "National pitching event..." }] },
  { "recommendation_type": "event_progression", "recommended_events": [{ "name": "Microsoft Imagine cup", "description": "Unlock your startup’s potential...", "knowledge_domains": { "kd1": { "domain": "Generative AI" }, "kd2": { "domain": "software development" } }, "reason_for_recommendation": "Best-fit recommendation for Arjun..." }] }
];

const CopyButton = ({ textToCopy }: any) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(textToCopy); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-all">
      {copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
    </button>
  );
};

export default function App() {
  const webhookUrls = ['...student-recommendations-v-a', '...student-recommendations-v-b'];
  const [selectedUrl, setSelectedUrl] = useState(webhookUrls[0]);
  const [payload, setPayload] = useState(initialJson);
  const [rawResponse, setRawResponse] = useState('');
  const [parsedResponse, setParsedResponse] = useState<any>(sampleResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('visual');

  const handlePayloadChange = (path: any[], value: any) => {
    setPayload((prev: any) => {
      const newPayload = JSON.parse(JSON.stringify(prev));
      let current = newPayload;
      for (let i = 0; i < path.length - 1; i++) { current = current[path[i]]; }
      current[path[path.length - 1]] = value;
      return newPayload;
    });
  };

  const addItem = (key: string) => {
    const newItem = key === 'attended_events' ? { id: `e${Date.now()}`, name: "New Event", problem_statement: {} } : { problem_statement_id: `p${Date.now()}`, title: "New Project", current_trl_level: 1, target_trl_level: 9 };
    setPayload((p: any) => ({ ...p, [key]: [...p[key], newItem] }));
  };

  const handleSubmit = async () => {
    setIsLoading(true); setRawResponse(''); setParsedResponse(null);
    try {
      const res = await fetch(selectedUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const text = await res.text();
      setRawResponse(text);
      try { setParsedResponse(JSON.parse(text)); setActiveTab('visual'); } catch (e) { setActiveTab('raw'); }
    } catch (e: any) { setRawResponse(e.message); setActiveTab('raw'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Visual Webhook POST Tool</h1>
          <p className="text-gray-600">Visually build and test your student data schema.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-indigo-900">
              <Server className="w-5 h-5 mr-2 text-indigo-600" /> Target Webhook URL
            </h2>
            <div className="flex space-x-4">
              {['v-a', 'v-b'].map((v, i) => (
                <label key={v} className={`flex-1 flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedUrl.includes(v) ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'border-gray-200 hover:border-indigo-300'}`}>
                  <input type="radio" checked={selectedUrl.includes(v)} onChange={() => setSelectedUrl(webhookUrls[i])} className="w-4 h-4 text-indigo-600" />
                  <span className="ml-3 text-sm font-medium text-gray-700">student-recommendations-{v}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-indigo-900">
              <FileJson className="w-5 h-5 mr-2 text-indigo-600" /> Load a Test Case
            </h2>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setPayload(initialJson)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Custom Input</button>
              {Object.keys(studentData).map(id => (
                <button key={id} onClick={() => setPayload(studentData[id])} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">{studentData[id].name}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-6 flex items-center text-gray-800"><User className="w-5 h-5 mr-2" /> Student Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label><input value={payload.student_id} onChange={e => handlePayloadChange(['student_id'], e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input value={payload.name} onChange={e => handlePayloadChange(['name'], e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Engineering Stream</label><input value={payload.engineering_stream} onChange={e => handlePayloadChange(['engineering_stream'], e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label><input type="number" value={payload.current_semester} onChange={e => handlePayloadChange(['current_semester'], parseInt(e.target.value) || 0)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-6 flex items-center text-gray-800"><Briefcase className="w-5 h-5 mr-2" /> Current Projects</h3>
              <div className="space-y-4">
                {payload.current_problem_statements.map((p: any, i: number) => (<EditableProjectCard key={i} project={p} index={i} onUpdate={handlePayloadChange} onRemove={() => setPayload((prev: any) => ({ ...prev, current_problem_statements: prev.current_problem_statements.filter((_: any, idx: number) => idx !== i) }))} />))}
                <button onClick={() => addItem('current_problem_statements')} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-indigo-600 hover:border-indigo-500 transition-all font-medium flex items-center justify-center"><PlusCircle className="w-4 h-4 mr-2" /> Add Project</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-6 flex items-center text-gray-800"><Award className="w-5 h-5 mr-2" /> Attended Events</h3>
              <div className="space-y-4">
                {payload.attended_events.map((e: any, i: number) => (<EditableEventCard key={i} event={e} index={i} onUpdate={handlePayloadChange} onRemove={() => setPayload((prev: any) => ({ ...prev, attended_events: prev.attended_events.filter((_: any, idx: number) => idx !== i) }))} />))}
                <button onClick={() => addItem('attended_events')} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-indigo-600 hover:border-indigo-500 transition-all font-medium flex items-center justify-center"><PlusCircle className="w-4 h-4 mr-2" /> Add Event</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg relative h-[400px]">
              <div className="p-4 border-b border-slate-700 flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">Live JSON Payload</div>
              <div className="p-4 font-mono text-xs text-amber-100/90 overflow-auto h-[calc(100%-3rem)]"><pre>{JSON.stringify(payload, null, 2)}</pre></div>
              <CopyButton textToCopy={JSON.stringify(payload, null, 2)} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] flex flex-col">
              <div className="flex border-b border-gray-200">
                <button onClick={() => setActiveTab('visual')} className={`px-6 py-4 text-sm font-semibold transition-all border-b-2 ${activeTab === 'visual' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Response Visualization</button>
                <button onClick={() => setActiveTab('raw')} className={`px-6 py-4 text-sm font-semibold transition-all border-b-2 ${activeTab === 'raw' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Raw Response</button>
              </div>
              <div className="p-6 flex-grow">
                {isLoading ? (<div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>) : activeTab === 'visual' ? (<ResponseUI data={parsedResponse} />) : (<div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto h-[300px]"><pre>{rawResponse || 'No response data yet.'}</pre></div>)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button onClick={handleSubmit} disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all font-bold flex items-center justify-center text-lg disabled:opacity-50">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Send className="w-5 h-5 mr-3" />}
            Send POST Request
          </button>
        </div>
      </div>
    </div>
  );
}
