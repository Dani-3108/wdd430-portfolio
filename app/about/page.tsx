import WorkTimeline from "@/components/WorkTimeline";
const jobs = [
    {
        role: "Business Development Representative (BDR)",
        company: "SpotOn",
        period: "September 2022 - January 2025"
    },
    {
        role: "Business Development Representative (BDR)",
        company: "UnitX",
        period: "January 2025 - January 2026"
    },
    {
        role: "Senior Business Development Representative (Senior BDR)",
        company: "UnitX",
        period: "January 2026 - Present"
    }
];

export default function About() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-gray-700">
                Hi, I'm Daniel, a 25-year-old from Mexico. I'm studying Software Development online at BYU-Idaho and work as a senior BDR at UnitX, selling AI vision systems for the manufacturing industry. I'm happily married to my amazing wife, Kenny. I love steak, good music, and spending time with my wife and family—traveling, shopping, watching movies, and going to concerts. My goal is to become an excellent software engineer specializing in AI for vision systems, always striving for growth and new challenges.
            </p>
            <WorkTimeline entries={jobs} />
        </main>
    );
}