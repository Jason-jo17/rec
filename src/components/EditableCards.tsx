import { useState } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TRL_DESCRIPTIONS = [
    "1: Basic principles observed",
    "2: Technology concept formulated",
    "3: Experimental proof of concept",
    "4: Technology validated in lab",
    "5: Technology validated in relevant environment",
    "6: Technology demonstrated in relevant environment",
    "7: System prototype demonstration",
    "8: System complete and qualified",
    "9: Actual system proven"
];

export const TRLProgressBar = ({ current, target }: { current: number; target: number }) => (
    <div className="mt-2">
        <div className="flex items-center space-x-1">
            {Array.from({ length: 9 }, (_, i) => {
                const level = i + 1;
                let bgColor = 'bg-gray-200';
                if (level <= current) bgColor = 'bg-green-500';
                else if (level === target) bgColor = 'bg-yellow-400 animate-pulse';
                return (
                    <div key={level} className="flex-1 group relative">
                        <div className={`h-2 rounded-full ${bgColor} transition-colors duration-500`}></div>
                        <div className="absolute bottom-full mb-2 w-48 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] rounded py-1 px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">{TRL_DESCRIPTIONS[i]}</div>
                    </div>
                );
            })}
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>TRL 1</span><span>TRL 9</span>
        </div>
    </div>
);

const FormInput = ({ label, value, onChange, placeholder, type = 'text' }: any) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder || label}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
    </div>
);

const FormTextArea = ({ label, value, onChange, placeholder, rows = 3 }: any) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder || label}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
    </div>
);

export const EditableProjectCard = ({ project, index, onUpdate, onRemove }: any) => {
    const handleFieldChange = (field: string, value: any) => {
        onUpdate(['current_problem_statements', index, field], value);
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative space-y-4">
            <button onClick={onRemove} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            <FormInput label="Project Title" value={project.title} onChange={(e: any) => handleFieldChange('title', e.target.value)} />
            <FormTextArea label="Description" value={project.description} onChange={(e: any) => handleFieldChange('description', e.target.value)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Event Name" value={project.event_name} onChange={(e: any) => handleFieldChange('event_name', e.target.value)} />
                <FormInput label="Your Role" value={project.student_role} onChange={(e: any) => handleFieldChange('student_role', e.target.value)} />
                <FormInput label="Contribution Areas (comma-sep)" value={(project.contribution_areas || []).join(', ')} onChange={(e: any) => handleFieldChange('contribution_areas', e.target.value.split(',').map((t: string) => t.trim()))} />
                <FormInput label="Progress Status" value={project.progress_status} onChange={(e: any) => handleFieldChange('progress_status', e.target.value)} />
                <FormInput label="Start Date" type="date" value={project.start_date} onChange={(e: any) => handleFieldChange('start_date', e.target.value)} />
                <FormInput label="Exp. Completion" type="date" value={project.expected_completion} onChange={(e: any) => handleFieldChange('expected_completion', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Technology Readiness Level (TRL)</label>
                <div className="flex items-center gap-4 mt-1">
                    <div className="flex-1"><FormInput label="Current" type="number" value={project.current_trl_level} onChange={(e: any) => handleFieldChange('current_trl_level', parseInt(e.target.value) || 0)} /></div>
                    <div className="flex-1"><FormInput label="Target" type="number" value={project.target_trl_level} onChange={(e: any) => handleFieldChange('target_trl_level', parseInt(e.target.value) || 0)} /></div>
                </div>
                <TRLProgressBar current={project.current_trl_level} target={project.target_trl_level} />
            </div>
        </div>
    );
};

export const EditableEventCard = ({ event, index, onUpdate, onRemove }: any) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleFieldChange = (path: string[], value: any) => {
        onUpdate(['attended_events', index, ...path], value);
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <FormInput label="Event Name" value={event.name} onChange={(e: any) => handleFieldChange(['name'], e.target.value)} />
                </div>
                <div className="flex items-center ml-4 mt-6">
                    <button onClick={() => onRemove()} className="text-gray-400 hover:text-red-500 mr-2"><Trash2 size={16} /></button>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="p-1"><ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} /></button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4 space-y-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput label="Organizing Body" value={event.organizing_body} onChange={(e: any) => handleFieldChange(['organizing_body'], e.target.value)} />
                            <FormInput label="Event Type" value={event.event_type} onChange={(e: any) => handleFieldChange(['event_type'], e.target.value)} />
                        </div>
                        <FormTextArea label="Event Description" value={event.description} onChange={(e: any) => handleFieldChange(['description'], e.target.value)} />
                        <FormTextArea label="Problem Statement" value={event.problem_statement?.description} onChange={(e: any) => handleFieldChange(['problem_statement', 'description'], e.target.value)} />

                        <div className="p-4 border border-gray-200 rounded-md bg-white">
                            <h4 className="text-md font-semibold text-gray-800 mb-3">Your Contribution</h4>
                            <div className="space-y-4">
                                <FormInput label="Role" value={event.student_contribution?.role} onChange={(e: any) => handleFieldChange(['student_contribution', 'role'], e.target.value)} />
                                <FormTextArea label="Contribution Description" value={event.student_contribution?.contribution_description} onChange={(e: any) => handleFieldChange(['student_contribution', 'contribution_description'], e.target.value)} />
                                <FormInput label="Technologies (comma-sep)" value={(event.student_contribution?.technologies_used || []).join(', ')} onChange={(e: any) => handleFieldChange(['student_contribution', 'technologies_used'], e.target.value.split(',').map((t: any) => t.trim()))} />
                                <FormInput label="Outcomes (comma-sep)" value={(event.student_contribution?.outcomes_achieved || []).join(', ')} onChange={(e: any) => handleFieldChange(['student_contribution', 'outcomes_achieved'], e.target.value.split(',').map((t: any) => t.trim()))} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
