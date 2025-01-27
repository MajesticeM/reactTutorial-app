import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Replace with your actual Supabase client import

function BookService() 

{
    const [customerRequest, setCustomerRequest] = useState(null);
    const [operationSlot, setOperationSlot] = useState(null);
    const [chatAllowed, setChatAllowed] = useState(false);

    useEffect(() => {
        // Trigger the workflow when the component mounts
        ReceiveCustomerRequest();
    }, []);

    async function ReceiveCustomerRequest() {
        try {
            // Replace with actual customer and service provider IDs
            const customerId = "exampleCustomerId";
            const serviceProviderId = "exampleProviderId";

            // Check in the database for an existing booking
            const { data, error } = await supabase
                .from("bookings")
                .select("*")
                .eq("customer_id", customerId)
                .eq("service_provider_id", serviceProviderId);

            if (error) throw error;

            if (data.length > 0) {
                setCustomerRequest(data[0]);
                OperationSlot(data[0]); // Pass booking info to the next step
            } else {
                console.log("No booking found for the customer and service provider.");
            }
        } catch (err) {
            console.error("Error fetching customer request:", err);
        }
    }

    function OperationSlot(booking) {
        // Simulate progress updates for the service being rendered
        const progressSteps = [
            "Booking confirmed",
            "Service provider preparing",
            "Service in progress",
            "Service completed",
        ];

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < progressSteps.length) {
                setOperationSlot(progressSteps[currentStep]);
                currentStep++;
            } else {
                clearInterval(interval);
                TimedChat(); // Enable chat after the operation
            }
        }, 
        3000); // Update progress every 3 seconds (adjust as needed)
    }

    function TimedChat() 
    {
        // Allow chat for 1 hour before and after the operation
        setChatAllowed(true);

        setTimeout(() => {
            setChatAllowed(false); // Disable chat after the time window
        }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
    }

    return (
        <div>
            <h1>Book Service</h1>

            {/* Display customer request status */}
            {customerRequest ? (
                <div>
                    <h2>Customer Request Found</h2>
                    <p>Service: {customerRequest.service_name}</p>
                    <p>Provider: {customerRequest.service_provider_name}</p>
                </div>
            ) : (
                <p>Waiting for customer request...</p>
            )}

            {/* Display operation slot progress */}
            {operationSlot && (
                <div>
       
                  <h2>Service Progress</h2>
                    <p>{operationSlot}</p>
                </div>
            )}

            {/* Display chat status */}
            {chatAllowed ? (
                <div>
                    <h2>Chat</h2>
                    <p>The chat is available for the next hour.</p>
                </div>
            ) : (
                <p>Chat is currently unavailable.</p>
            )}
        </div>
    );
}

export default BookService;
