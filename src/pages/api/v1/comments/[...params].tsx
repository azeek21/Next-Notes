import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const params = req.query?.params; // "params" refers to filename of current file.
    console.log(params)
    res.status(200).json(req.query.params)
}