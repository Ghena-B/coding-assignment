import React from 'react';
import './TrailerModal.scss';
import {Modal} from "../Modal/Modal";
import YoutubePlayer from "../YoutubePlayer";

const TrailerModal = ({movieTitle, videoKey, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen}
               onClose={onClose}>
            <h2>{movieTitle}</h2>
            {videoKey ? (
                <div className="video-container">
                <YoutubePlayer videoKey={videoKey}/>
                </div>
            ) : (
                <div>No trailer available.</div>
            )}
        </Modal>
    );
};

export default TrailerModal;
