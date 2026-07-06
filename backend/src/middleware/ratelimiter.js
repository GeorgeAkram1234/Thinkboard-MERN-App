import ratelimit from "../config/upstash.js"

const ratelimiter = async (req, res, next) => {


    try {
        const identifier = req.ip || req.headers["x-forwarded-for"] || "anonymous"
        const { success } = await ratelimit.limit(identifier) // while authentication then we put user id here

        if (!success) {
            return res.status(429).json({ message: "too many requests" })
        }
        next()

    } catch (error) {
        console.error("rate limit error", error);
        next(error)
    }

}

export default ratelimiter
