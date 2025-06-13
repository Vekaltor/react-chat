import {ShortUser} from '../../../types/models/User';
import SuggestedUser from './SuggestedUser';

interface SuggestedUsersListProps {
    users: ShortUser[];
    onSendInvite: (userId: string) => void;
}

const SuggestedUsersList = ({users, onSendInvite}: SuggestedUsersListProps) => {
    if (users.length === 0) return null;

    return (
        <div style={{
            background: 'rgba(124, 58, 237, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(124, 58, 237, 0.15)',
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            overflow: "hidden",
        }}>
            <div style={{
                padding: '20px 24px 16px',
                borderBottom: '1px solid rgba(124, 58, 237, 0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                    }}>
                        ✨
                    </div>
                    <div>
                        <h3 style={{
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '600',
                            margin: '0',
                            letterSpacing: '-0.01em'
                        }}>
                            Osoby do poznania
                        </h3>
                        <div style={{
                            color: '#A855F7',
                            fontSize: '12px',
                            fontWeight: '500',
                            marginTop: '2px'
                        }}>
                            {users.length} {users.length === 1 ? 'sugestia' : 'sugestii'}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                padding: '16px 24px 24px',
                display: 'flex',
                overflow: "auto",
                flexDirection: 'column',
                gap: '12px',
                maxHeight: '100%',
            }}>
                {users.map((user) => (
                    <SuggestedUser
                        key={user._id}
                        user={user}
                        onSendInvite={onSendInvite}
                    />
                ))}
            </div>
        </div>
    );
};

export default SuggestedUsersList;
