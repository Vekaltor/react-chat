import WrapperBox from "../../../components/WrapperBox";

const LoadingCommunity = () => {
    return (
        <WrapperBox typeBg="bgSecondary" style={{padding: '24px'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                color: '#8B8B8B',
                fontSize: '14px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #7C3AED',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    Ładowanie...
                </div>
            </div>
            <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
        </WrapperBox>
    )
}

export default LoadingCommunity
