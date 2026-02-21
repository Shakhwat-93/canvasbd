export const services = {
    general: {
        title: "General Business Subscription",
        target: "General businesses and solo creators",
        tiers: [
            {
                name: "Starter (Basic)",
                price: "20,000 BDT",
                frequency: "per month",
                idealFor: "Best for solo creators",
                features: [
                    "4 Video Content",
                    "05 Social Media Posts",
                    "10 product photography",
                    "Content Scripting",
                    "Facebook marketing",
                    "Strategy+Placement"
                ]
            },
            {
                name: "Standard (Growth)",
                price: "40,000 BDT",
                frequency: "per month",
                idealFor: "Best for solo creators",
                features: [
                    "8 Video Content",
                    "08 Social Media Posts",
                    "15 product photography",
                    "Website- Standard WordPress Site",
                    "Full Scripting + Planning",
                    "Facebook marketing"
                ]
            },
            {
                name: "Professional (Elite)",
                price: "60,000 BDT",
                frequency: "per month",
                idealFor: "Most popular plan",
                features: [
                    "12 Premium Cinematic Videos",
                    "10 High-End Branded Posts",
                    "20 product photography",
                    "Website - Pro Site + Appnt System",
                    "Facebook marketing",
                    "Market research and competitor analysis",
                    "Full Scripting + Planning"
                ]
            }
        ],
        notes: [
            "Domain and hosting costs are not included.",
            "Facebook ad budget (dollars) is not included in the package.",
            "The shoot will be completed in one day (maximum two days).",
            "For outdoor shoots, an additional 2,000 BDT will be charged each time."
        ]
    },
    oneTime: {
        title: "ONE-TIME SERVICES PACKAGE",
        items: [
            { name: "WordPress Website (General)", price: "15,000", remarks: "Development only (Domain/Hosting excluded)" },
            { name: "High-Quality Cinematic Video", price: "8,000", remarks: "1 Min duration, special edits & model included" },
            { name: "Average Corporate/Product Video", price: "6,000", remarks: "Professional shoot with model" },
            { name: "Motion Graphics Video", price: "5,000", remarks: "40 Seconds duration" },
            { name: "Product Photography", price: "200 / Photo", remarks: "Min. 10 products (includes retouching)" }
        ],
        notes: [
            "The shoot will be completed in one day.",
            "For outdoor shoots, an additional 2,000 BDT will be charged each time."
        ]
    },
    bulk: {
        title: "BULK VIDEO PRODUCTION",
        items: [
            { quantity: "2 VIDEOS", priceModel: "5,500/ Unit", priceMotion: "7,500/ Unit" },
            { quantity: "3-5 VIDEOS", priceModel: "5,000 / Unit", priceMotion: "7,000/ Unit" },
            { quantity: "6-8 VIDEOS", priceModel: "4,500 / Unit", priceMotion: "6,500/ Unit" },
            { quantity: "8-10 VIDEOS", priceModel: "4,000 / Unit", priceMotion: "6,000/ Unit" },
            { quantity: "10+ VIDEOS", priceModel: "UPON DISCUSSION", priceMotion: "UPON DISCUSSION" }
        ],
        notes: [
            "The shoot will be completed in one day.",
            "For outdoor shoots, an additional 2,000 BDT will be charged each time."
        ]
    },
    personal: {
        title: "Personal Branding Subscriptions",
        target: "Doctors, Lawyers, Business Man and other professions",
        tiers: [
            {
                name: "Starter (Basic)",
                price: "15,000 BDT",
                frequency: "per month",
                idealFor: "Best for solo creators",
                features: [
                    "3 Video Contents",
                    "5 Social Media Posts",
                    "3 Professional Photoshoot",
                    "Local SEO (GBP)",
                    "Concept Development, Scripting, and Planning",
                    "Monthly update"
                ]
            },
            {
                name: "Standard (Growth)",
                price: "30,000 BDT",
                frequency: "per month",
                idealFor: "Best for solo creators",
                features: [
                    "6 Video Contents",
                    "10 Social Media Posts",
                    "5 Professional Photoshoot",
                    "Website",
                    "On-Page + Technical SEO",
                    "FB Management support",
                    "Concept Development, Scripting, and Planning"
                ]
            },
            {
                name: "Professional (Elite)",
                price: "50,000 BDT",
                frequency: "per month",
                idealFor: "Most popular plan",
                features: [
                    "10 Premium Cinematic Videos",
                    "12 High-End Branded Posts",
                    "10 Professional Photoshoot",
                    "Website",
                    "Full SEO",
                    "Full 360 Branding",
                    "Priority (24/7 Support)",
                    "FB Management support"
                ]
            }
        ],
        notes: [
            "Domain and hosting costs are not included.",
            "Facebook ad budget (dollars) is not included in the package.",
            "The shoot will be completed in one day (maximum two days).",
            "For outdoor shoots, an additional 2,000 BDT will be charged each time."
        ]
    }
};
