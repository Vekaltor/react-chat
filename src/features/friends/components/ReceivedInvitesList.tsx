import {ShortUser} from '../../../types/models/User';
import ReceivedInviteUser from './ReceivedInviteUser';
import SuggestedUser from "./SuggestedUser";

interface ReceivedInvitesListProps {
    users: ShortUser[];
    onAccept: (inviteId: string) => void;
    onReject: (inviteId: string) => void;
}

const ReceivedInvitesList = ({users, onAccept, onReject}: ReceivedInvitesListProps) => {
    if (users.length === 0) return null;

    return (
        <div style={{
            background: 'rgba(34, 197, 94, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            overflow: 'auto',
            flex: '1',
            maxHeight: 'fit-content',
        }}>
            <div style={{
                padding: '20px 24px 16px',
                borderBottom: '1px solid rgba(34, 197, 94, 0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                    }}>
                        📨
                    </div>
                    <div>
                        <h3 style={{
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '600',
                            margin: '0',
                            letterSpacing: '-0.01em'
                        }}>
                            Otrzymane zaproszenia
                        </h3>
                        <div style={{
                            color: '#22C55E',
                            fontSize: '12px',
                            fontWeight: '500',
                            marginTop: '2px'
                        }}>
                            {users.length} {users.length === 1 ? 'zaproszenie' : 'zaproszeń'}
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
                    <ReceivedInviteUser
                        key={user._id}
                        user={user}
                        onAccept={onAccept}
                        onReject={onReject}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReceivedInvitesList;
