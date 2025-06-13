import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../hooks/useAppSelector';
import WrapperBox from '../../../components/WrapperBox';
import Avatar from './Avatar';
import {ShortUser} from '../../../types/models/User';
import useSocketService from '../../../hooks/useSocketService';
import AuthSocketService from '../../../services/authSocketService';
import FriendsService from "../../../services/friendsService";

const SuggestedFriends = () => {
    const [users, setUsers] = useState<ShortUser[]>([]);
    const {user} = useAppSelector((state) => state.auth);
    const [Service] = useSocketService(AuthSocketService);
    const friendsService = new FriendsService();

    useEffect(() => {
        const fetchAvailableUsers = async () => {
            try {
                const availableUsers = await friendsService.getAvailableUsers();
                setUsers(availableUsers);
            } catch (error) {
                console.error('Error fetching available users:', error);
            }
        };

        fetchAvailableUsers();
    }, []);

    const handleSendFriendRequest = (userId: string) => {
        Service.senders.sendFriendRequest(user?.id!, userId);
    };

    return (
        <WrapperBox typeBg="bgSecondary" style={{padding: '20px'}}>
            <h3 style={{color: 'var(--white)', marginBottom: '20px'}}>Sugerowani znajomi</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {users.map((user) => (
                    <div
                        key={user._id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                            background: 'var(--bgThirdy)',
                            borderRadius: '8px',
                            gap: '10px'
                        }}
                    >
                        <Avatar img="" status="offline" size="small"/>
                        <div style={{flex: 1}}>
                            <div style={{color: 'var(--white)'}}>
                                {user.name} {user.surname}
                            </div>
                        </div>
                        <button
                            onClick={() => handleSendFriendRequest(user._id)}
                            style={{
                                background: 'var(--darkPourple)',
                                color: 'var(--white)',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Dodaj
                        </button>
                    </div>
                ))}
            </div>
        </WrapperBox>
    );
};

export default SuggestedFriends; 
