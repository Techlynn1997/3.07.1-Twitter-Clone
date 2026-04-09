import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {Button, Col, Image, Row} from "react-bootstrap";
import PROFILE_IMG from '../assets/Joy-InsideOut.jpg'
import {useEffect, useState} from "react";

export default function ProfilePostCard({content, postId}) {
    const [likes, setLikes]=useState([]);

//Decoding to get the userId
const token=localStorage.getItem("authToken");
const decode=jwtDecode(token)
const userId=decode.id;

const BASE_URL= "https://ab4abb9c-ad0f-40a9-92e4-1ddb84fa8a30-00-3je3dj44orsgp.sisko.replit.dev";

useEffect(()=>{
    fetch(`${BASE_URL}/likes/post/${postId}`)
    .then((response)=>response.json())
    .then((data)=>setLikes(data))
    .catch((error)=>console.error("Error:", error));
},[postId]);

const isLiked=likes.some((like)=>like.user_id===userId);
console.log(likes);

const handleLike=()=>(isLiked? removeFromLikes():addToLikes());

const addToLikes=()=>{
    axios.post(`${BASE_URL}/likes`,{
        user_id:userId,
        post_id:postId,
    })
    .then((response)=>{
        setLikes([...likes,{...response.data,likes_id: response.data.id}])
    })
    .catch((error)=>console.error("Error:", error))
}

const removeFromLikes=()=>{
const like=likes.find((like)=>like.user_id===userId);
if (like) {
    axios
    .put(`${BASE_URL}/likes/${userId}/${postId}`) //Include userId and postId in the URL
    .then(()=>{
        //update the state to reflect the removal of the like
        setLikes(likes.filter((likeItem)=>likeItem.user_id !==userId));
    })
    .catch((error)=>console.error("Error:", error));
    }
};

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
            <Button variant="light" onClick={handleLike}>
                {isLiked? (
                    <i className="bi bi-heart-fill text-danger"></i>
                ):(
                    <i className="bi bi-heart"></i>
                )}
                 {likes.length}
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