export default function Web() {
  console.log("Hello from the web app!");

  const data = [
    {
      user: "John Doe",
      content: "This is a sample tweet",
      likesCount: 5,
    },
    {
      user: "Jane Smith",
      content: "This is another sample tweet",
      likesCount: 12,
    },
    {
      user: "Alice Johnson",
      content: "This is a third sample tweet",
      likesCount: 8,
    },
    {
      user: "Bob Johnson",
      content: "Here's a new tweet",
      likesCount: 3,
    },
    {
      user: "Sarah Lee",
      content: "I have a new idea for a tweet",
      likesCount: 10,
    },
    {
      user: "David Lee",
      content: "What do you think of this tweet?",
      likesCount: 6,
    },
  ];

  const handleClick = async () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const URL =
      process.env.NEXT_PUBLIC_TWEET_SERVICE_URL || "http://localhost:3001";
    console.log("URL: " + URL);

    try {
      const response = await fetch(URL + "/tweet", {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Set the content type of the request body
        },
        body: JSON.stringify(data[randomIndex]), // Convert the JavaScript object to a JSON string
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json(); // Parse the response as JSON
      console.log(responseData); // Handle the response data

      alert("Tweet posted successfully\n\n" + JSON.stringify(responseData));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div>
      <h1>Kwetter</h1>
      <h2>K8S DEPLOYMENT</h2>
      <button onClick={handleClick}>Post a new tweet!</button>
    </div>
  );
}
