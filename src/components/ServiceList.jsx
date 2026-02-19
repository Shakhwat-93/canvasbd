import { ArrowRight } from 'lucide-react';

export default function ServiceList({ title, items, notes }) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-8 md:p-10 bg-gray-50 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            </div>

            <div className="p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="mb-2 sm:mb-0">
                                <span className="text-base font-medium text-gray-900 block">
                                    {item.name || item.quantity}
                                </span>
                                {(item.remarks) && (
                                    <span className="text-sm text-gray-500 block mt-1">{item.remarks}</span>
                                )}
                            </div>
                            <div className="text-right">
                                {item.price && (
                                    <span className="text-lg font-bold text-blue-600 block">{item.price}</span>
                                )}
                                {item.priceModel && (
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm text-gray-500">Model: <strong className="text-gray-900">{item.priceModel}</strong></span>
                                        <span className="text-sm text-gray-500">Motion: <strong className="text-gray-900">{item.priceMotion}</strong></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {notes && notes.length > 0 && (
                    <div className="mt-10 bg-blue-50 rounded-xl p-6">
                        <h4 className="text-sm font-semibold text-blue-800 mb-3 uppercase tracking-wider">Note</h4>
                        <ul className="space-y-2">
                            {notes.map((note, idx) => (
                                <li key={idx} className="flex items-start text-sm text-blue-700">
                                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 opacity-70" />
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
