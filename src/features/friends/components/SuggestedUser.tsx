import { ShortUser } from '../../../types/models/User';
import Avatar from './Avatar';

interface SuggestedUserProps {
    user: ShortUser;
    onSendInvite: (userId: string) => void;
}

const SuggestedUser = ({ user, onSendInvite }: SuggestedUserProps) => {
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
                 e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                 e.currentTarget.style.transform = 'translateY(-1px)';
                 e.currentTarget.style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.1)';
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
                background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent)'
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
                    color: '#A855F7',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    Sugerowany znajomy
                </div>
            </div>

            <button
                onClick={() => onSendInvite(user._id)}
                style={{
                    background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.4)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #8B5CF6, #A855F7)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.3)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED, #A855F7)';
                }}
            >
                <span style={{ fontSize: '12px' }}>👋</span>
                Dodaj
            </button>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes sparkle {
                    0%, 100% { 
                        opacity: 1; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.7; 
                        transform: scale(1.1);
                    }
                }
            `}</style>
        </div>
    );
};

export default SuggestedUser;
