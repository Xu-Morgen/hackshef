import React from "react";
import { Button, Col, Row, Flex, Typography } from "antd";
import { wrap } from "lodash";
import { useNavigate } from 'react-router-dom';
const { Title, Paragraph, Text, Link } = Typography;




const HelloPage = () => {
    const navigate = useNavigate();

    function handleClick() {

        const handleNavigate = () => {
            navigate('/0');
        };
        handleNavigate()
    }
    return (
        <div style={{ display: 'flex', }}>
            <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", alignContent: "center", flexWrap: "wrap" }}>
                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center", alignContent: "center", flexWrap: "wrap" }}>
                    <Title>Welcome to the cube growth<br /></Title>
                </Col>
                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center", alignContent: "center", flexWrap: "wrap" }}>
                    <Paragraph>
                        In this game, you need to complete the program of controlling small blocks in a jigsaw puzzle and make the small blocks paint each piece on the map
                    </Paragraph>
                </Col>
                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center", alignContent: "center", flexWrap: "wrap" }}>
                    <Paragraph>
                        Good Luck
                    </Paragraph>
                </Col>
                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center", alignContent: "center", flexWrap: "wrap" }}>
                    <Button type="primary" size="large" title="Click the button to start the game" onClick={() => { handleClick() }} >Click the button to start the game </Button>
                </Col>
            </Row>
        </div >
    )
}

export default HelloPage