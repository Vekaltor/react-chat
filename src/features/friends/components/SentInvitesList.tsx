import SentInviteUser from './SentInviteUser';
import {SentInvite} from "../../../types/models/Friend";

interface SentInvitesListProps {
    users: SentInvite[];
}

const SentInvitesList = ({users}: SentInvitesListProps) => {
    if (users.length === 0) return null;

    return (
        <div style={{
            background: 'rgba(245, 158, 11, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.15)',
            flex: '1',
            maxHeight: 'fit-content',
            minHeight: 'fit-content',
        }}>
            <div style={{
                padding: '20px 24px 16px',
                borderBottom: '1px solid rgba(245, 158, 11, 0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                    }}>
                        📤
                    </div>
                    <div>
                        <h3 style={{
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '600',
                            margin: '0',
                            letterSpacing: '-0.01em'
                        }}>
                            Wysłane zaproszenia
                        </h3>
                        <div style={{
                            color: '#F59E0B',
                            fontSize: '12px',
                            fontWeight: '500',
                            marginTop: '2px'
                        }}>
                            {users.length} {users.length === 1 ? 'zaproszenie' : 'zaproszeń'} oczekuje
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
                {users.map((invite) => (
                    <SentInviteUser key={invite._id} invite={invite}/>
                ))}
            </div>
        </div>
    );
};

export default SentInvitesList;
