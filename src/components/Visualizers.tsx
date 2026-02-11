import { Star, Puzzle, DollarSign, Award } from 'lucide-react';

export const Tag = ({ children, icon: Icon, color = 'indigo' }: any) => {
    const colors: Record<string, string> = {
        indigo: 'bg-indigo-100 text-indigo-800',
        green: 'bg-green-100 text-green-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        blue: 'bg-blue-100 text-blue-800',
    };
    return (
        <span className={`inline-flex items-center text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full ${colors[color]}`}>
            {Icon && <Icon className="w-3 h-3 mr-1.5" />}
            {children}
        </span>
    );
};

export const RecommendationCard = ({ icon: Icon, item }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-4">
        <h4 className="font-bold text-gray-800 flex items-center mb-3">
            <Icon className="w-5 h-5 mr-3 text-indigo-600" />
            {item.title || item.name || item.event_name}
        </h4>
        {item.description && <p className="text-sm text-gray-600 mb-4 leading-relaxed">{item.description}</p>}
        <div className="flex flex-wrap items-center mb-4">
            {item.trl_support_range && <Tag icon={Star} color="yellow">TRL: {item.trl_support_range}</Tag>}
            {item.support_type && <Tag icon={Puzzle} color="blue">{item.support_type}</Tag>}
            {item.monetary_opportunity && <Tag icon={DollarSign} color="green">Funding</Tag>}
            {item.knowledge_domains && Object.values(item.knowledge_domains).map((kd: any) =>
                kd.domain && <Tag key={kd.domain} color="blue">{kd.domain}</Tag>
            )}
        </div>
        {(item.reason || item.reasoning || item.reason_for_recommendation) && (
            <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 break-words">
                    <span className="font-semibold text-gray-700">Reason:</span> {item.reason || item.reasoning || item.reason_for_recommendation}
                </p>
            </div>
        )}
    </div>
);

export const ResponseUI = ({ data }: { data: any[] }) => {
    if (!data || data.length === 0) {
        return <div className="text-center text-gray-500 pt-10">No valid recommendation data found.</div>;
    }

    return (
        <div className="space-y-8">
            {data.map((block, index) => (
                <div key={block.recommendation_type || index}>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize">
                        {block.recommendation_type.replace(/_/g, ' ')}
                    </h2>
                    <div className="space-y-4">
                        {block.recommended_events?.map((item: any, eventIndex: number) => (
                            <RecommendationCard key={eventIndex} icon={Award} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
