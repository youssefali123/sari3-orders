
const url = "https://7107.api.greenapi.com/waInstance7107488037/sendMessage/d4c4483bd7074e7e8adf9b124d6ab658562831e4213741fb94";

const sendMessage = async (phone: string, message: string) => {
    const payload = {
        chatId: `${phone}@c.us`,
        message: message
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log("message sent")
        return data;
    } catch (error) {
        console.error("error sending message:", error);
        return error;
    }
};
export default sendMessage;
