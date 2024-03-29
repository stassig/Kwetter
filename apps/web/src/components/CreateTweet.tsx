import { Avatar, Button, Textarea } from "@mantine/core";
import { useState } from "react";
import toastr from "toastr";

interface CreateTweetProps {
  profileImage: string;
  username: string;
  onCreate: (content: string) => void;
}

const CreateTweet = ({
  profileImage,
  username,
  onCreate,
}: CreateTweetProps) => {
  const [content, setContent] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleButtonClick = () => {
    if (content.trim().length > 0) {
      onCreate(content);
      setContent("");
    } else {
      toastr.error("Please enter some text!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          src={profileImage}
          size={60}
          radius="xl"
          style={{ marginRight: "10px" }}
        />
        <Textarea
          placeholder={`What's on your mind, ${username}?`}
          onChange={handleInputChange}
          value={content}
          minRows={3}
          style={{ flexGrow: 1 }}
        />
      </div>
      <Button
        onClick={handleButtonClick}
        style={{ marginTop: "10px", width: "100%" }}
      >
        Post
      </Button>
    </div>
  );
};

export default CreateTweet;
