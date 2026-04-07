import {jwtdecode} from "jwt-decode";
import {useEffect} from "react";
import {Button, Col, Image, Nav, Row, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import ProfilePostCard from "./ProfilePostCard";
import {fetchPostsByUser} from "../features/posts/postsSlice";
import PROFILE_IMG from '../assets/Joy-InsideOut.jpg'


export default function ProfileMidBody() {
    const url=
    "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";

const dispatch=useDispatch()
const posts=useSelector(store=>store.posts.posts)
const loading=useSelector(store=>store.posts.loading)

useEffect(()=>{
    const token=localStorage.getItem("authToken");
    if (token) {
        const decodedToken= jwtdecode(token);
        const userId=decodedToken.id;
        dispatch(fetchPostsByUser(userId));
    }
},[dispatch]);

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
        {loading&&(
            <Spinner animation="border" className="ms-3 mt-3" variant="primary"/>
        )}
        {posts.map((post) => (
            <ProfilePostCard
            key={post.id}
            content={post.content}
            postId={post.id}
            />
        ))}
    </Col>
);
}