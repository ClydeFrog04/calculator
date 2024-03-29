/**
 * @author Randi Egan
 * this file defines the look and function of a button in our calculator
 */
import React, {PropsWithChildren} from "react";
import "./Button.css";
interface ButtonProps{
    text: string;
    onClick?: (e: React.MouseEvent) => void;
    id?: string;
    class?: string;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
    const TAG = "[Button.tsx]";
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        // console.log(TAG, props.text, "clicked!");
        // console.log(TAG, "value:", target.value);

        if(props.onClick !== undefined){
            props.onClick(e);
        }
    }

    return (
        <button data-testid={`${props.id}Button`} id={props.id ? props.id : undefined} className={`button ${props.class ? props.class : ""}`.trim()} value={props.text} onClick={handleClick}>
            {props.text}
        </button>
    );

};


export default Button;
