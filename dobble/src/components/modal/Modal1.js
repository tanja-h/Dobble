import React, { useEffect } from 'react'

function Modal1({inputRef, changeInputName,
    handleSave, handleCancel, handleKeyPress, modalOpen, playerName }) {

     useEffect(() => {
         if (modalOpen)
                 inputRef.current.select();
     }, [modalOpen])

    return (
        <div>
            <div className="input-group">
                <label>Enter Name: </label>
                <input
                    ref={inputRef}
                    type="text"
                    onChange={changeInputName}
                    value={playerName}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div className="btn-group">
                <button className="btn" onClick={handleSave}>Save name</button>
                <button className="btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default Modal1
