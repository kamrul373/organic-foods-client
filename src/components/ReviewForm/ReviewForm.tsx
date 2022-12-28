import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import "./ReveiwForm.css"
type reviewType = {
    rating: number
}
const ReviewForm = () => {
    const [rating, setRating] = useState<number | null>(null);
    const handleReivew = (e: any) => {
        e.preventDefault();
        const reviwText = e.target.review.value
        console.log(reviwText)
        console.log(rating)
    }
    const handleRate = ({ rating }: reviewType) => {
        setRating(rating)
    }
    return (
        <div>
            <form onSubmit={handleReivew}>
                <div className="form-control">
                    <label className="label" htmlFor='review'>
                        <span className="label-text">Your Review</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Review" name="review" id='review'></textarea>
                    <Rater rating={0} total={5} onRate={handleRate} />
                    <input type="submit" value="Submit" className='btn btn-primary btn-wide text-white mt-4 hover:bg-secondary duration-500' />
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;