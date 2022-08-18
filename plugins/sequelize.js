const fp = require('fastify-plugin')
const Sequelize = require('sequelize')


function plugin (fastify, options) {
    const instance = options.instance || 'sequelize'
    const autoConnect = options.autoConnect || true
    const PG_URI = process.env.PG_URI || null;

    delete options.instance
    delete options.autoConnect

    const sequelize = new Sequelize(PG_URI, {
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true
            },
            native: true
        },
        // pool configuration used to pool database connections
        pool: {
            max: 50,
            idle: 0,
            acquire: 0,
        },
    })

    if (autoConnect) {
        return sequelize.authenticate().then(decorate)
    }

    decorate()

    return Promise.resolve()

    function decorate () {
        fastify.decorate(instance, sequelize)
        fastify.addHook('onClose', (fastifyInstance, done) => {
            sequelize.close()
                .then(done)
                .catch(done)
        })
    }
}

module.exports = fp(plugin)