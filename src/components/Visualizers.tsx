import React from 'react';
import { Star, BrainCircuit, Puzzle, DollarSign, Award } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="mt-4">
        <div className="flex items-center space-x-1">
            {Array.from({ length: 9 }, (_, i) => {
                const level = i + 1;
                let bgColor = 'bg-slate-700';
                if (level <= current) bgColor = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
                else if (level <= target) bgColor = 'bg-amber-400 bg-opacity-40 animate-pulse';

                return (
                    <div key={level} className="flex-1 group relative h-2">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className={`h-full rounded-full ${bgColor} transition-colors duration-500 origin-left`}
                        ></motion.div>
                        <div className="absolute bottom-full mb-3 w-48 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white text-xs rounded-lg py-2 px-3 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 shadow-xl backdrop-blur-md">
                            <span className="font-bold text-emerald-400 block mb-1">Level {level}</span>
                            {TRL_DESCRIPTIONS[i]}
                        </div>
                    </div>
                );
            })}
        </div>
        <div className="flex justify-between text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-2">
            <span>Discovery</span>
            <span>Deployment</span>
        </div>
    </div>
);

export const Tag = ({ children, icon: Icon, color = 'indigo' }: any) => {
    const colors: Record<string, string> = {
        indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
        green: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
        yellow: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
        blue: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
        rose: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    };

    return (
        <span className={`inline-flex items-center text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full border ${colors[color]} backdrop-blur-sm`}>
            {Icon && <Icon className="w-3 h-3 mr-1.5" />}
            {children}
        </span>
    );
};

export const RecommendationCard = ({ icon: Icon, item }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl shadow-lg backdrop-blur-xl hover:border-indigo-500/30 transition-all group"
    >
        <div className="flex items-start justify-between mb-3">
            <h4 className="font-bold text-slate-100 flex items-center text-lg leading-tight group-hover:text-indigo-400 transition-colors">
                <div className="p-2 bg-indigo-500/20 rounded-lg mr-3">
                    <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                {item.title || item.name || item.event_name}
            </h4>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{item.description}</p>
        <div className="flex flex-wrap items-center mb-4">
            {item.trl_support_range && <Tag icon={Star} color="yellow">TRL: {item.trl_support_range}</Tag>}
            {item.support_type && <Tag icon={Puzzle} color="blue">{item.support_type}</Tag>}
            {item.monetary_opportunity && <Tag icon={DollarSign} color="green">Funding</Tag>}
            {item.knowledge_domains && Object.values(item.knowledge_domains).map((kd: any) =>
                kd.domain && <Tag key={kd.domain} icon={BrainCircuit} color="rose">{kd.domain}</Tag>
            )}
        </div>
        {(item.reason || item.reasoning || item.reason_for_recommendation) && (
            <div className="bg-indigo-500/5 border-l-2 border-indigo-500/30 p-3 rounded-r-xl">
                <p className="text-xs text-slate-400 italic">
                    <span className="font-bold text-indigo-400 not-italic uppercase tracking-tighter mr-1">Rationale:</span>
                    {item.reason || item.reasoning || item.reason_for_recommendation}
                </p>
            </div>
        )}
    </motion.div>
);

export const ResponseUI = ({ data }: { data: any[] }) => {
    if (!data || data.length === 0) {
        return <div className="text-center text-slate-500 py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">No valid recommendation data found.</div>;
    }

    return (
        <div className="space-y-10">
            {data.map((block, index) => (
                <div key={block.recommendation_type || index} className="animate-fade-in-down">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="h-8 w-1 bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]"></div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 capitalize">
                            {block.recommendation_type.replace(/_/g, ' ')}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                        {block.recommended_events?.map((item: any, eventIndex: number) => (
                            <RecommendationCard key={eventIndex} icon={Award} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
