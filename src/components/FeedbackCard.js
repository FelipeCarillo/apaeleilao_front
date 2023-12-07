export default function FeedbackCard({data}) {
    function convertData (data) {
        var date = new Date(data*1000);
        return date.toLocaleDateString();
    }
    return (
        <>
        {data.map((feedback) => {
            return (
                <div className="text-center">
                    <div className="border-2 border-black rounded-xl py-2 px-6 text-center h-[200px]">
                        <div className="flex felx-col justify-between">
                            <p className="text-lg mb-5">{convertData(feedback.created_at)}</p>
                            <p className="text-lg underline mb-5">{feedback.email}</p>
                            <p className="text-lg mb-5">Nota: {feedback.grade} <i className="fa-solid fa-star text-xl text-yellow-300"></i></p>
                        </div>
                        <p>{feedback.content}</p>
                    </div>
                </div>
            )
        })}
        </>
    )
}