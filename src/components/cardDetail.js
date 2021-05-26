import React,{useState} from 'react';
import { Card } from 'react-bootstrap';
import { FormattedMessage} from "react-intl";

const CardDetail=(props)=>{
    const [serie, setserie] = useState(props.info);
    return(
        <Card>
            <Card.Body>
                {(navigator.onLine) ? 
                <Card.Img variant="top" src={serie.poster} />:<FormattedMessage id="Error while loading image."/>}
                <Card.Title>
                    {serie.name}
                </Card.Title>
                <Card.Text>
                    {serie.description}
                </Card.Text>
                <Card.Footer>
                    <a href={serie.webpage}>{serie.webpage}</a>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default CardDetail;