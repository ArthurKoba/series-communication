import React from 'react';
import {Form} from "react-bootstrap";
import appStorage from "../../../../appStorage";
import {observer} from "mobx-react-lite";
import {streamTypes} from "../../../streams/streamTypes";

const SelectDataStreamType = observer(({chart}) => {

    let resources
    switch (chart.subscribeDataStreamType) {
        case streamTypes.generator:
            resources = appStorage.streamsManager.generatorStreams
            break
        case streamTypes.serial:
            resources = appStorage.streamsManager.serialStreams
            break
        default:
            resources = []
    }

    return (
        <Form.Select onChange={(e) => chart.setSubscribeDataStreamId(e.target.value)}>
            <option disabled value={undefined}>Select stream id</option>
            {
                resources.map((resource, index) =>
                    <option key={index} value={resource.id}>{resource.id}</option>)
            }
        </Form.Select>
    );
});

export default SelectDataStreamType;