import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import emailjs from "emailjs-com";

const EMAIL_LIMIT = 2;
const STORAGE_KEY = "email_send_count";
const RESET_TIME_KEY = "email_reset_time";

const FooterForm = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [emailCount, setEmailCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem(STORAGE_KEY);
    const storedResetTime = localStorage.getItem(RESET_TIME_KEY);
    const currentTime = new Date().getTime();

    if (storedResetTime && currentTime > parseInt(storedResetTime, 10)) {
      localStorage.setItem(STORAGE_KEY, "0");
      localStorage.setItem(
        RESET_TIME_KEY,
        (currentTime + 24 * 60 * 60 * 1000).toString()
      );
      setEmailCount(0);
    } else if (storedCount) {
      setEmailCount(parseInt(storedCount, 10));
    } else {
      localStorage.setItem(STORAGE_KEY, "0");
      localStorage.setItem(
        RESET_TIME_KEY,
        (currentTime + 24 * 60 * 60 * 1000).toString()
      );
    }
  }, []);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    if (emailCount >= EMAIL_LIMIT) {
      alert("You've reached the daily email limit. Try again tomorrow!");
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        "service_fffsk9b",
        "template_zcyfp8h",
        { email: email },
        "jDEpLIZZpfhTdpQxR"
      )
      .then(() => {
        const newCount = emailCount + 1;
        setEmailCount(newCount);
        localStorage.setItem(STORAGE_KEY, newCount.toString());
        setEmail("");
      })
      .catch((err) => {
        console.error("Email send failed:", err);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <form onSubmit={sendEmail} className="relative sm:w-[50%] md:w-[80%]">
      <input
        type="email"
        className="border-1 border-white w-full font-extralight outline-none pe-12 ps-4 py-2 rounded"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={isSending || emailCount >= EMAIL_LIMIT}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl"
      >
        <AiOutlineSend
          className={`transition ${
            isSending || emailCount >= EMAIL_LIMIT ? "opacity-50" : ""
          }`}
        />
      </button>
    </form>
  );
};

export default FooterForm;
