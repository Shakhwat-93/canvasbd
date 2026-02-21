import { services as staticServices } from '../data/services';

export default function PricingExtraTables() {
    const { oneTime, bulk } = staticServices;

    return (
        <div className="w-full mt-12 mb-16" data-animate>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ONE-TIME SERVICES PACKAGE */}
                <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2.5rem' }}>
                    <div className="pricing-card-caption text-center" style={{ width: '100%', marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {oneTime.title}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="pb-6 px-4 text-white/50 font-medium text-xs tracking-[0.15em] uppercase w-[35%]">Service Item</th>
                                    <th className="pb-6 px-4 text-white/50 font-medium text-xs tracking-[0.15em] uppercase w-[25%]">Pricing (BDT)</th>
                                    <th className="pb-6 px-4 text-white/50 font-medium text-xs tracking-[0.15em] uppercase w-[40%]">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {oneTime.items.map((item, idx) => (
                                    <tr key={idx} className="border-b border-white/5 last:border-none transition-colors hover:bg-white/5">
                                        <td className="py-6 px-4 font-semibold text-white/90 text-[15px] leading-relaxed flex items-start gap-4">
                                            <div className="w-5 h-5 min-w-[20px] mt-0.5 mix-blend-screen overflow-hidden flex items-center justify-center">
                                                <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="" className="w-4 h-4 object-contain brightness-200" />
                                            </div>
                                            {item.name}
                                        </td>
                                        <td className="py-6 px-4 font-bold text-white text-lg tracking-wide">
                                            {item.price}
                                        </td>
                                        <td className="py-6 px-4 text-white/60 text-[14px] leading-relaxed">
                                            {item.remarks}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* BULK VIDEO PRODUCTION */}
                <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2.5rem' }}>
                    <div className="pricing-card-caption text-center" style={{ width: '100%', marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {bulk.title}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="pb-6 px-4 text-white/50 font-medium text-xs tracking-[0.15em] uppercase w-[35%]">Service Item</th>
                                    <th className="pb-6 px-4 text-white/50 font-medium text-xs tracking-[0.15em] uppercase w-[30%]">Pricing<br /><span className="text-[10px] opacity-70 mt-1 block">WITH MODEL</span></th>
                                    <th className="pb-6 px-4 text-white/50 font-medium text-xs tracking-[0.15em] uppercase w-[35%]">Pricing<br /><span className="text-[10px] opacity-70 mt-1 block leading-tight">SPECIAL EDIT WITH<br />MOTION GRAPHICS</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bulk.items.map((item, idx) => (
                                    <tr key={idx} className="border-b border-white/5 last:border-none transition-colors hover:bg-white/5">
                                        <td className="py-6 px-4 font-semibold text-white/90 text-[15px] leading-relaxed flex items-start gap-4 uppercase">
                                            <div className="w-5 h-5 min-w-[20px] mt-0.5 mix-blend-screen overflow-hidden flex items-center justify-center">
                                                <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="" className="w-4 h-4 object-contain brightness-200" />
                                            </div>
                                            {item.quantity}
                                        </td>
                                        <td className="py-6 px-4 font-bold text-white text-lg tracking-wide">
                                            {item.priceModel}
                                        </td>
                                        <td className="py-6 px-4 font-bold text-white text-lg tracking-wide">
                                            {item.priceMotion}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
