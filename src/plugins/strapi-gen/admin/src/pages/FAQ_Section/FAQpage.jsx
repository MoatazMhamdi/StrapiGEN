import React from 'react';
import './FAQPage.css'; // Import CSS for styling
import faqVector from './5066368.jpg'; // Import the image


const FAQPage = () => {
  return (
    <div className="faq-container">
      <h1 className="faq-heading" style={{ fontSize: '3rem' , marginBottom: '50px'}}>Frequently Asked Questions 💡</h1>
      <img 
          src={faqVector} 
          alt="faqVector" 
          className="faqVector-image" 
        /> {/* Image */}
      <div className="faq-item" style={{  marginBottom: '50px',marginTop: '50px'}}>
        <h2 className="faq-question">What is the purpose of this project? ⚡️</h2>
        <p className="faq-answer">
          The purpose of this project is to provide a Strapi plugin that generates CRUD web services for entities, dockerizes the project, and manages the repository on GitHub. Additionally, it includes functionality for generating class diagrams.
        </p>
      </div>

      <div className="faq-item" style={{  marginBottom: '50px'}}>
        <h2 className="faq-question">What functionality does the Strapi plugin provide? 🚀</h2>
        <p className="faq-answer">
          The Strapi plugin generates CRUD web services for entities, allowing users to perform Create, Read, Update, and Delete operations on their data. It also includes advanced functionality for managing repositories on GitHub and generating class diagrams.
        </p>
      </div>

      <div className="faq-item" style={{  marginBottom: '50px'}}>
        <h2 className="faq-question">How do I dockerize my project using this plugin?  🐳</h2>
        <p className="faq-answer">
          Dockerizing your project is simple with this plugin. Just follow the instructions provided in the documentation or user interface to generate the Docker files and configuration.
        </p>
      </div>

      <div className="faq-item"style={{  marginBottom: '50px'}} >
        <h2 className="faq-question">Can I customize the generated code? 👁️‍🗨️</h2>
        <p className="faq-answer">
          Yes, you can customize the generated code to suit your specific requirements. The plugin provides options and configurations to tailor the generated code according to your needs.
        </p>
      </div>

      <div className="faq-item" style={{  marginBottom: '50px'}}>
        <h2 className="faq-question">How can I view class diagrams for my project? 📈</h2>
        <p className="faq-answer">
          The plugin includes functionality for generating class diagrams. You can access and view the generated class diagrams through the user interface or by following the provided instructions.
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
