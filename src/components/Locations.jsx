import { MapPin, Phone, Mail } from 'lucide-react';
import { companyDetails } from '../data/company';

export default function Locations() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Offices</h2>
                    <p className="text-lg text-gray-600">We have multiple locations to serve you better.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Pallabi Office */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{companyDetails.locations.pallabi.name}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {companyDetails.locations.pallabi.address}
                        </p>
                    </div>

                    {/* Uttara Office */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{companyDetails.locations.uttara.name}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {companyDetails.locations.uttara.address}
                        </p>
                    </div>

                    {/* Factory */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{companyDetails.locations.factory.name}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {companyDetails.locations.factory.address}
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">Prefer to call or email?</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                        <a href={`tel:${companyDetails.phone[0]}`} className="flex items-center text-gray-900 font-medium hover:text-blue-600 transition-colors">
                            <Phone className="mr-2 h-5 w-5 text-gray-400" />
                            {companyDetails.phone[0]}
                        </a>
                        <a href={`mailto:${companyDetails.email}`} className="flex items-center text-gray-900 font-medium hover:text-blue-600 transition-colors">
                            <Mail className="mr-2 h-5 w-5 text-gray-400" />
                            {companyDetails.email}
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
