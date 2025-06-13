import { ShortUser } from '../../../types/models/User';
import Avatar from './Avatar';
import {ReceivedInvite} from "../../../types/models/Friend";

interface ReceivedInviteUserProps {
    invite: ReceivedInvite;
    onAccept: (inviteId: string) => void;
    onReject: (inviteId: string) => void;
}

const ReceivedInviteUser = ({ invite, onAccept, onReject }: ReceivedInviteUserProps) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            gap: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
            minHeight: "fit-content",
        }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                 e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                 e.currentTarget.style.transform = 'translateY(-1px)';
                 e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.1)';
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = 'none';
             }}>
            {/* Glow effect */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.5), transparent)'
            }} />

            <div style={{ position: 'relative' }}>
                <Avatar img="" status="offline" size="small"/>
                <div style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '12px',
                    height: '12px',
                    background: '#22C55E',
                    borderRadius: '50%',
                    border: '2px solid #1F1F23',
                    animation: 'pulse 2s infinite'
                }} />
            </div>

            <div style={{ flex: 1 }}>
                <div style={{
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '500',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em'
                }}>
                    {invite.id_user_request.name} {invite.id_user_request.surname}
                </div>
                <div style={{
                    color: '#22C55E',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    Chce się z Tobą zaprzyjaźnić
                </div>
            </div>

            <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
            }}>
                <button
                    onClick={() => onAccept(invite._id)}
                    style={{
                        background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 197, 94, 0.3)';
                    }}
                >
                    ✓ Akceptuj
                </button>
                <button
                    onClick={() => onReject(invite._id)}
                    style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    ✕ Odrzuć
                </button>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default ReceivedInviteUser;
