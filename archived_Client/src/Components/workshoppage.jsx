import React from 'react';

const WorkshopPage = () => {
    const workshopDetails = {
        title: "Boost Your Online Sales",
        date: "Saturday, Dec 16, 2023",
        time: "2:00 PM - 3:30 PM",
        description: "Learn effective e-commerce strategies to boost sales during the holiday season. From marketing tactics to customer retention, this workshop covers it all!",
        link: "https://meet.google.com/your-meeting-link",
        image: "https://via.placeholder.com/1200x600.png?text=E-commerce+Workshop",
    };

    const googleCalendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
        workshopDetails.title
    )}&dates=20231216T140000Z/20231216T153000Z&details=${encodeURIComponent(
        workshopDetails.description
    )}&location=${workshopDetails.link}`;

    return (
        <div style={{ fontFamily: "'Arial', sans-serif", lineHeight: "1.6", color: "#333" }}>
            {/* Hero Section */}
            <div
                style={{
                    position: "relative",
                    height: "100vh",
                    backgroundImage: `url(${workshopDetails.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Gradient Overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))",
                    }}
                ></div>

                {/* Content */}
                <div
                    style={{
                        position: "relative",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        textAlign: "center",
                        padding: "20px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "48px",
                            fontWeight: "bold",
                            margin: "0 0 10px",
                            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        {workshopDetails.title}
                    </h1>
                    <p
                        style={{
                            fontSize: "20px",
                            maxWidth: "600px",
                            marginBottom: "20px",
                            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
                        }}
                    >
                        Join us to elevate your e-commerce game!
                    </p>
                    <a
                        href={workshopDetails.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "12px 25px",
                            backgroundColor: "#FF5722",
                            color: "#fff",
                            borderRadius: "5px",
                            textDecoration: "none",
                            fontSize: "18px",
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E64A19")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FF5722")}
                    >
                        Join Workshop
                    </a>
                </div>
            </div>

            {/* Workshop Details */}
            <div
                style={{
                    padding: "20px",
                    maxWidth: "800px",
                    margin: "30px auto",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2 style={{ textAlign: "center", color: "#444" }}>Workshop Details</h2>
                <p>
                    <strong>Date:</strong> {workshopDetails.date}
                </p>
                <p>
                    <strong>Time:</strong> {workshopDetails.time}
                </p>
                <p>
                    <strong>Description:</strong> {workshopDetails.description}
                </p>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <a
                        href={workshopDetails.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            borderRadius: "5px",
                            textDecoration: "none",
                            fontSize: "16px",
                            marginRight: "10px",
                        }}
                    >
                        Join Workshop
                    </a>
                    <a
                        href={googleCalendarLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            backgroundColor: "#FF5722",
                            color: "#fff",
                            borderRadius: "5px",
                            textDecoration: "none",
                            fontSize: "16px",
                        }}
                    >
                        Add to Calendar
                    </a>
                </div>
            </div>

            {/* Call to Action Section */}
            <div
                style={{
                    marginTop: "30px",
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "#e0f7fa",
                    borderRadius: "8px",
                }}
            >
                <h2 style={{ marginBottom: "10px", color: "#00796B" }}>Shop Smart, Sell Smarter</h2>
                <p>
                    Check out our range of tools and resources to enhance your e-commerce journey.
                    Visit our <a href="/tools" style={{ color: "#00796B", textDecoration: "underline" }}>Tools & Resources</a>{' '}
                    section for more!
                </p>
                <a
                    href="/shop-now"
                    style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        backgroundColor: "#00796B",
                        color: "#fff",
                        borderRadius: "5px",
                        textDecoration: "none",
                        fontSize: "16px",
                    }}
                >
                    Explore Now
                </a>
            </div>
        </div>
    );
};

export default WorkshopPage;
