import { ReactElement } from "react";
import NavBar from "./NavBar";

interface PageProps {
    content: ReactElement
    selected: string;
}

export default function Page(props: PageProps) {
    return (
        <div id="page">
            <div id='header' className='center'>
                <div id='title'>
                    <h3>art<br/>of</h3>
                    <h1>alaina sang</h1>
                </div>
                <NavBar selected={props.selected}/>
            </div>
            <div id="page-content">
                {props.content}
            </div>
            <hr />
            <p className='center'>&#169; 2023 Alaina Sang</p>
        </div>
    )
}