import React from 'react'

export default ({ passage, click }) => {

    const style = {}

    return (
        <div>
            <button style={style} onClick={(e) => { e.preventDefault(); click() }}>
                {passage.street}, {passage.custom_name} {passage.location}
            </button>

        </div >

    )

}