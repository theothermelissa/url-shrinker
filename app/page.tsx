"use client";

import { redirect } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const url = formData.get("url");
      const response = await fetch("/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.short_url);
      } else {
        console.error("Failed to create short URL");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>URL Shortener</h1>
        <form action={handleSubmit}>
          <input type="text" name="url" placeholder="Enter URL" required />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
        <div className={styles.resultContainer}>
          {shortUrl ? (
            <div className={styles.result}>
              <h2>Success!</h2>
              <p>Your shortened URL is: </p>
              <p>
                <b>{shortUrl}</b>
              </p>
              <div className={styles.buttonContainer}>
                <button onClick={() => navigator.clipboard.writeText(shortUrl)}>
                  Copy Short URL
                </button>
                <button onClick={() => redirect(shortUrl)}>
                  Test Short URL
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.result}>
              <p>
                Enter your url, then click the button to (surprise!) create a
                shortened url from it. Give it a shot!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
