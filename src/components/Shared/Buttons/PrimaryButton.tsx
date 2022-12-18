import React from 'react';
type ButtonProps = {
    text: string
}
const PrimaryButton = (props: ButtonProps) => {
    return (
        <button className='btn btn-primary hover:bg-secondary duration-300 text-white font-bold border-none px-10'>{props.text}</button>
    );
};

export default PrimaryButton;