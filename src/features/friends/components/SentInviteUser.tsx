import { ShortUser } from '../../../types/models/User';
import Avatar from './Avatar';

interface SentInviteUserProps {
    user: ShortUser;
}

const SentInviteUser = ({ user }: SentInviteUserProps) => {
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
                 e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                 e.currentTarget.style.transform = 'translateY(-1px)';
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                 e.currentTarget.style.transform = 'translateY(0)';
             }}>
            {/* Glow effect */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.5), transparent)'
            }} />

            <Avatar img="" status="offline" size="small"/>
            <div style={{ flex: 1 }}>
                <div style={{
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '500',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em'
                }}>
                    {user.name} {user.surname}
                </div>
                <div style={{
                    color: '#F59E0B',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    Zaproszenie wysłane
                </div>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '20px',
                border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
                <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #F59E0B',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 2s linear infinite'
                }} />
                <span style={{
                    color: '#F59E0B',
                    fontSize: '12px',
                    fontWeight: '600'
                }}>
                    Oczekiwanie...
                </span>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default SentInviteUser;
