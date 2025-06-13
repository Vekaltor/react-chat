import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import AuthService from "../services/authService";
import {ActivateAccParams} from "../types/queryParams";
import {AxiosError} from "axios";
import {IActivateAccError} from "../types/errors";
import {IActivateAccResponse} from "../types/responses";
import {logoutUser} from "../authSlice";
import {useAppDisptach} from "../hooks/useAppDisptach";
import {useAppSelector} from "../hooks/useAppSelector";
import useSocketService from "../hooks/useSocketService";
import AuthSocketService from "../services/authSocketService";

const PopupActivatedAcc = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [activated, setActivated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams<ActivateAccParams>();
    const navigate = useNavigate();
    const dispatch = useAppDisptach();
    const {user} = useAppSelector((state) => state.auth);
    const [authSocketService] = useSocketService(AuthSocketService);

    const redirectToLogin = () => {
        navigate("/login");
    };

    const handleActivateAcc = () => {
        setLoading(true);
        let service = new AuthService();
        service
            .activate(params)
            .then((data: IActivateAccResponse) => {
                setMessage(data.message);
                setActivated(true);
                setError(false);
            })
            .catch((err: AxiosError) => {
                const error = err.response?.data as IActivateAccError;
                setMessage(error.error.message);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClose = async () => {
        await dispatch(logoutUser()).then(() => {
            navigate('/login');
            authSocketService.senders.logout(user?.id!);
        });
    };

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    animation: "fadeIn 0.3s ease"
                }}
                onClick={handleClose}
            >
                {/* Modal */}
                <div
                    style={{
                        background: "linear-gradient(145deg, #1F1F23, #2A2A2E)",
                        borderRadius: "24px",
                        padding: "40px",
                        width: "90%",
                        maxWidth: "480px",
                        border: "1px solid rgba(124, 58, 237, 0.2)",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(124, 58, 237, 0.1)",
                        position: "relative",
                        animation: "slideUp 0.4s ease",
                        textAlign: "center"
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "none",
                            borderRadius: "8px",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#8B8B8B",
                            fontSize: "16px",
                            transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                            e.currentTarget.style.color = "#FFFFFF";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.color = "#8B8B8B";
                        }}
                    >
                        ✕
                    </button>

                    {/* Icon */}
                    <div style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto 24px",
                        background: activated
                            ? "linear-gradient(135deg, #22C55E, #16A34A)"
                            : error
                                ? "linear-gradient(135deg, #EF4444, #DC2626)"
                                : "linear-gradient(135deg, #7C3AED, #A855F7)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "32px",
                        boxShadow: activated
                            ? "0 8px 32px rgba(34, 197, 94, 0.3)"
                            : error
                                ? "0 8px 32px rgba(239, 68, 68, 0.3)"
                                : "0 8px 32px rgba(124, 58, 237, 0.3)",
                        animation: loading ? "pulse 2s infinite" : "none"
                    }}>
                        {loading ? "⏳" : activated ? "✅" : error ? "❌" : "📧"}
                    </div>

                    {/* Title */}
                    <h2 style={{
                        color: "#FFFFFF",
                        fontSize: "24px",
                        fontWeight: "700",
                        margin: "0 0 16px",
                        letterSpacing: "-0.02em"
                    }}>
                        {loading
                            ? "Weryfikacja konta..."
                            : activated
                                ? "Konto aktywowane!"
                                : error
                                    ? "Błąd aktywacji"
                                    : "Aktywacja konta"
                        }
                    </h2>

                    {/* Message */}
                    {message && (
                        <div style={{
                            background: activated
                                ? "rgba(34, 197, 94, 0.1)"
                                : error
                                    ? "rgba(239, 68, 68, 0.1)"
                                    : "rgba(124, 58, 237, 0.1)",
                            border: activated
                                ? "1px solid rgba(34, 197, 94, 0.3)"
                                : error
                                    ? "1px solid rgba(239, 68, 68, 0.3)"
                                    : "1px solid rgba(124, 58, 237, 0.3)",
                            borderRadius: "12px",
                            padding: "16px",
                            marginBottom: "32px",
                            color: activated
                                ? "#22C55E"
                                : error
                                    ? "#EF4444"
                                    : "#A855F7",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "1.5"
                        }}>
                            {message}
                        </div>
                    )}

                    {/* Default message when no response yet */}
                    {!message && !loading && (
                        <p style={{
                            color: "#8B8B8B",
                            fontSize: "16px",
                            lineHeight: "1.6",
                            margin: "0 0 32px",
                            maxWidth: "360px",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}>
                            Kliknij przycisk poniżej, aby aktywować swoje konto i rozpocząć korzystanie z platformy.
                        </p>
                    )}

                    {/* Action buttons */}
                    <div style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>
                        {activated ? (
                            <button
                                onClick={redirectToLogin}
                                style={{
                                    background: "linear-gradient(135deg, #22C55E, #16A34A)",
                                    color: "#FFFFFF",
                                    border: "none",
                                    padding: "14px 32px",
                                    borderRadius: "12px",
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(34, 197, 94, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(34, 197, 94, 0.3)";
                                }}
                            >
                                <span>🚀</span>
                                Przejdź do logowania
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleActivateAcc}
                                    disabled={error || loading}
                                    style={{
                                        background: error
                                            ? "rgba(239, 68, 68, 0.2)"
                                            : loading
                                                ? "rgba(124, 58, 237, 0.5)"
                                                : "linear-gradient(135deg, #7C3AED, #A855F7)",
                                        color: error ? "#EF4444" : "#FFFFFF",
                                        border: error ? "1px solid rgba(239, 68, 68, 0.4)" : "none",
                                        padding: "14px 32px",
                                        borderRadius: "12px",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        cursor: error || loading ? "not-allowed" : "pointer",
                                        transition: "all 0.2s ease",
                                        boxShadow: error
                                            ? "none"
                                            : loading
                                                ? "0 4px 16px rgba(124, 58, 237, 0.2)"
                                                : "0 4px 16px rgba(124, 58, 237, 0.3)",
                                        opacity: error || loading ? 0.7 : 1,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!error && !loading) {
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                            e.currentTarget.style.boxShadow = "0 6px 24px rgba(124, 58, 237, 0.4)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!error && !loading) {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "0 4px 16px rgba(124, 58, 237, 0.3)";
                                        }
                                    }}
                                >
                                    {loading && (
                                        <div style={{
                                            width: "16px",
                                            height: "16px",
                                            border: "2px solid #FFFFFF",
                                            borderTop: "2px solid transparent",
                                            borderRadius: "50%",
                                            animation: "spin 1s linear infinite"
                                        }}/>
                                    )}
                                    <span>{loading ? "" : error ? "⚠️" : "✨"}</span>
                                    {loading
                                        ? "Aktywacja..."
                                        : error
                                            ? "Link wygasł lub jest nieprawidłowy"
                                            : "Aktywuj konto"
                                    }
                                </button>

                                {error && (
                                    <button
                                        onClick={handleClose}
                                        style={{
                                            background: "rgba(255, 255, 255, 0.1)",
                                            color: "#8B8B8B",
                                            border: "1px solid rgba(255, 255, 255, 0.2)",
                                            padding: "14px 24px",
                                            borderRadius: "12px",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                                            e.currentTarget.style.color = "#FFFFFF";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                            e.currentTarget.style.color = "#8B8B8B";
                                        }}
                                    >
                                        Zamknij
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Help text */}
                    <div style={{
                        marginTop: "24px",
                        padding: "16px",
                        background: "rgba(255, 255, 255, 0.03)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                        <p style={{
                            color: "#8B8B8B",
                            fontSize: "12px",
                            margin: "0",
                            lineHeight: "1.5"
                        }}>
                            {error
                                ? "Jeśli problem się powtarza, skontaktuj się z naszym zespołem wsparcia."
                                : activated
                                    ? "Twoje konto zostało pomyślnie aktywowane. Możesz teraz się zalogować."
                                    : "Potrzebujesz pomocy? Sprawdź swoją skrzynkę e-mail lub skontaktuj się z nami."
                            }
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </>
    );
};

export default PopupActivatedAcc;
