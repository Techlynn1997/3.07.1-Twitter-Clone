import {Button, Col, Image, Nav, Row} from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import PROFILE_IMG from '../assets/Joy-InsideOut.jpg'
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

export default function ProfileMidBody() {
    const [posts, setPosts]=useState([]);
    const url=
    "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";

const fetchPosts=(userID)=>{
    fetch(
        `https://ab4abb9c-ad0f-40a9-92e4-1ddb84fa8a30-00-3je3dj44orsgp.sisko.replit.dev/posts/user/${userID}`
    )
    .then((response)=>response.json())
    .then((data)=>setPosts(data))
    .catch((error)=>console.error("Error:",error));
};

useEffect(()=>{
    const token=localStorage.getItem("authToken");
    if (token) {
        const decodedToken=jwtDecode(token);
        const userId=decodedToken.id;
        fetchPosts(userId);
    }
},[]);

return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
        <Image src={url} fluid />
        <br />
        <Image
        src={PROFILE_IMG}
        roundedCircle
        style={{
            width: 150,
            position: "absolute",
            top: "140px",
            border: "4px solid #F8F9FA",
            marginLeft: 15,
        }}
    />

        <Row className="justify-content-end">
            <Col xs="auto">
            <Button className="rounded-pill mt-2" variant="outline-secondary">
                Edit Profile
            </Button>
            </Col>
        </Row>

        <p className="mt-5" style={{margin: 0, fontWeight: "bold", fontSize: "15px"}}>
            Lynn
        </p>
        
        <p style={{marginBottom: "2px"}}>@lynn.lynn</p>

        <p>I help people to switch their career to be a Software Developer at SigmaSchool.co</p>

        <p>Entrepreneur</p>

        <p>
            <strong>271</strong> <strong>Following</strong> <strong>610</strong> <strong>Followers</strong>
        </p>        
        
        <Nav variant="underline" defaultActiveKey="/home" justify>

        <Nav.Item>
            <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link eventKey="link-1">Replies</Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link eventKey="Highlights"></Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link eventKey="Media"></Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link eventKey="Likes"></Nav.Link>
        </Nav.Item>

        </Nav>
        {posts.length>0&&posts.map((post)=>(
            <ProfilePostCard key={post.id} content={post.content} postId={post.id}/>
        ))}
    </Col>
)
}