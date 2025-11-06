import { useMemo, useState } from 'react';

type Course = {
  id: string;
  title: string;
  tags: string[];
};

interface Props {
  courses: Course[];
}

const q1 = [
  { value: 'ai', label: 'AI / Data' },
  { value: 'iot', label: 'IoT / Hardware' },
  { value: 'cloud', label: 'Cloud / Security' },
  { value: 'green', label: 'Green Tech' },
  { value: 'automation', label: 'Automation / Manufacturing' },
  { value: 'biz', label: 'Business / Entrepreneurship' },
];

const q2 = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const q3 = [
  { value: 'build', label: 'Build things' },
  { value: 'analyze', label: 'Analyze data' },
  { value: 'secure', label: 'Secure systems' },
  { value: 'optimize', label: 'Optimize processes' },
  { value: 'lead', label: 'Lead projects/business' },
];

const CareerRecommendationWidget = ({ courses }: Props) => {
  const [answers, setAnswers] = useState<{ area?: string; level?: string; goal?: string }>({});

  const recommendations = useMemo(() => {
    const { area, level, goal } = answers;
    if (!area && !level && !goal) return [];

    const areaMap: Record<string, string[]> = {
      ai: ['AI', 'Data', 'ML'],
      iot: ['IoT', 'Embedded', 'Cloud'],
      cloud: ['Cloud', 'Security', 'DevSecOps'],
      green: ['Energy', 'Renewables', 'Sustainability'],
      automation: ['Automation', 'Robotics', 'Industry 4.0'],
      biz: ['Startup', 'Marketing', 'Finance'],
    };

    const goalMap: Record<string, string[]> = {
      build: ['IoT', 'Automation', 'Cloud'],
      analyze: ['AI', 'Data'],
      secure: ['Security', 'Cloud'],
      optimize: ['Automation', 'Industry 4.0'],
      lead: ['Startup', 'Marketing', 'Finance'],
    };

    const preferredTags = new Set([...(area ? areaMap[area] ?? [] : []), ...(goal ? goalMap[goal] ?? [] : [])]);

    return courses
      .map((c) => ({
        course: c,
        score:
          c.tags.reduce((acc, t) => acc + (preferredTags.has(t) ? 2 : 0), 0) +
          (level === 'beginner' && c.tags.includes('All levels') ? 1 : 0),
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.course);
  }, [answers, courses]);

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-card">
      <h3 className="text-xl font-bold mb-4">AI Career Recommendation</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Area</label>
          <div className="flex flex-wrap gap-2">
            {q1.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded-full border text-sm ${
                  answers.area === opt.value
                    ? 'bg-gradient-primary text-white border-transparent'
                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setAnswers((a) => ({ ...a, area: opt.value }))}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Current Level</label>
          <div className="flex flex-wrap gap-2">
            {q2.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded-full border text-sm ${
                  answers.level === opt.value
                    ? 'bg-gradient-primary text-white border-transparent'
                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setAnswers((a) => ({ ...a, level: opt.value }))}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Primary Goal</label>
          <div className="flex flex-wrap gap-2">
            {q3.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded-full border text-sm ${
                  answers.goal === opt.value
                    ? 'bg-gradient-primary text-white border-transparent'
                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setAnswers((a) => ({ ...a, goal: opt.value }))}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {recommendations.length > 0 ? (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Top matches for you:</p>
          <ul className="list-disc list-inside space-y-1">
            {recommendations.map((c) => (
              <li key={c.id} className="text-sm">
                <a href={`/course/${c.id}`} className="text-primary hover:underline">{c.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">Answer the questions to get tailored suggestions.</p>
      )}
    </div>
  );
};

export default CareerRecommendationWidget;


