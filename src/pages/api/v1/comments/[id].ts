import { COMMENTS } from "@/data/comments";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (req.method === "GET") {
        if (id && +id < COMMENTS[COMMENTS.length - 1].id) {
            const comment = COMMENTS.find((comment) => comment.id === +id)
            res.status(200).json(comment);
        } else {
            res.status(404).send({id: 404, text: "NOT FOUND !"})
        }
    } else if ( req.method === "DELETE" ) {
        if (id) {
            let deleted = {};
            const index = COMMENTS.findIndex(c => c.id === +id);

            if (index != -1) {
                deleted = COMMENTS.splice(index, 1);
            }
            res.status(200).json(deleted);
        }
    } else if ( req.method === "PATCH" ) {
        console.log(JSON.parse(req.body).text);
        if (id) {
            COMMENTS[COMMENTS.findIndex(c => c.id === +id)].text = JSON.parse(req.body).text;
            res.status(200).json(COMMENTS.find(c => c.id === +id));
        }
    }
}