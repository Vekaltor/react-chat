import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDisptach } from "../../../hooks/useAppDisptach";
import { setSelectedConversation } from "../conversationSlice";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";

const ChatFeatures = () => {
    const { current } = useAppSelector((state) => state.conversation);
    const dispatch = useAppDisptach();

    const handleShowSuggestedFriends = () => {
        dispatch(setSelectedConversation("suggested-friends"));
    };

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {/*<button*/}
            {/*    onClick={handleShowSuggestedFriends}*/}
            {/*    style={{*/}
            {/*        display: "flex",*/}
            {/*        alignItems: "center",*/}
            {/*        gap: "5px",*/}
            {/*        padding: "8px 12px",*/}
            {/*        backgroundColor: "#4a90e2",*/}
            {/*        color: "white",*/}
            {/*        border: "none",*/}
            {/*        borderRadius: "4px",*/}
            {/*        cursor: "pointer"*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <FaUserFriends />*/}
            {/*    <span>Znajomi</span>*/}
            {/*</button>*/}
        </div>
    );
};

export default ChatFeatures;
