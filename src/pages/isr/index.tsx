type QuestionType= {
    category: string,
    id: string,
    correctAnswer: string,
    incorrectAnswers: string[],
    question: string,
    tags: string[],
    type: string,
    difficulty: string,
    regions: string[],
    isNiche: boolean
}


export default function Page({questions}: {questions: QuestionType[]}) {
    return (
        <>
        <h1>This page has ISG (incremental static generation) implemented</h1>
        <h2>Below data changes on every request, try by refreshing the page in your browser.</h2>
        <p>Below data is valid only for 1 second</p>
        <hr />
        <hr />
        {questions.length &&
            questions.map(q => <p key={q.id} >{q.id}: {q.question}</p>)
        }
        </>
        )
}

export async function getStaticProps() {
    const question: QuestionType[] = await (await fetch("https://the-trivia-api.com/api/questions/?limit=1")).json();
    return {
        props: {
            questions: question
        },
        revalidate: 1
    }
}
