import React, { useState } from 'react';
import { Trash2, ChevronDown, PlusCircle, Briefcase, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRLProgressBar } from './Visualizers';

const FormInput = ({ label, value, onChange, placeholder, type = 'text' }: any) => (
    <div className="flex-1">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder || label}
            className="w-full px-4 py-2.5 glass-input rounded-xl text-sm placeholder-slate-600 focus:ring-1 focus:ring-indigo-500/50"
        />
    </div>
);

const FormTextArea = ({ label, value, onChange, placeholder, rows = 3 }: any) => (
    <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
        <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder || label}
            className="w-full px-4 py-3 glass-input rounded-xl text-sm placeholder-slate-600 focus:ring-1 focus:ring-indigo-500/50 resize-none"
        />
    </div>
);

export const EditableProjectCard = ({ project, index, onUpdate, onRemove }: any) => {
    const handleFieldChange = (field: string, value: any) => {
        onUpdate(['current_problem_statements', index, field], value);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 border border-slate-700/50 rounded-2xl bg-slate-800/20 relative group overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors"></div>
            <button
                onClick={onRemove}
                className="absolute top-4 right-4 text-slate-600 hover:text-rose-500 transition-colors p-2 bg-slate-900/50 rounded-lg"
            >
                <Trash2 size={16} />
            </button>
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Briefcase className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-slate-200">Project #{index + 1}</h4>
            </div>

            <div className="space-y-5">
                <FormInput label="Project Title" value={project.title} onChange={(e: any) => handleFieldChange('title', e.target.value)} />
                <FormTextArea label="Description" value={project.description} onChange={(e: any) => handleFieldChange('description', e.target.value)} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput label="Event Name" value={project.event_name} onChange={(e: any) => handleFieldChange('event_name', e.target.value)} />
                    <FormInput label="Your Role" value={project.student_role} onChange={(e: any) => handleFieldChange('student_role', e.target.value)} />
                    <FormInput label="Contribution Areas (comma-sep)" value={(project.contribution_areas || []).join(', ')} onChange={(e: any) => handleFieldChange('contribution_areas', e.target.value.split(',').map((t: string) => t.trim()))} />
                    <FormInput label="Progress Status" value={project.progress_status} onChange={(e: any) => handleFieldChange('progress_status', e.target.value)} />
                    <FormInput label="Start Date" type="date" value={project.start_date} onChange={(e: any) => handleFieldChange('start_date', e.target.value)} />
                    <FormInput label="Exp. Completion" type="date" value={project.expected_completion} onChange={(e: any) => handleFieldChange('expected_completion', e.target.value)} />
                </div>
                <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-700/30">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">TRL Advancement</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="number"
                                value={project.current_trl_level}
                                onChange={(e: any) => handleFieldChange('current_trl_level', parseInt(e.target.value) || 0)}
                                className="w-12 bg-transparent text-emerald-400 font-bold text-center focus:outline-none"
                            />
                            <span className="text-slate-600">→</span>
                            <input
                                type="number"
                                value={project.target_trl_level}
                                onChange={(e: any) => handleFieldChange('target_trl_level', parseInt(e.target.value) || 0)}
                                className="w-12 bg-transparent text-amber-400 font-bold text-center focus:outline-none"
                            />
                        </div>
                    </div>
                    <TRLProgressBar current={project.current_trl_level} target={project.target_trl_level} />
                </div>
            </div>
        </motion.div>
    );
};

export const EditableEventCard = ({ event, index, onUpdate, onRemove }: any) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleFieldChange = (path: string[], value: any) => {
        onUpdate(['attended_events', index, ...path], value);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border border-slate-700/50 rounded-2xl bg-slate-800/20 relative group overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 group-hover:bg-indigo-500 transition-colors"></div>
            <div className="p-5 flex justify-between items-center bg-slate-800/40 border-b border-slate-700/30">
                <div className="flex items-center space-x-3 flex-grow">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Award className="w-5 h-5 text-indigo-400" />
                    </div>
                    <input
                        value={event.name}
                        onChange={e => handleFieldChange(['name'], e.target.value)}
                        className="bg-transparent font-bold text-slate-200 focus:outline-none hover:bg-slate-700/30 rounded px-2 py-1 transition-all flex-grow"
                        placeholder="New Event Name"
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <button onClick={() => onRemove()} className="text-slate-600 hover:text-rose-500 transition-colors p-2 bg-slate-900/50 rounded-lg"><Trash2 size={16} /></button>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-500 hover:text-white transition-colors p-2"><ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} /></button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <FormInput label="Organizing Body" value={event.organizing_body} onChange={(e: any) => handleFieldChange(['organizing_body'], e.target.value)} />
                                <FormInput label="Event Type" value={event.event_type} onChange={(e: any) => handleFieldChange(['event_type'], e.target.value)} />
                            </div>
                            <FormTextArea label="Event Description" value={event.description} onChange={(e: any) => handleFieldChange(['description'], e.target.value)} />
                            <FormTextArea label="Problem Statement" value={event.problem_statement?.description} onChange={(e: any) => handleFieldChange(['problem_statement', 'description'], e.target.value)} />

                            <div className="p-6 border border-slate-700/50 rounded-2xl bg-slate-900/40 relative">
                                <div className="absolute top-0 right-0 p-3 flex flex-col items-end opacity-20 pointer-events-none">
                                    <span className="text-[32px] font-black text-slate-100 italic">IMPACT</span>
                                </div>
                                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[4px] mb-6 flex items-center">
                                    <div className="w-4 h-[1px] bg-indigo-500/50 mr-2"></div>
                                    Contribution Details
                                </h4>
                                <div className="space-y-5">
                                    <FormInput label="Role" value={event.student_contribution?.role} onChange={(e: any) => handleFieldChange(['student_contribution', 'role'], e.target.value)} />
                                    <FormTextArea label="Impact Summary" value={event.student_contribution?.contribution_description} onChange={(e: any) => handleFieldChange(['student_contribution', 'contribution_description'], e.target.value)} />
                                    <div className="grid grid-cols-1 gap-5">
                                        <FormInput label="Technologies (comma-sep)" value={(event.student_contribution?.technologies_used || []).join(', ')} onChange={(e: any) => handleFieldChange(['student_contribution', 'technologies_used'], e.target.value.split(',').map((t: any) => t.trim()))} />
                                        <FormInput label="Outcomes (comma-sep)" value={(event.student_contribution?.outcomes_achieved || []).join(', ')} onChange={(e: any) => handleFieldChange(['student_contribution', 'outcomes_achieved'], e.target.value.split(',').map((t: any) => t.trim()))} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
