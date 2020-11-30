const createResolver = (resolver) => {
    const baseResolver = resolver;
    baseResolver.createResolver = (childResolver) => {
        const newResolver = async (parent, args, context, info) => {
            await resolver(parent, args, context, info);
            return childResolver(parent, args, context, info);
        };
        return createResolver(newResolver);
    };
    return baseResolver;
};

// requiresAuth
const requiresAuth = createResolver((parent, args, context) => {
    // need to adjsut the context . extensions
    console.log('context', context)
    if (!context.user || !context.user.id) {
        throw new Error('Not authenticated');
    }
});

module.exports = requiresAuth;