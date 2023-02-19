import { COMMENTS } from "@/data/comments";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        // handle get requests
        res.status(200).json(COMMENTS);
    } else if (req.method === "POST") {
        // handle post requests
        const comment = {...req.body.comment, id: COMMENTS[COMMENTS.length - 1].id + 1};
        COMMENTS.push(comment);
        res.status(201).json(comment);
    }
    res.status(400)
}