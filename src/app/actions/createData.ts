import { EmailData } from "../interfaces";

export const sendEmail= async (data:EmailData)=>{
    try{
        const result = await fetch(
            '/api/send-email',
            {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

        const res = await result.json()
        const response = {
            status: res.status || 200,
            statusText: res.message,
            message: "Message sent"
        }
        return response
    } catch (e:unknown){
        const error = {
            error: e,
            status: 403,
            statusText: 'Bad Request',
            message: 'Failed to send the email'
        }
        return error
    }
}