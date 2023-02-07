// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Answer = {
  id: number,
  answer: string,
}

type Question = {
  id: number,
  question: string,
  multiple_answers: boolean,
  answers: Array<Answer>,
  correct_answers?: number[] | null
}

type Data = {
  questions: Array<Question>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(
    {
      questions: [
        {
          id: 1,
          question: 'A question here',
          multiple_answers: true,
          answers : [
            {
              id: 1,
              answer: 'Answer with id 1'
            },
            {
              id: 2,
              answer: 'Answer with id 2'
            },
          ],
          correct_answers: [1,2]
        }
      ]
    }
  )
}

