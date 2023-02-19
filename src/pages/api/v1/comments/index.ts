import { COMMENTS } from "@/data/comments";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    setTimeout(() => {
        res.status(200).json(COMMENTS);
    }, 1000);
}