import React from 'react'
import { PageHeader } from 'react-bootstrap'

export default ({ header, type }) => {
    var door_type
    switch (type) {
        case 'box':
            door_type = 'leveransbox'
            break
        case 'room':
            door_type = 'leveransrum'
            break
        case 'cluster':
            door_type = 'paketbox'
            break
        case 'passage':
            door_type = 'passagedörr'
            break
    }

    return (<PageHeader style={{ textAlign: 'center' }}>{header}<small>{door_type ? ', ' + door_type : ''}</small></PageHeader>)
}