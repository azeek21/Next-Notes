import { NextApiRequest, NextApiResponse } from "next";

// this set's the cookies and enables preview mode;
export default function handler (req: NextApiRequest, res: NextApiResponse) {
    res.setPreviewData({user: "Azeek"})
    if (typeof(req.query.redirect) == "string") {
        res.redirect(req.query.redirect)
    } else {
        res.end("No redirect found...")
    }
}