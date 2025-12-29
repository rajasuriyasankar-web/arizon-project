const FeaturesSection = () => {
    const features = [
        {
            image: '/assets/feature_delivery.png',
            title: 'Super-Fast, Hassle Free Delivery',
            description: 'Deliveries within 1-3 days, with all sea & duties paid within Canada. The price you see online is the price you pay.',
        },
        {
            image: '/assets/feature_service.png',
            title: 'Unrivalled Customer Service',
            description: 'With over 75 years industry experience, you can trust Quality Bearings Online.',
        },
        {
            image: '/assets/feature_award.png',
            title: 'Multi-Award-Winning',
            description: 'Winners Of The Queen\'s Award For Enterprise For International Trade 2023 | Lloyds Bank Employer Of The Year.',
        },
        {
            image: '/assets/feature_warranty.png',
            title: 'World Renowned Brands',
            description: 'Quality verified products from the world\'s leading brands such as SKF, Kluber, Timken, FAG and many more.',
        },
    ];

    return (
        <section className="bg-white py-12 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-navy mb-12">
                    Industry Leading Bearings Supplier
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="h-32 w-auto object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-navy mb-3">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
