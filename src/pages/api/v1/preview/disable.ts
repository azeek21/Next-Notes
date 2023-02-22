import { NextApiRequest, NextApiResponse } from "next";

// this disables preview mode
export default function handler( req: NextApiRequest, res: NextApiResponse ) {
    res.clearPreviewData();
    res.redirect('/')
    res.end("Preview mode disabled.");
}