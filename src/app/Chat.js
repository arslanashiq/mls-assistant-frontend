import React, { useState } from 'react';
import { Chat } from 'react-chat-module';
import 'react-chat-module/dist/index.css';
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
function Example() {
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async (message) => {
        const messageId = messages.length + 1; // Generate a unique messageId
        const newMessage = {
            messageId: messageId,
            senderId: "1",
            profilePicture: "https://via.placeholder.com/150",
            type: message.type,
            text: message.text,
            createdAt: message.createdAt,
            read: false
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        try {
            const geminiResponse = await run(message.text);;
            //console.log(geminiResponse);
            if (geminiResponse) {
                const response = JSON.parse(geminiResponse);
                const geminiMessage = {
                    messageId: messageId + 1,
                    senderId: "Gemini",
                    profilePicture: "https://via.placeholder.com/150",
                    type: "text",
                    text: response.message,
                    createdAt: new Date(),
                    read: false
                };
                setMessages(prevMessages => [...prevMessages, geminiMessage]);
            } else {
                // Handle the case when geminiResponse is null or empty
                // Display a message to the user indicating temporary unavailability
                const errorMessage = "Sorry, we're currently experiencing high traffic. Please try again later.";
                const errorNotification = {
                    messageId: messageId + 1,
                    senderId: "System",
                    type: "notification",
                    text: errorMessage,
                    createdAt: new Date(),
                    read: false
                };
                setMessages(prevMessages => [...prevMessages, errorNotification]);
            }
        } catch (error) {
            console.error("An error occurred while generating content:", error);
            // Handle the error, display an error message to the user, etc.
        }
    }
    const genAI = new GoogleGenerativeAI('AIzaSyC7jMMsKoJSSOM_lt7v88VZzBDX7wlqikE');
    async function run(message) {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        // var text = `Please remember:
        // - Your name is lorreta
        // - You are registered AI Assisting working with MLS assisstant in boston and you need to help people with finding propertys
        // - Keep the conversation focused on real estate matters.
        // - Feel free to ask any questions you have about properties, neighborhoods, market trends, or anything else related to real estate.
        // - I'm here to assist you every step of the way!
        // - You need to understand the intent if the user asks for finding your a property you need to build this query url like this https://api.bridgedataoutput.com/api/v2/mlspin/listings?access_token=23c8729a55e9986ae45ca71d18a3742c&near=43.4442,71.6473
        // - you have a list of functions that you have to send me back; function names: find_property, find_and_send
        // - you have to send me the response a json object with message and intents
        // - the returning JSON should be like
        // - The Message shouldn't be null
        // {"message": "your message", "intents": ["intent1", "intent2"], "veriables" : {pricerange : '1000', city: 'boston', state: "MA", bedrooms: 5, bathrooms: 5}}
        // Looking forward to assisting you with your real estate needs.
        // user message: ${message}\n`
        const chat = model.startChat({
            history: [
            {
                role: "user",
                    parts: [{
                        text: `
                    Please remember:
                    - Your name is lorreta
                    - Don't keep greeting the user
                    - You are registered AI Assisting working with MLS assisstant in boston and you need to help people with finding propertys
                    - Keep the conversation focused on real estate matters.
                    - Feel free to ask any questions you have about properties, neighborhoods, market trends, or anything else related to real estate.
                    - I'm here to assist you every step of the way!
                    - You need to understand the intent if the user asks for finding your a property you need to build this query url like this https://api.bridgedataoutput.com/api/v2/mlspin/listings?access_token=23c8729a55e9986ae45ca71d18a3742c&near=43.4442,71.6473
                    - you have a list of functions that you have to send me back; function names: find_property, find_and_send
                    - you have to send me the response a json object with message and intents
                    - the returning JSON should be like
                    - The Message shouldn't be null
                    {"message": "your message", "intents": ["intent1", "intent2"], "veriables" : {pricerange : '1000', city: 'boston', state: "MA", bedrooms: 5, bathrooms: 5}}
                    Looking forward to assisting you with your real estate needs.` }],
            },
            {
                role: "model",
                parts: [{ text: `Please remember:
                    - Your name is lorreta
                    - Don't keep greeting the user
                    - You are registered AI Assisting working with MLS assisstant in boston and you need to help people with finding propertys
                    - Keep the conversation focused on real estate matters.
                    - Feel free to ask any questions you have about properties, neighborhoods, market trends, or anything else related to real estate.
                    - I'm here to assist you every step of the way!
                    - You need to understand the intent if the user asks for finding your a property you need to build this query url like this https://api.bridgedataoutput.com/api/v2/mlspin/listings?access_token=23c8729a55e9986ae45ca71d18a3742c&near=43.4442,71.6473
                    - you have a list of functions that you have to send me back; function names: find_property, find_and_send
                    - you have to send me the response a json object with message and intents
                    - the returning JSON should be like
                    - The Message shouldn't be null
                    {"message": "your message", "intents": ["intent1", "intent2"], "veriables" : {pricerange : '1000', city: 'boston', state: "MA", bedrooms: 5, bathrooms: 5}}
                    Looking forward to assisting you with your real estate needs.` }],
            },
            ],
            generationConfig: {
            maxOutputTokens: 100,
            },
        });

        const msg = "message";

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        return text
    }


    return (
        <div>
            <div className={`chatbox ${isOpen ? "open" : ""}`}>
                <button className='chatClose-btn' onClick={toggleChatBox}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <Chat userId={"1"} messages={messages} onSend={handleSend} />
            </div>
            {!isOpen && (
                <button className='chatbox-initialize' onClick={toggleChatBox}>
                    <span className="icon flaticon-chat-1 fs-4" />
                </button>
            )}
        </div>
    )
}

export default Example;
