// ConfirmationDialog.js

import React from 'react';

const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-dialog">
            <div className="confirmation-dialog-content">
                <p>Are you sure you want to delete this project?</p>
                <button onClick={onConfirm}>Delete</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
