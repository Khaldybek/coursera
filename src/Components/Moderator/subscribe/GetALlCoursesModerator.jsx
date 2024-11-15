import React, { useState } from 'react';
import ModeratorNavbar from './ModeratorNavbar';
import Subscribers from './Subscribers';
import PendingSubscribers from './PendingSubscribers';
import { useLocation } from 'react-router-dom';

export default function GetAllCoursesModerator() {
    const [activeTab, setActiveTab] = useState('subscribers');
    const location = useLocation();
    const courseData = location.state?.courseData || {};

    const onTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <ModeratorNavbar onTabChange={onTabChange} p={4} width="1000px" maxWidth="1000px" mx="auto" textAlign="center" />
            {activeTab === 'subscribers' ? (
                <Subscribers courseData={courseData} />
            ) : (
                <PendingSubscribers courseData={courseData} />
            )}
        </div>
    );
}
