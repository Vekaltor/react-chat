import {useEffect, useState} from 'react';
import WrapperBox from '../../../components/WrapperBox';
import {ShortUser} from '../../../types/models/User';
import FriendsService from "../../../services/friendsService";
import SuggestedUsersList from './SuggestedUsersList';
import ReceivedInvitesList from './ReceivedInvitesList';
import SentInvitesList from './SentInvitesList';
import EmptyCommunity from "./EmptyCommunity";
import LoadingCommunity from "./LoadingCommunity";

const Community = () => {
    const [discoverableUsers, setDiscoverableUsers] = useState<ShortUser[]>([]);
    const [receivedInvites, setReceivedInvites] = useState<ShortUser[]>([]);
    const [sentInvites, setSentInvites] = useState<ShortUser[]>([]);
    const [loading, setLoading] = useState(true);
    const friendsService = new FriendsService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [discover, received, sent] = await Promise.all([
                    friendsService.getDiscoverableUsers(),
                    friendsService.getReceivedInvites(),
                    friendsService.getSentInvites()
                ]);
                setDiscoverableUsers(discover || []);
                setReceivedInvites(received || []);
                setSentInvites(sent || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSendInvite = async (userId: string) => {
        try {
            await friendsService.sendInvite(userId);
            const [discover, sent] = await Promise.all([
                friendsService.getDiscoverableUsers(),
                friendsService.getSentInvites()
            ]);
            setDiscoverableUsers(discover);
            setSentInvites(sent);
        } catch (error) {
            console.error('Error sending invite:', error);
        }
    };

    const handleAcceptInvite = async (inviteId: string) => {
        try {
            await friendsService.acceptInvite(inviteId);
            const [discover, received] = await Promise.all([
                friendsService.getDiscoverableUsers(),
                friendsService.getReceivedInvites()
            ]);
            setDiscoverableUsers(discover);
            setReceivedInvites(received);
        } catch (error) {
            console.error('Error accepting invite:', error);
        }
    };

    const handleRejectInvite = async (inviteId: string) => {
        try {
            await friendsService.rejectInvite(inviteId);
            const received = await friendsService.getReceivedInvites();
            setReceivedInvites(received);
        } catch (error) {
            console.error('Error rejecting invite:', error);
        }
    };

    if (loading) return <LoadingCommunity/>

    return (
        <WrapperBox typeBg="bgSecondary" style={{
            padding: '24px',
            height: 'calc(100vh)',
            maxHeight: 'calc(100vh)',
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                maxWidth: '100%',
                maxHeight: '100%',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                }}>
                    <div style={{
                        width: '4px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                        borderRadius: '2px'
                    }} />
                    <h2 style={{
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: '600',
                        margin: '0',
                        letterSpacing: '-0.02em'
                    }}>
                        Społeczność
                    </h2>
                </div>

                <ReceivedInvitesList
                    users={receivedInvites}
                    onAccept={handleAcceptInvite}
                    onReject={handleRejectInvite}
                />

                <SentInvitesList users={sentInvites} />

                <SuggestedUsersList
                    users={discoverableUsers}
                    onSendInvite={handleSendInvite}
                />

                {discoverableUsers.length === 0 && receivedInvites.length === 0 && sentInvites.length === 0 && (
                    <EmptyCommunity/>
                )}
            </div>
        </WrapperBox>
    );
};

export default Community;
