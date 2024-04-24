import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RenderOAuthPage = () => {
    const location = useLocation();
    const selectedRepo = location.state ? location.state.selectedRepo : null;

    useEffect(() => {
        // OAuth authorization with Render
        // Replace the placeholders with your actual Render OAuth credentials and desired scopes
        const clientId = 'rnd_yM7lh1TslsKhrs0xsnPLM8weFYTD';
        const redirectUri = ' http://localhost:1337/admin/plugins/strapi-gen/faq_section'; // Replace 'your-domain.com' with your actual domain
        // Construct the OAuth authorization URL
        const authUrl = `https://dashboard.render.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

        // Redirect the user to Render's OAuth authorization page
        window.location.href = authUrl;
    }, []);

    return (
        <div>
            <h1>Authorize with Render</h1>
            {/* You can add loading indicators or other UI elements here */}
        </div>
    );
};

export default RenderOAuthPage;
