interface TimelineEntry {
    role: string;
    company: string;
    period: string;
}

interface WorkTimelineProps {
    entries: TimelineEntry[];
}

export default function WorkTimeline({ entries }: WorkTimelineProps) {
    return (
        <ol className="border-l-2 border-blue-600 pl-6 space-y-6">
            {entries.map((entry) => (
                <li key={entry.period}>
                    <h4 className="text-lg font-bold">{entry.role}</h4>
                    <p className="text-gray-600">{entry.company}</p>
                    <p className="text-sm text-gray-500">{entry.period}</p>
                </li>
            ))}
        </ol>
    );
}