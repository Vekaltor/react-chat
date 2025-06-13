const EmptyCommunity = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            textAlign: 'center',
            color: '#8B8B8B',
            background: 'rgba(124, 58, 237, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(124, 58, 237, 0.1)'
        }}>
            <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(168, 85, 247, 0.2))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                fontSize: '24px'
            }}>
                👥
            </div>
            <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#FFFFFF',
                marginBottom: '8px'
            }}>
                Brak sugestii znajomych
            </div>
            <div style={{
                fontSize: '14px',
                color: '#8B8B8B',
                maxWidth: '280px'
            }}>
                Sprawdź ponownie później lub poszukaj znajomych w wyszukiwarce
            </div>
        </div>
    )
}

export default EmptyCommunity
