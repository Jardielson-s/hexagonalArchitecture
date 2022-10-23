import Joi from 'joi'

const validator = Joi.object({
    EXPRESS_PORT: Joi.required(),
}).options({ abortEarly: false })

const valid = validator.validate({
    EXPRESS_PORT: process.env.EXPRESS_PORT,
})

if (valid.error) {
    throw new Error(valid.error.message)
} else {
    console.log(valid.value)
}

const envs = (env: string): string | undefined => {
    if (process.env[env]) return process.env[env]
    throw new Error(`${env} not found`)
}

export default {
    EXPRESS_PORT: envs('EXPRESS_PORT'),
}
