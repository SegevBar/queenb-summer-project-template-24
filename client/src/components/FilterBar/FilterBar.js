import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

const ingredients = [
    {
        "_id": 1,
        "name": "Eggs"
    },
    {
        "_id": 2,
        "name": "Flour"
    },
    {
        "_id": 3,
        "name": "Sugar"
    },
    {
        "_id": 4,
        "name": "Chocolate"
    }
];

function FilterBar(props) {
    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        if (props.handleFilters) {
            props.handleFilters(newChecked);
        }
    };

    const renderCheckboxLists = () => (
        ingredients.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox
                    onChange={() => handleToggle(value._id)}
                    checked={Checked.indexOf(value._id) !== -1}
                />
                <span>{value.name}</span>
            </React.Fragment>
        ))
    );

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Filter by ingredients" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    );
}

export default FilterBar;
