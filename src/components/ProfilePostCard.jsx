import {Button, Col, Image, Row} from "react-bootstrap";
import PROFILE_IMG from '../assets/Joy-InsideOut.jpg'
import {useEffect, useState} from "react";

export default function ProfilePostCard({content, postId}){
    const [likes, setLikes]=useState(0);

useEffect(()=>{
    fetch(
        `https://ab4abb9c-ad0f-40a9-92e4-1ddb84fa8a30-00-3je3dj44orsgp.sisko.replit.dev/likes/post/${postId}`
    )
    .then((response)=>response.json())  
    .then((data)=>setLikes(data.length))
    .catch((error)=>console.error("Error:",error));
},[postId]);
    return (
        <Row
        className="p-3"
        style={{
            borderTop: "1px solid #D3D3D3",
            borderBottom: "1px solid #D3D3D3"
        }}
    >
        <Col sm={1}>
            <Image src={PROFILE_IMG} fluid roundedCircle />
        </Col>

        <Col>
        <strong>Lynn</strong>
        <span> @lynn.lynn . Apr 16</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between">
            <Button variant="light">
            <i className="bi bi-chat"></i>
            </Button>
            <Button variant="light">
                <i className="bi bi-repeat"></i>
            </Button>
            <Button variant="light">
                <i className="bi bi-heart" >{likes}</i>
            </Button>
            <Button variant="light">
                <i className="bi bi-graph-up"></i>
            </Button>
            <Button variant="light">
                <i className="bi bi-upload"></i>
            </Button>
        </div>
        </Col>
    </Row>
)
}