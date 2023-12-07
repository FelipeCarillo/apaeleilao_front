import Footer from "../../components/Footer";
import NavbarAdmin from "../../components/NavbarAdmin";
import { useEffect, useState } from "react";
import MediaFeed from "../../components/MediaFeed";
import FeedbackCard from "../../components/FeedbackCard";
import { ToastContainer, toast } from 'react-toastify';

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [mean, setMean] = useState([]);
    const [total, setTotal] = useState([]);
    useEffect(() => {
        fetch (process.env.REACT_APP_API + "/get-all-feedbacks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token"),
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then((data) => {
            setFeedbacks(data.body.feedbacks);
            setMean(data.body.mean_feedback);
            setTotal(data.body.total_feedbacks);
        }).catch(error => {
            // 3. get error messages, if any
            error.json().then((json: any) => {
                toast.error(json.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
        });
    }, []);

    return (
        <>
        <NavbarAdmin pag={'feedback'}/>

        <main>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <div className="mt-10 flex felx-col justify-between mx-96 mb-10">
                <div className="text-center">
                    <p className="text-3xl mb-2">Média de Avalição do site</p>
                    <MediaFeed data={mean}/>
                </div>
                <div className="text-center">
                    <p className="text-3xl mb-2">Número total de Avaliações</p>
                    <div className="pt-5">
                        <p className="text-2xl">{total}</p>
                    </div>
                </div>
            </div>
            {/* Emails */}
            <div className="w-[90%] mx-auto mb-5">
                <div className="grid grid-cols-2 gap-5">
                    <FeedbackCard data={feedbacks}/>
                </div>
            </div>
        </main>

        <Footer />
        </>
    )
}