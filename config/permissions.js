const createResolver = (resolver) => {
    console.log('hit dat', resolver)
    const baseResolver = resolver;
    baseResolver.createResolver = (childResolver) => {
        const newResolver = async (parent, args, context, info) => {
            console.log('newResolver', parent, args, context)
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
    console.log('check user', !!context.mongo.Users)
    // console.log('check user')
    if (!context.mongo.Users) {
        throw new Error('Not authenticated');
    }

});

module.exports = requiresAuth;