// Rewards Component: Responsible for issuing rewards for service Providers & customers

import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Replace with your actual Supabase client import

function Rewards() {
    const [serviceProviderOperations, setServiceProviderOperations] = useState(0);
    const [customerRequests, setCustomerRequests] = useState(0);
    const [rewardMessage, setRewardMessage] = useState("");

    useEffect(() => {
        // Fetch initial counts for service providers and customers
        SPcheckAmountofOperations();
        CustomerCheckAmountOfRequests();
    }, []);

    async function SPcheckAmountofOperations() {
        try {
            // Replace with actual service provider ID
            const serviceProviderId = "exampleSPId";

            // Fetch the number of operations committed by the service provider
            const { data, error } = await supabase
                .from("operations")
                .select("id")
                .eq("service_provider_id", serviceProviderId);

            if (error) throw error;

            setServiceProviderOperations(data.length);

            if (data.length >= 3) {
                IssueVoucher("Service Provider");
            }
        } catch (err) {
            console.error("Error checking service provider operations:", err);
        }
    }

    async function CustomerCheckAmountOfRequests() {
        try {
            // Replace with actual customer ID
            const customerId = "exampleCustomerId";

            // Fetch the number of requests made by the customer
            const { data, error } = await supabase
                .from("requests")
                .select("id")
                .eq("customer_id", customerId);

            if (error) throw error;

            setCustomerRequests(data.length);

            if (data.length >= 3) {
                IssueVoucher("Customer");
            }
        } catch (err) {
            console.error("Error checking customer requests:", err);
        }
    }

    function IssueVoucher(userType) {
        // Issue voucher based on the user type
        const voucherMessage = `${userType} has been awarded their first voucher!`;
        setRewardMessage(voucherMessage);
        console.log(voucherMessage);

        // Add logic to save voucher issuance in the database
    }

    return (
        <div>
            <h1>Rewards Component</h1>

            <div>
                <h2>Service Provider</h2>
                <p>Operations Committed: {serviceProviderOperations}</p>
            </div>

            <div>
                <h2>Customer</h2>
                <p>Requests Made: {customerRequests}</p>
            </div>

            {rewardMessage && (
                <div>
                    <h3>Reward Message</h3>
                    <p>{rewardMessage}</p>
                </div>
            )}
        </div>
    );
}

export default Rewards;
