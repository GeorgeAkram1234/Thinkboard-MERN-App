import ratelimit from "../config/upstash.js"

const ratelimiter = async (req, res, next) => {


    try {
        const forwardedFor = req.headers["x-forwarded-for"]
        const identifier =
            req.headers["cf-connecting-ip"] ||
            req.headers["x-real-ip"] ||
            (typeof forwardedFor === "string" ? forwardedFor.split(",")[0].trim() : null) ||
            req.ip ||
            "anonymous"

        const { success, limit, remaining, reset } = await ratelimit.limit(identifier) // while authentication then we put user id here

        res.setHeader("X-RateLimit-Limit", limit)
        res.setHeader("X-RateLimit-Remaining", remaining)
        res.setHeader("X-RateLimit-Reset", reset)

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
