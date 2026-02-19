import { Check, X } from 'lucide-react';
import clsx from 'clsx';

export default function ServiceCard({ tier, recommended = false }) {
    return (
        <div className={clsx(
            "relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col h-full transition-all duration-300 hover:shadow-xl",
            recommended ? "border-blue-600 ring-2 ring-blue-600 ring-opacity-50 scale-105 z-10" : "border-gray-200 hover:border-blue-300"
        )}>
            {recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{tier.idealFor}</p>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                    {tier.frequency && <span className="ml-2 text-gray-500 text-sm">{tier.frequency}</span>}
                </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                ))}
            </ul>

            <button className={clsx(
                "w-full py-3 px-4 rounded-xl font-medium transition-colors duration-200",
                recommended
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                    : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
            )}>
                Choose {tier.name}
            </button>
        </div>
    );
}
