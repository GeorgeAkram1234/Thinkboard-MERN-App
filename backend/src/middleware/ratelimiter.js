import ratelimit from "../config/upstash.js"

const ratelimiter = async (req, res, next) => {


    try {
        const { success } = await ratelimit.limit("my-limit-key") // while authentication then we put user id here 

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